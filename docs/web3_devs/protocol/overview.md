---
sidebar_position: 1
---

# High Level Overview

KYVE is a network of storage pools built to store data streams or create snapshots of already existing data.
It is secured by its blockchain built on [Cosmos](https://cosmos.network/).

To enable efficient data validation and scalability KYVE consists of two layers which are explained below.

![architecture](/img/architecture.png)

The following entities are highly relevant for the KYVE protocol and are essential to understand before diving deeper into the details.

## KYVE Blockchain (Chain Layer)

The KYVE blockchain is the backbone of KYVE. The chain layer is an entirely
sovereign [Proof of Stake](https://en.wikipedia.org/wiki/Proof_of_stake) blockchain built
with [Cosmos](https://cosmos.network/). This blockchain is run by independent nodes we call _chain nodes_ since they're
running on the chain level. The native currency of the KYVE chain is $KYVE. It secures the chain and allows chain nodes to stake and other users to delegate to them.

Because the KYVE blockchain is a Cosmos app chain the custom KYVE logic needed for data validation and archival is directly implemented into the blockchain itself. The source code can be found here: [github.com/KYVENetwork/chain](https://github.com/KYVENetwork/chain).

### Chain Nodes

The KYVE blockchain is built on [Tendermint Core](https://github.com/tendermint/tendermint), which relies on validators to commit new blocks to the blockchain using a consensus protocol. These validators participate by broadcasting votes with cryptographic signatures signed by their private keys. Validator candidates can stake their own tokens and have tokens delegated to them by token holders. KYVE's native token is **$KYVE**, and at genesis, KYVE will launch with 100 validator slots. The top 100 validator candidates with the most stake will become KYVE validators.

More information about chain nodes can be found [here](/validators/chain_nodes/chain_node.md)

## KYVE Protocol (Protocol Layer)

The protocol layer sits on top of the chain layer and enables the actual use case of KYVE. Every feature and unit of
logic which makes KYVE unique is implemented directly into the chain nodes with the help of Cosmos' [Application-Specific Blockchains](https://docs.cosmos.network/main/intro/why-app-specific).

### Storage Pools

Generally, storage pools (or just pools) can be described as discrete entities arranged around specific data sources.
Anyone can create them through governance and can store any data stream. They are stored and operate on-chain, making them completely trustless. They are responsible for actually validating and archiving data by allowing participants (protocol node runners) to join a pool and managing the validation process on-chain, thus making the validity of the data trustless.

**A pool always has to specify the following requirements:**

- One or more data sources which the pool wants to validate and archive
- A runtime which has defined how to validate the data
- A web3 storage provider where validated data should get stored to (e.g. Arweave)

If those requirements are met protocol nodes can join a pool and actually start validating the data.

### Protocol Nodes

Protocol nodes are the backbone of a KYVE storage pool. They are responsible for collecting data from a data source, bundling and uploading them to a Web3 storage provider like Arweave and verifying it. This enables KYVE to store any data stream permanently and in a decentralized way.

More information about protocol nodes can be found [here](/validators/protocol_nodes/overview.md)
