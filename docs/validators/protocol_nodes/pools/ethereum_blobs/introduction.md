---
sidebar_position: 1
---

# Introduction

This data pool validates and archives blobs from Ethereum (EIP-4844) for certain contract addresses
and makes them permanently available with Arweave and Bundlr.

## Overview

- **Runtime**: @kyvejs/ethereum-blobs
- **Data Source**: Self hosted Ethereum full node (Lighthouse & Geth)
- **Data**: Blobs starting from the Dencun upgrade
- **Storage Provider**: Bundlr
- **Networks**
  - [Kaon](https://app.kaon.kyve.network/#/pools/20) (Pool Id: 20)
  - [Korellia](https://app.korellia.kyve.network/#/pools/96) (Pool Id: 96)
- **Min Hardware Requirements**
  - 8 or more physical CPU cores
  - 16 GB RAM
  - 2 TB DISK
  - 100mbps network bandwidth

## General Setup

If you want to participate in the Ethereum // Blobs pool you will have to run an Ethereum Full node which will act as the
data source for the KYVE protocol validator.

This ensures that the data which is getting proposed and validated actually comes from decentralized
sources. Furthermore, since the Ethereum clients only serves valid blocks and transactions we further increase
the validation of this data. With that setup a user who wants to join this pool first has to sync
his Ethereum node to the current height the pool has already archived the blobs and then start the
actual KYVE protocol validator.

This architecture diagram summarizes the setup of the Archway integration on KYVE:

<p align="center">
  <img width="90%" src="/img/ethereum-blobs.png" />
</p>

Here the ethereum-blobs runtime is responsible for communicating with the Etherum node - consisting of the Consensus and Execution clients, and forwarding the data to the KYVE core protocol. 
The KYVE core then handles the communication with the pool. This entire process (yellow) is the KYVE protocol validator. The resulting
data are the blobs from the Ethereum node - validated and permanently stored on a storage provider like Arweave.

## Goal

The goal of this pool is to validate and archive all blobs for certain L2s permanently and decentralized. With this
data we want to play a key role in the required decentralized storage of these blobs and making them a public good for 
scalable, reliable building on Ethereum. Furthermore, the validated data will be accessible through the Trustless-API,
mocking the `/eth/v1/beacon/blob_sidecars` endpoint. This enables a number of further use cases for data analysis and 
node runners in the Ethereum ecosystem.
