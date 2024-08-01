---
sidebar_position: 2
---

# How to use

:::tip
This section describes how to use the Trustless API and how to access the endpoint by KYVE.
:::

## Endpoint
The official endpoint of the Trustless API by the KYVE team can be found here: 

**https://data.services.kyve.network**

The endpoint provides data of various pools. For example, it includes the Ethereum // Blobs Pool from KYVE's Testnet and the Celestia // Blobs Pool from KYVE's Devnet. 
When selecting the URLs of the individual data, an attempt is made to mock the existing and therefore known endpoints in order to address external developers 
with the lowest possible barrier, which should promote the usage of the Trustless API. Therefore, all supported endpoints are listed on the start page of the API endpoint.

:::tip
If the data you're searching for is not supported yet, either contact the KYVE team or spin up [your own Trustless API endpoint](/developers/data_engineers/accessing_data/trustless_api/run_trustless_api).
:::

## Data schema

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "value": {
      "type": "object"
    },
    "proof": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "left": {
            "type": "boolean"
          },
          "hash": {
            "type": "string"
          }
        },
        "required": [
          "left",
          "hash"
        ]
      }
    },
    "poolId": {
      "type": "integer"
    },
    "bundleId": {
      "type": "integer"
    },
    "chainId": {
      "type": "string"
    }
  },
  "required": [
    "value",
    "proof",
    "poolId",
    "bundleId",
    "chainId"
  ]
}
```
- `value`: Requested value of the data item
- `proof`: Array of Merkle nodes
  - `left`: Tells if the local node is left or right
  - `hash`: Hash of the Merkle node (as hex)
- `poolId`: PoolID of the bundle
- `bundleId`: BundleID of the data item, includes the Merkle root
- `chainId`: ChainID of the pool

### Example: Trustless Data Item
```json
{
  "value": {
    "key": "19859302",
    "value": {
      "slot": 9063138,
      "blobs": []
    }
  },
  "proof": [
    {
      "left": false,
      "hash": "7e8648196aed553cd23dd12fdce29cb2b73b9b5ef0c1449f27278d0553408a90"
    },
    {
      "left": true,
      "hash": "5e40c091198a280ed20c34f484069c7df6fb4142875ea1d13aeadd8b7bf06d90"
    },
    {
      "left": false,
      "hash": "2dec2593b2c9ed984e32b65bd5fc51df563c520c3ef417aad371e6ea87d7f8ab"
    }
  ],
  "poolId": 21,
  "bundleId": 41398,
  "chainId": "kaon-1"
}
```