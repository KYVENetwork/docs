---
sidebar_position: 1
---

# Trustless API

## Concept
For some of the data pools, especially in the EVM and Celestia ecosystems, the main way to use the data is through an 
API endpoint. This should then make a data item accessible without first downloading and validating the entire bundle. The 
problem: Once only the data item is provided, there was no way to check if it was included in the validated bundle without 
downloading the bundle itself.

### Data Item Inclusion Proof
The Data Item Inclusion Proof allows one to check a data item’s validity without requiring to download the whole bundle. 
Therefore, the bundle summary is extended with a Merkle root of a Merkle tree containing all data items. When retrieving data, 
a server (Trustless API) is responsible for serving data items and provides not only the requested item but also an array of 
hashes of all data items (leafs of the Merkle tree). This allows the client to hash the local data item and check if it's in 
the provided array. If found, the client can reconstruct the Merkle tree to verify the computed root against the one stored in 
the bundle summary on-chain. This increases the efficiency of the inclusion proof significantly, because to ensure a data item's 
validity only the Merkle tree would need to be computed in order to perform a Merkle proof to check if the data item has been 
included in the bundle.

### Data retrieval process
With the new possibility of verifying the validity of a data item without the requirement of downloading the whole bundle, 
an API can be implemented that mocks existing and well-known endpoints and fills those with validated KYVE data. This significantly 
increases the adoption of validated KYVE data, as a large number of data users have a high potential interest in the endpoint 
regardless of KYVE.

The Trustless API is responsible for
1. finding the correct bundle for the requested key (e.g. height or slot number for a certain blob).
2. extracting the data item from the bundle.
3. computing the hash for each data item of the bundle (all leaves of the Merkle tree).
4. providing the requested data with everything the client needs to prove the data validity by reconstructing the Merkle tree and comparing the Merkle root (hashes for all data items, bundle ID, pool ID).

After the client received a response from the Trustless API, it can verify the data validity by
1. computing the local hash of the data item and checking if it’s contained in the array of hashes.
2. reconstructing the Merkle tree in order to compare the local calculated Merkle root with the one stored in the bundle summary on-chain. If it’s the same, it is verified that the local data item was included in the bundle and therefore is validated by KYVE.


## Trustless API endpoint

A running Proof-of-Concept is accessible here: https://data.services.kyve.network

This mocks the known `beacon/blob_sidecars` endpoint, providing validated and archived blobs by KYVE.

## Embed the Trustless API

This section will be available soon.

## Spin up your own Trustless API

This section will be available soon.