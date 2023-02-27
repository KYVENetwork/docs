---
sidebar_position: 1
---

# Overview

## Contribution to the Network

Protocol nodes are the backbone of a KYVE storage pool. They are responsible for collecting data from a data source, bundling and uploading them to a Web3 storage provider like Arweave and verifying it. This enables KYVE to store any data stream permanently and in a decentralized way.

## Responsibilities

Since protocol nodes are responsible for uploading and verifying data they need to do certain tasks in order to contribute to the network and earn $KYVE rewards. Their main role is uploading data to a Web3 storage provider like Arweave. Once a protocol node has uploaded a piece of data inside a storage pool, all the other protocol nodes in that storage pool gather that proposed data and validate it on their end. Only when the majority of protocol nodes agree on the validity of the data the entry gets archived.

## Accounts and Rewards

Since the introduction of Inter-Pool Security, a KYVE validator can join multiple pools at once, securing every
pool with the validator's stake. To make this possible, the owner of the stake (validator account) and the actual operator (valaccount) are logically separated to allow horizontal scaling. With this solution in mind, the validator holds all the stake and earns all the rewards. In return, they grant permission to valaccounts which then upload and validate the data. The rewards earned then go to the validator account. An overview can be found below:

![valaccounts](/img/valaccounts.png)

Here the following entities have characteristics:

- **Validator Account**
  - Recommended to be a cold wallet since it holds the stake of the entire validator and rarely needs to make transactions
  - Responsible to provide the actual stake and takes the risk of getting slashed
  - Responsible for adding new valaccounts if the validator wants to join a pool
  - Responsible for providing gas funds for the valaccount so it can pay for transaction fees
  - Can have multiple valaccounts
  - Losing the private key results in losing the entire stake and all earned rewards
- **Valaccount**
  - Stored on a server or wherever the protocol node is executed. Typically a hot wallet since it needs
    to be constantly accessed by the protocol node to participate in a pool
  - Responsible for submitting bundle proposals and voting on them
  - Can only belong to one validator and only run on one pool at a time
  - Losing the private key can result in a timeout slash when the protocol node is still active in a pool. In the worst case a malicious actor could cause an upload slash which then results in losing a part of the validator's stake
- **Pool**
  - A storage pool where validators upload and validate data which then gets archived on a web3 storage provider
  - Validators can earn rewards by successfully proposing data bundles which get accepted by the network
  - Validators are punished by slashing for acting maliciously

## Summary on how to run a protocol node

A detailed step by step guide on how to run a protocol node can be found in the following sections. A rough overview of requirements and steps are listed below:

- **Requirements**
  - Get a machine with certain hardware requirements
  - Choose a pool and verify that you own enough $KYVE to join
  - Setup a storage provider wallet and fund it
- **Installation**
  - Install KYSOR (The Cosmovisor for protocol nodes)
  - Create a valaccount (The valoper address for protocol nodes)
  - Install pool binaries
- **Run a node**
  - Start a node and run them as a background process

## Terminology

- **Protocol Node**: A software client build and maintained by KYVE in order to participate in KYVE storage pools which are responsible for uploading and validating data, therefore maintaining the network
- **Runtime**: A prebuilt integration for specific data sources which can be grouped together. For example `@kyvejs/evm` handles the archival of multiple EVM based blockchains
- **KYSOR**: The Cosmovisor of KYVE. Handles upgrading to newer protocol nodes automatically and comes with a CLI which helps bootstrapping protocol nodes.
- **Validator account**: The main account which holds $KYVE and grants valaccounts the permission to earn rewards for them
- **Valaccount**: The operating address of a protocol node. It holds only some $KYVE to pay for transaction fees and basically does all the work (upload and validate data)
