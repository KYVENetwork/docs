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

## How the crawler works in detail

<img width="70%" src="/img/trustless_api/trustless_crawler.png" alt="Crawler sketch"/>

As previously mentioned, the `crawler` is responsible for retrieving all bundles from the KYVE chain and storing each data item. The crawler process knows which pools to query based on the `config.yml` file provided. You can find a template configuration under `./config/config.template.yml.`

The config file contains all `poolId`s that should be crawled. The crawler itself functions like a master, starting one go-routine per `poolId` that is responsible for crawling that specific `poolId`.

Each go-routine (referred to as a ChildCrawler from here on) performs the following tasks: 
- query missing bundles
- for each data item in the bundle
	-  it generates a data inclusion proof for that specific bundle
 	-  precomputes the Trustless API response
  	-  saves the response
  	-  and saves the response location for certain keys
- repeats that every n-seconds

### Query Bundles

To insert a bundle we first have to retrieve its bundle data.
- first we have to query for that specific bundleId on the KYVE chain, we call this the `finalizedBundle` (the ChildCrawler will use the `chainrest` defined in the config)
- then we have to get the decompressed bundle data associated with the `finalizedBundle` from the given storage provider (the ChildCrawler will use the `storagerest` defined in the config)
- the decompressed bundle data is an array of data items, we compute the hash value of every single data item for the inclusion proof

### Generate Data Inclusion Proof

Now that we have the bundles data items and each corresponding data item hash, we can start generating the trustless data items that contain a proof of inclusion.
We do this by iterating over each data item of the bundle and computing a compact merkle tree for each data item. The compact merkle tree only contains the necessary hashes for constructing the merkle root. This root will be equal to the merkle root stored on the KYVE chain.

### Precompute Trustless API Response

Finally, we can build the response, which will consist of the actual data item and its corresponding inclusion proof. Additionally we need to include relevant information for the user to verify the data items merkle root, like the chainId, poolId and bundleId.

### Save Response & Keys

As a last step, we save/upload all responses to a file storage, like S3, and save the location in the database.

### Indexer
We have to generate indices on each data item because we want to quickly retrieve the trustless data item based on a specific key that corresponse to that exact data item. For each data item, there must be at least one index, but there can be more than one. The crawler will generate indices based on the `indexer` defined in the `config.yml`.

The whole purpose of the Indexer is to return the possible indices of a specific data item, that then will be stored and later queried in the database.

**Example: `EthBlobs`**

The `EthBlobsIndexer` generates all necessary indices to query for blobs:
- block_height
- slot_number

This means, the `EthBlobsIndexer` will take a bundle, which is an array of data items, as an argument and return an array of trustless data items back. A trustless data item contains the actual data, the inclusion proof and all necessary information to verify that proof (like chainId, bundleId). Additionally it contains an array of indicies for that specific data item, these indicies will then be stored in the data base to correctly retrieve the trustless data item later on.

```go
func (e *EthBlobsIndexer) IndexBundle(bundle *types.Bundle) (*[]types.TrustlessDataItem, error) {
	var trustlessItems []types.TrustlessDataItem
	for index, dataitem := range bundle.DataItems {

        	// calculate inclusion proof
        	...

		// calculate indicies
		var indices []types.Index = []types.Index{
			{Index: dataitem.Key, IndexId: IndexBlockHeight},
			{Index: blobData.SlotNumber, IndexId: IndexSlotNumber},
		}

		trustlessDataItem := types.TrustlessDataItem{
			Value:     raw,
			Proof:     proof,
			BundleId:  bundle.BundleId,
			PoolId:    bundle.PoolId,
			ChainId:   bundle.ChainId,
			Indices:   indices,
		}
		trustlessItems = append(trustlessItems, trustlessDataItem)
	}
	return &trustlessItems, nil
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
|uint, primary key|int64|int64|int|string|

**IndexDocument**
|Value|IndexID|DataItemID|
|-|-|-|
|string, primary key|int, primary key|uint|

We have to save the index id, because there might be more than one index for a data item e.g. `block_height` & `slot_number`.

We use a database adapter interface to separate the database implementation from our logic. This allows us to switch databases without modifying anything else except the database adapter.

Adapter interface:
```go
type Adapter interface {
	Save(bundle *types.Bundle) error
	Get(indexId int, key string) (files.SavedFile, error)
	GetMissingBundles(lastBundleId int64) []int64
	GetIndexer() indexer.Indexer
}
```

As you can see, we make use of only three methods to interact with the database. When inserting the data items it is important to submit them all with only one transactions, otherwise it might be possible that we fail to save some data items of a bundle resulting in incomplete data.

When saving a bundle, the adapter is responsible for the following:
- convert the bundles data items into trustless data items via. an indexer
- upload/save the trustless data items to a location (this will be done via a FileAdapter, see next chapter)
- write all necessary information about the data item and its location into the database
- and finally insert every index that exists for that specific data item (in case of EthBlobs this would be the `block_height` and `slot_number`)

### File Adapter

The Trustless API can save the trustless data items to various locations, therefore we need to account for different file types. The FileAdapter is responsible for that.

Currently there are only two FileAdapter: 
- local file
- s3 file

A FileAdapter is only responsible for saving a trustless data item. The corresponding interface looks like the following:

```go
type SaveDataItem interface {
	Save(dataitem *types.TrustlessDataItem) (SavedFile, error)
}
```

## How the server works in detail
<img src="/img/trustless_api/trustless_server.png" alt="server sketch"/>

The crawler has done the difficult part of indexing each bundle, now the server is able to simply retrieve the requested data item from the database.

1. A user requests a specific data item with a key. E. g. the user does the following request: `/beacon/blob_sidecars?block_height=1337`
2. Now the server looksup the data item location for that key. Following our example, the server would call the database adapter with the following arguments: `Get(1337, EthBlobIndexHeight)`
    - `EthBlobIndexHeight = 0` because the block_height is the first index defined in `EthBlobs`
3. Now that we have the data items location, the server either redirects to that location, or serves it directly. This behaviour can be set in the `config.yml`.
4. At this point the server has provided the user with all the necessariy information to query for the on-chain merkle root for that specific data item.
5. Finally, the user constructs the local merkle root hash based on the provided data item from the server and compares it to the on-chain merkle root.