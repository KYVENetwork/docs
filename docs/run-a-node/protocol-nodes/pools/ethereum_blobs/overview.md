---
sidebar_position: 1
---

# Overview

This data pool validates and archives blobs from Ethereum (EIP-4844) for certain contract addresses
and makes them permanently available with Arweave and Irys.

## Overview

- **Runtime**: @kyvejs/ethereum-blobs
- **Data Source**: Self hosted Ethereum full node (Lighthouse & Geth)
- **Data**: Blobs starting from the Dencun upgrade
- **Storage Provider**: Irys
- **Networks**
  - [Kaon](https://app.kaon.kyve.network/#/pools/20) (Pool Id: 20)
  - [Korellia](https://app.korellia.kyve.network/#/pools/96) (Pool Id: 96)
- **Min Hardware Requirements**
  - 8 or more physical CPU cores
  - 16 GB RAM
  - 2 TB DISK
  - 100mbps network bandwidth

## Requirements

Before you can run a protocol validator on any pool, there are some basic requirements that have to be met, ranging from simple hardware specs to owning a certain amount of $KYVE and other currencies.
Make sure you meet the requirements described [here](/docs/run-a-node/protocol-nodes/requirements.md).

## Goal

The goal of this pool is to validate and archive all blobs for certain L2s permanently and decentralized. With this
data we want to play a key role in the required decentralized storage of these blobs and making them a public good for
scalable, reliable building on Ethereum. Furthermore, the validated data will be accessible through the Trustless-API,
mocking the `/eth/v1/beacon/blob_sidecars` endpoint. This enables a number of further use cases for data analysis and
node runners in the Ethereum ecosystem.
