---
sidebar_position: 1
---

# Overview

## Contribution to the network

The protocol nodes are the backbone of a KYVE storage pool. They are responsible for collecting data from a data source, bundling and uploading them to a web3 storage provider like Arweave and verifying it. This enables KYVE to store any data stream decentralized and permanently.

## Responsibilities

Since protocol nodes are responsible for uploading and verifying data they have to do certain tasks in order to contribute to the network and earn $KYVE rewards. Their main role is uploading data to a web3 storage provider like Arweave. Once a protocol node has uploaded a piece of data inside a storage pool all the other protocol nodes in that storage pool gather that proposed data and validate it on their end. Only when the majority of protocol nodes agree on the validity of the data the entry gets archived.

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
- **Runtime**: A prebuild integration for specific data sources which can be grouped together. For example `@kyvejs/evm` handles the archival of multiple EVM based blockchains
- **KYSOR**: The Cosmovisor of KYVE. Handles upgrading to newer protocol nodes automatically and comes with a CLI which helps bootstrapping protocol nodes.
- **Validator account**: The main account which holds $KYVE and grants valaccounts the permission to earn rewards for them
- **Valaccount**: The operating address of a protocol node. It holds only some $KYVE to pay for transaction fees and basically does all the work (upload and validate data)
