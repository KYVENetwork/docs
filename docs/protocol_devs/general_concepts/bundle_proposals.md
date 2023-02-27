---
sidebar_position: 3
---

# Bundle Proposals

Storing data is simple. Storing validated data coming from multiple parties is a bit more complicated. Because of
that, we will break down the process by which KYVE stores it's data.

## Saving data in rounds

Saving many data items or even a data stream is tricky. That's why we group data into bundles to store them more
efficiently. This enables KYVE to validate multiple data items which are bundled up in a single validation round. With
this method, we can break down a data stream into various rounds, making it easier to work with. A selected validator
will collect data in each round, create a bundle, and submit it to the network. This marks the beginning of such a
proposal round.

In summary, in each proposal round one bundle gets proposed which consists of multiple data items and gets validated by letting other validators check the proposed bundle and vote accordingly. On-chain the votes are tallied and once the result is valid entry of the bundle gets stored on chain as valid. The data is still on the storage provider but the chain has the storage id, thus making it possible to view all the valid storage ids and therefore view the actual content on the storage provider.

## Lifecycle of a bundle proposal

The lifecycle for one bundle proposal can be seen in the following diagram:

<p align="center">
  <img width="70%" src="/img/round_lifecycle.png" />
</p>

## Content of a bundle proposal

In contrast to many beliefs the bundle proposal which gets registered on-chain **does not** contain the actual data which is getting validated. It only holds a reference in form of the storage receipt.
That storage receipt can be used by anyone to retrieve the actual data from the storage provider. For Arweave for example this receipt is the transaction ID which looks like this: `iXJTjdxTwpEMdlLhdfhDnMgUxHr8TrOARvBxRTIZSsA`.

This implies that the uploader bundles up the data and stores it on the storage provider. With the storage receipt the uploader got he can submit the bundle proposal. All other participants in the pool
see what the uploader submitted and take the storage receipt and retrieve the actual data from it. Because every node in a pool locally creates their own bundle proposal it then can compare the proposed
proposal with the local one and vote accordingly.

But in order to be able to reconstruct the bundle proposal locally certain metadata has to be included in the proposal. The required metadata can be seen in the proposal registration transaction: `MsgSubmitBundleProposal`. Looking at the transaction arguments we can identify the following requirements:

- `creator`: the creator of the transaction. It is used to determine if the creator is also the current uploader, because only he can submit a bundle proposal for the current round.
- `staker`: the address of the valaccount. It is used to determine if the valaccount has sufficient stake and is actually in the storage pool
- `pool_id`: the id of the storage pool
- `storage_id`: here the previously mentioned storage receipt is stored. With this other participants in the network can retrieve the actual data and verify it
- `data_size`: the amount of bytes the data has which got stored on the storage provider. Used for the [reward calculation](/protocol_devs/advanced_concepts/uploader_reward_calculation.md) and is also verified by other validators
- `data_hash`: a sha256 hash of the raw data content which got stored on the storage provider. Once the bundle is valid the hash also gets stored on-chain together with the _storage_id_ so that data consumers can always verify the validity of the data they retrieve from the storage provider
- `from_index`: the current index of the storage pool. This is used to automatically check if the uploader submitted to correct slice of data and does not submit an already submitted bundle
- `bundle_size`: the amount of data items inside a bundle. Used for incrementing the storage pool index and for validating if the bundle is below the _max_bundle_size_ limit. This gets also validated by other validators
- `from_key`: the key of the first data item in a bundle. Is used for tagging purposes for the bundle proposal to easier find content afterwards
- `to_key`: the key of the last data item in a bundle. Is used for tagging purposes for the bundle proposal to easier find content afterwards
- `bundle_summary`: the summary of the bundle data. This is a string value which gets stored on-chain once the proposal is valid. This enables on-chain queries for actual data.

## Data Content of bundle proposals

Since we have only touched the content structure of the bundle proposal but not the actual bundle data which gets stored on the storage provider the following example might help to clarify this.
A bundle always is a JSON array of data items which have two properties, the `key` and the corresponding `value`. A real example of how a bundle could look like is this bundle from Bitcoin, which has the first two blocks in it. Notice how the `key` corresponds to the value's block height, since the block height is in Bitcoin the key to query the value, the block.

