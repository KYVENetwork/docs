---
sidebar_position: 2
---
# General Setup

TODO: generalize

If you want to participate in the Osmosis pool you will have to run an Osmosis Full node which will act as the data source for the KYVE protocol validator.

This ensures that the data which is getting proposed and validated actually comes from decentralized
sources. Furthermore, since the Osmosis blockconsensus validator only serves valid blocks we further increase
the validation of this data. With that setup a user who wants to join this pool first has to sync
his Osmosis node to the current height the pool has already archived the blocks and then start the
actual KYVE protocol validator.

This architecture diagram summarizes the setup of the Osmosis integration on KYVE:

<p align="center">
  <img width="90%" src="/img/tendermint.png" />
</p>

Here the tendermint runtime is responsible for communicating with the tendermint application (purple) - in this case osmosisd, and forwarding the data to the KYVE core protocol. The KYVE core then handles the communication with the pool. This entire process (yellow) is the KYVE protocol validator. The resulting
data are the blocks and the block results from the tendermint application - validated and permanently stored on a storage provider like Arweave.