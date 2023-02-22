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

### Protocol Nodes

Protocol nodes are the backbone of a KYVE storage pool. A protocol node always runs in a specific storage pool which valdiates a specific source of data. They are responsible for collecting data from a data source, bundling and uploading them to a Web3 storage provider like Arweave and verifying it. 

More information about protocol nodes can be found [here](/validators/protocol_nodes/overview.md)
