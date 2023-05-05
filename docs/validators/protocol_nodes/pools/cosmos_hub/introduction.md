---
sidebar_position: 1
---

# Introduction

This storage pool validates and archives all blocks from Cosmos Hub and makes them permanently
available with Arweave and Bundlr.

## Quick Facts

- **Runtime**: @kyvejs/tendermint-bsync
- **Data Source**: Self hosted Gaia full node (cosmoshub-4)
- **Data**: Blocks from height 5,200,791 ongoing
- **Storage Provider**: Bundlr
- **Networks**
  - [Kaon](https://app.kaon.kyve.network/#/pools/0) (Pool Id: 0)
  - [Korellia](https://app.korellia.kyve.network/#/pools/24) (Pool Id: 24)
- **Min Hardware Requirements**
  - 2 or more physical CPU cores
  - 16GB RAM
  - 512GB DISK
  - 50mbps network bandwidth

## General Setup

Every protocol node runner will run their own Gaia Full Node as a data source together with the KYVE node. This
ensures that the data which is getting proposed and validated actually comes from decentralized
sources. Furthermore, since the gaia blockchain node only serves valid blocks we further increase
the validation of this data. With that setup a user who wants to join this pool first has to sync
his gaia node to the current height the pool has already archived the blocks and then start the
actual KYVE protocol node.

This architecture diagram summarizes the setup of the Cosmos Hub integration on KYVE:

<p align="center">
  <img width="90%" src="/img/tendermint-bsync.png" />
</p>

Here the tendermint-bsync runtime is responsible for communicating with the tendermint application (purple) - in this case gaia, and forwarding the data to the KYVE core protocol. The KYVE core then handles the communication with the pool. This entire process (yellow) is the KYVE protocol node. The resulting
data are the blocks from the tendermint application - validated and permanently stored on a storage provider like Arweave.

## Goal

The goal of this pool is to validate and archive all blocks from Cosmos Hub permanently and decentralized. With this
data we want to make it possible for other nodes to block sync the data from KYVE, making expensive archival nodes
on Cosmos obsolete in the long run. More information on how to perform block sync with KYVE visit the documention about
KSYNC [here](https://github.com/KYVENetwork/ksync).
