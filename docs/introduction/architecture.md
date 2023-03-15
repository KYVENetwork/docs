---
sidebar_position: 2
---

# Architecture

## Data Validation and Storage

KYVE's objective is to validate and store data streams on decentralized storage providers without the requirement of trust. To accomplish this, KYVE utilizes its Proof of Stake blockchain with a network of storage pools which run on top of it. _Uploaders_ collect data from sources, store them on decentralized providers, and submit them to storage pools for validation by network participants known as _validators_. The validated data can then be accessed by data consumers to construct decentralized applications without the need to trust KYVE or any intermediaries.

<p align="center">
  <img width="80%" src="/img/goal.png" />
</p>

## Layers

To achieve this at scale KYVE consists of two layers: the _chain layer_ and the _protocol layer_. Here, the chain layer is a sovereign Proof of Stake blockchain built with [Cosmos](https://cosmos.network/) and using the [Tendermint](https://tendermint.com/) consensus engine. It's main goal is to find consensus and secure the protocol layer on top of it. The protocol layer has all the logic which makes KYVE unique and enables the actual data validation.

<p align="center">
  <img width="40%" src="/img/kyve_layers.png" />
</p>

## Nodes

Because there are two different layers, each essential but with very different requirements, KYVE also has two different types of nodes. First we have the _chain nodes_ which are a set of validators that are responsible for committing new blocks in the blockchain. These validators participate in the consensus protocol by broadcasting votes which contain cryptographic signatures signed by each validator's private key.

The _protocol nodes_ on the other hand always run on a specific _storage pool_ which is responsible for validating and archiving a specific data source. Protocol nodes collect data from the data source, submit them to a storage pool where other pool participants can validate the submitted data on their end. Every participant is able to cast a vote on the validity of the data. Depending on the result of the votes the data is being archived and the participant that uploaded the data will receive a reward for their efforts.


:::tip
A more detailed overview and guides on how to run those nodes can be found [here](/validators/validators_overview.md)
:::

To summarize the different types of nodes and to make it more clear where the nodes are actually running the diagram below can be used:

<p align="center">
  <img width="80%" src="/img/kyve_network.png" />
</p>

As already mentioned above, protocol nodes are responsible for the actual data validation, while the chain nodes are responsible for finding consensus and securing the network. The submission of data, the voting and the vote tallying at the end is all implemented directly into the blockchain itself with the help of Cosmos SDK modules.

:::tip
You can find all the info about how the KYVE protocol works in detail [here](/protocol_devs/overview.md)
:::
