---
title: Getting Started
order: 1
parent:
  title: REST
  order: 1
---

# Accessing data via REST

KYVE data is available for developers through the REST-API exposed by the chain nodes, a list of REST endpoints can be found [here](/developers/grpc.html#api-endpoint). The REST integration
is the native way to access data that has been stored through KYVE.

## Understanding Storage Providers and Compression

Because KYVE does not store any data, developers must fetch the underlying data from the storage provider.
The KYVE REST-API holds the proof that data on a storage provider is valid and can be retrieved trustless. A list of valid
bundles is available at the `kyve/query/v1beta1/finalized_bundles/[pool_id]` path.

The returned elements include a `storage_provider_id` which points to a storage provider. In combination with the
`storage_id` developers can retrieve the uploaded data.

Some integrations might compress data before storing it on the storage provider. The `compression_id` indicates which
compression method has been used.

After the data has been retrieved from the storage provider and decompressed, developers can use it in the application.

## Next steps

An easier way to get KYVE data integrated into your application is using the KYVE ELT Pipeline.