```json
[
  {
    "key": "0",
    "value": {
      "hash": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
      "height": 0,
      "version": 1,
      "versionHex": "00000001",
      "merkleroot": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
      "time": 1231006505,
      "mediantime": 1231006505,
      "nonce": 2083236893,
      "bits": "1d00ffff",
      "difficulty": 1,
      "chainwork": "0000000000000000000000000000000000000000000000000000000100010001",
      "nTx": 1,
      "nextblockhash": "00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
      "strippedsize": 285,
      "size": 285,
      "weight": 1140,
      "tx": [
        {
          "txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
          "hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
          "version": 1,
          "size": 204,
          "vsize": 204,
          "weight": 816,
          "locktime": 0,
          "vin": [
            {
              "coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
              "sequence": 4294967295
            }
          ],
          "vout": [
            {
              "value": 50,
              "n": 0,
              "scriptPubKey": {
                "asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
                "hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
                "type": "pubkey"
              }
            }
          ],
          "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000"
        }
      ]
    }
  },
  {
    "key": "1",
    "value": {
      "hash": "00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
      "height": 1,
      "version": 1,
      "versionHex": "00000001",
      "merkleroot": "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
      "time": 1231469665,
      "mediantime": 1231469665,
      "nonce": 2573394689,
      "bits": "1d00ffff",
      "difficulty": 1,
      "chainwork": "0000000000000000000000000000000000000000000000000000000200020002",
      "nTx": 1,
      "previousblockhash": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
      "nextblockhash": "000000006a625f06636b8bb6ac7b960a8d03705d1ace08b1a19da3fdcc99ddbd",
      "strippedsize": 215,
      "size": 215,
      "weight": 860,
      "tx": [
        {
          "txid": "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
          "hash": "0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098",
          "version": 1,
          "size": 134,
          "vsize": 134,
          "weight": 536,
          "locktime": 0,
          "vin": [{ "coinbase": "04ffff001d0104", "sequence": 4294967295 }],
          "vout": [
            {
              "value": 50,
              "n": 0,
              "scriptPubKey": {
                "asm": "0496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858ee OP_CHECKSIG",
                "hex": "410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac",
                "type": "pubkey"
              }
            }
          ],
          "hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000"
        }
      ]
    }
  }
]
```

Of course storing raw JSON data is quite inefficient. For this reason protocol nodes compress the JSON bundles (mostly GZip) and then store it which saves a lot of storage space and funds.

## Query Bundle Proposals

There are two types of bundle proposals: Ongoing bundle proposals which are currently validated and validated bundle proposals which are
stored forever on-chain (but with less data). Both can be viewed in the Web App or directly be queried from the REST API.

:::info
**NOTE**: Ongoing Bundle Proposals have a one-to-one relationship with pools. Validated Bundle Proposals on the other hand have a one-to-many relationship. In both circumstances a pool ID is always required to query for proposals
:::

### Web App

To view ongoing bundle proposals simply open the Web App, go to the pools page and click on a pool. If you scroll down a bit you should
see the status of an ongoing bundle proposal including the current collected votes and other metrics.

To view validated bundle proposals click on the tab `Bundles`. Here all validated bundles ever produced in this pool are listed including other helpful information.

### REST API

Ongoing bundle proposals are always attached to the pool query and can be found under `bundle_proposal`. As already mentioned before
in [Storage Pools](/protocol_devs/general_concepts/storage_pools.md) there are two endpoints where pools can be queried:

- `/kyve/query/v1beta1/pools`: gets all pools
- `/kyve/query/v1beta1/pool/{id}`: gets a single pool by it's ID

To query validated bundle proposals of a pool you can use the following endpoints

- `/kyve/query/v1beta1/finalized_bundles/{pool_id}`: gets all validated proposals from a pool
- `/kyve/query/v1beta1/finalized_bundles/{pool_id}/{id}`: gets a single validated proposal from a pool and the bundle ID

## Bundle validation over time

For multiple bundle proposals over time the following diagram can be used for reference. Note that when the uploader submits a new bundle proposal the current round immediately gets tallied and closed. That is the reason why bundle proposals are an ongoing process.

<p align="center">
  <img width="90%" src="/img/data_flow.png" />
</p>
