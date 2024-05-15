---
sidebar_position: 4
---

# Implementation


:::tip
This section describes the implementation details of the Trustless API.
:::

The Trustless API is split up into different responsibilities. First, there is the `crawler`, which crawls the actual bundles from KYVE, generates an inclusion proof for each data item in the bundle, creates indices for those data items, and finally stores them together with a proof of inclusion.

Next, there is the server, which receives a request for a data item with a specific key, looks up the data item based on the key, and returns the data item together with the previously generated proof of inclusion.

These steps are independent at the code level, meaning that it is necessary to first start a process with the crawler in order to correctly serve the crawled data items.

## Crawler
### How the crawler works in detail

As previously mentioned, the `crawler` is responsible for retrieving all bundles from the KYVE chain and storing each data item. The crawler process knows which pools to query based on the `config.yml` file provided. You can find a template configuration under `config.template.yml.`

The config file contains all `poolId`s that should be crawled. The crawler itself functions like a master, starting one go-routine per `poolId` that is responsible for crawling that specific `poolId`.

Each go-routine (referred to as a ChildCrawler from here on) performs the following tasks:
- it retrieves the pool info and looks up for the latest bundle
- then goes through every bundleId up to the last bundle produced
- if the bundle has already been inserted into the database, we skip it and continue to the next bundleId
- if not we insert the bundle
- repeats that processes every 3 minutes

To insert a bundle we first have to retrieve its bundle data.
- first we have to query for that specific bundleId on the KYVE chain, we call this the `finalizedBundle` (the ChildCrawler will use the `chainrest` defined in the config)
- then we have to get the decompressed bundle data associated with the finalizedBundle from the given storage provider (the ChildCrawler will use the `storagerest` defined in the config)
- the decompressed bundle data is an array of data items, we compute the hash value of every single data item

Now that we have the bundles data items and each corresponding data item hash, we can start generating the trustless data items that contain a proof on inclusion.
We do this by iterating over each data item of the bundle and computing a compact merkle tree for each data item. The compact merkle tree only contains the necessary hashes for constructing the merkle root. This root will be equal to the merkle root stored on the KYVE chain.

Finally, we start saving the trustless data items.

### Crawler sketch
<img width="50%" src="/img/trustless_api/trustless_crawler.png" alt="Crawler overview"/>

### Indexer
We have to generate indices on each data item, because we want to quickly retrieve the trustless data item based on a specific key that corresponse to that exact data item. For each data item, there must be at least one index, but there can be more than one. The crawler will generate indices based on the `indexer` defined in the `config.yml`.

The whole purpose of the Indexer is to return the possible indices of a specific data item, that then will be stored and later queried in the database.

**Example: `EthBlobs`**

The `EthBlobsIndexer` generates all necessary indices to query for blobs:
- block_height
- slot_number

This means, the `EthBlobsIndexer` will take a trustless data item as an argument and return the specific indices for that data item.

```go
func (*EthBlobsIndexer) GetDataItemIndices(dataitem *types.TrustlessDataItem) ([]int64, error) {
    // process blob data
    ...
    var indices []int64 = []int64{
        int64(height),
        int64(blobData.SlotNumber),
    }
    return indices, nil
}
```

### Database structure & Adapter

How are the data items stored and how do we index them?

We have two schemes:
1. DataItemDocument
2. IndexDocument.

There will be exactly two tables per pool with the following naming conventions: data_items_pool_`poolId`, indices_pool_`poolId`

**DataItemDocument**
|ID|BundleID|PoolID|FileType|FilePath|
|-|-|-|-|-|
|uint, primarykey|int64|int64|int|string|

**IndexDocument**
|Key|IndexID|DataItemID|
|-|-|-|
|int64, primarykey|int, primarykey|uint|

We have to save the the index id, because there might be more than one index for a data item e.g. `block_height` & `slot_number`.

We make use of a database adapter interface to disconnect the actual database used from our logic. This makes it possible to swap databases without changing anything else except the database adapter.

Adapter interface:
```go
type Adapter interface {
    Save(dataitem *[]types.TrustlessDataItem) error
    Get(dataitemKey int64, indexId int) (files.SavedFile, error)
    Exists(bundle int64) bool
}
```

As you can see, we make use of only three methods to interact with the database. When inserting the data items it is important to submit them all with only one transactions, otherwise it might be possible that we fail to save some data items of a bundle resulting in incomplete data.

When inserting a data item, the adapter is responsible for the following:
- first upload/save the trustless data item to a location (this will be done via a FileAdapter, see next chapter)
- write all necessary information about the data item and its location into the database
- and finally insert every index that exists for that specific data item (in case of EthBlobs this would be the `block_height` and `slot_number`)

### File Adapter

The Trustless API can save the turstless data items to various locations, therefore we need to account for different file types. The FileAdapter is responsible for that.

Currently there are only two FileAdapter:
- local file
- s3 file

A FileAdapter is only responsible for saving a trustless data item. The corresponding interface looks like the following:

```go
type SaveDataItem interface {
	Save(dataitem *types.TrustlessDataItem) (SavedFile, error)
}
```

### How the server works in detail

The crawler has done the difficult part of indexing each bundle, now the server is able to simply retrieve the requested data item from the database.

Once a user requests a data item with a key, the server looks up the data item location of that specific key together with the keyIndex. It then resolves the location and either returns the data item directly or redirects to the data item. This behaviour can be set in the config.

E. g. the user does the following request: `/beacon/blob_sidecars?block_height=1337`
- first the server calls the database adapter with the following arguments: `Get(1337, EthBlobIndexHeight)`
    - `EthBlobIndexHeight = 0` because the block_height is the first index defined in `EthBlobs`
- This will return a `SavedFile` which either points to a local file or an S3 Bucket
- Server returns the file / redirects to the file

To verify the data item, the user only has to send one request to the KYVE chain asking for the specific bundle's Merkle root. Since we can construct the full Merkle root from our single data item, we can verify the validated data by simply comparing our self-constructed Merkle root against the chain's Merkle root.

### Lifetime of a request
<img src="/img/trustless_api/trustless_server.png" alt="server sketch"/>
