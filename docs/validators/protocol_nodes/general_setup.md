---
sidebar_position: 2
---

# General Setup

Before you can participate in any pool, we require you to run a full node of the respective source (e.g. Osmosis &#x21D2; Osmosis full node). This full node will serve as the data source for the KYVE protocol validator.

This ensures that the data which is getting proposed and validated actually comes from decentralized
sources. Furthermore, since the respective source blockconsensus validator only serves valid blocks we further increase
the validation of this data. With that setup a user who wants to join a pool first has to sync
his full node to the current height the pool has already archived the blocks and then start the
actual KYVE protocol validator.

The follwing architecture diagram summarzies the setup, in this case for the Osmosis integration on KYVE:

<p align="center">
  <img width="90%" src="/img/tendermint.png" />
</p>

Here the tendermint runtime is responsible for communicating with the tendermint application (purple) - in this case osmosisd, and forwarding the data to the KYVE core protocol. The KYVE core then handles the communication with the pool. This entire process (yellow) is the KYVE protocol validator. The resulting
data are the blocks and the block results from the tendermint application - validated and permanently stored on a storage provider like Arweave.
