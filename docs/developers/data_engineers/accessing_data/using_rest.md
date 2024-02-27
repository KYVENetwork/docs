---
sidebar_position: 0
---

# Accessing Stored Data via REST

KYVE data is available for developers through the REST-API exposed by the consensus validators, a list of REST endpoints can be
found [here](/web3_devs/grpc.md). The REST integration
is the native way to access data that has been stored through KYVE.

## Understanding Storage Providers and Compression

Because KYVE does not store any data, developers must fetch the underlying data from the storage provider.
The KYVE REST-API holds the proof that data on a storage provider is valid and can be retrieved trustless. A list of
valid
bundles is available at the `kyve/v1/bundles/[pool_id]` path.

The returned elements include a `storage_provider_id` which points to a storage provider. In combination with the
`storage_id` developers can retrieve the uploaded data.

Some integrations might compress data before storing it on the storage provider. The `compression_id` indicates which
[compression method](../adding_data/compressions/overview.md) has been used.

After the data has been retrieved from the storage provider and decompressed, developers can use it in the application.

## Parameters

**Pagination**

The bundles query supports pagination via the following query parameters:

| Name               | Type    | Description                                           |
|--------------------|---------|-------------------------------------------------------|
| pagination.limit   | number  | Defines the amount of bundles returned                |
| pagination.offset  | number  | The amount of bundles to skip                         |
| pagination.key     | string  | Define key if next_key iteration should be used.      |
| pagination.reverse | boolean | Reverse order                                         |

One either has to use `pagination.offset` or `pagination.key`. Both can not be 
used at the same time.

The pagination key is a base64 encoded string. When using inside the browser
keep in mind that some characters need to be escaped.

**Specific Item**

If one wants to find a bundle which contains a specific data item (identified
by the index), there is the index query.

| Name  | Type   | Description                                           |
|-------|--------|-------------------------------------------------------|
| index | number | Filters for the bundle which contains the given index |

## Next steps

An easier way to get KYVE data integrated into your application is using the KYVE ELT Pipeline.
