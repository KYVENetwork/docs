---
sidebar_position: 1
---

# High-level Overview

## Goal

The goal of KYVE is to verify any data streams and store them validated on decentralized storage providers without the need for trust. This is achieved by a network of storage pools which are secured by KYVE's own Proof of Stake blockchain.

In summary, _uploaders_ are collecting data from the data sources, storing them on decentralized storage providers and submitting them for validation in storage pools so that other network participants (_validators_) can verify it. Data consumers then can use the validated data without needing to trust KYVE or other intermediaries to further build decentralized applications.

<p align="center">
  <img width="80%" src="/img/goal.png" />
</p>

## Architecture

KYVE has two main layers of concern: the _chain layer_ and the _protocol layer_. Each are essential but come with different tasks and responsibilities.

<p align="center">
  <img width="80%" src="/img/kyve_network.png" />
</p>

### Chain Layer

The chain layer consists of the KYVE blockchain and is the backbone of KYVE. The KYVE blockchain is built with the [Cosmos SDK](https://cosmos.network/) and uses [Tendermint](https://tendermint.com/) as the consensus engine. This blockchain is run by independent nodes we call _chain nodes_ since they're
running on the chain level. The native currency of the KYVE chain is $KYVE. It secures the chain and allows chain nodes to stake and other users to delegate to them.

Because the KYVE blockchain is a Cosmos app chain the custom KYVE logic needed for data validation and archival is directly implemented into the blockchain itself.

:::info
**NOTE**: The source code can be found here: [https://github.com/KYVENetwork/chain](https://github.com/KYVENetwork/chain)
:::

#### Chain Nodes

Since KYVE's blockchain is based on Tendermint it relies on a set of validators that are responsible for committing new blocks in the blockchain. These validators participate in the consensus protocol by broadcasting votes which contain cryptographic signatures signed by each validator's private key.

:::info
**NOTE**: You can find more information about chain nodes [here](/validators/chain_nodes/chain_node.md)
:::

### Protocol Layer

The protocol layer sits on top of the chain layer and enables the actual use case of KYVE. Every feature and unit of
logic which makes KYVE unique is implemented directly into the chain nodes with the help of Cosmos' [Application-Specific Blockchains](https://docs.cosmos.network/main/intro/why-app-specific).

#### Protocol Nodes

Protocol nodes are the backbone of a KYVE storage pool. A protocol node always runs in a specific storage pool which validates a specific source of data. They are responsible for collecting data from a data source, bundling and uploading them to a Web3 storage provider like Arweave and verifying it.

:::info
**NOTE**: You can find more information on protocol nodes [here](/validators/protocol_nodes/overview.md)
:::
