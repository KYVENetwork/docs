---
sidebar_position: 1
---

# Introduction

This data pool validates and archives all blocks and block results from dYdX and makes them permanently
available with Arweave and Bundlr.

## Overview

- **Runtime**: @kyvejs/tendermint
- **Data Source**: Self hosted dYdX full node (dydx-mainnet-1)
- **Data**: Blocks from Genesis ongoing
- **Storage Provider**: Bundlr
- **Networks**
  - [Kaon](https://app.kaon.kyve.network/#/pools/8) (Pool Id: 8)
  - [Korellia](https://app.korellia.kyve.network/#/pools/42) (Pool Id: 42)
- **Min Hardware Requirements**
  - 8 or more physical CPU cores
  - 32 GB RAM
  - 1.5 TB DISK
  - 100mbps network bandwidth

## General Setup

If you want to participate in the dYdX pool you will have to run an dYdX Full node which will act as the
data source for the KYVE protocol validator.

This ensures that the data which is getting proposed and validated actually comes from decentralized
sources. Furthermore, since the dYdX blockconsensus validator only serves valid blocks we further increase
the validation of this data. With that setup a user who wants to join this pool first has to sync
his dYdX node to the current height the pool has already archived the blocks and then start the
actual KYVE protocol validator.

This architecture diagram summarizes the setup of the dYdX integration on KYVE:

<p align="center">
  <img width="90%" src="/img/tendermint_archway.png" />
</p>

Here the tendermint runtime is responsible for communicating with the tendermint application (purple) - in this case dydxprotocold, and forwarding the data to the KYVE core protocol. The KYVE core then handles the communication with the pool. This entire process (yellow) is the KYVE protocol validator. The resulting
data are the blocks and the block results from the tendermint application - validated and permanently stored on a storage provider like Arweave.

## Goal

The goal of this pool is to validate and archive all blocks and block results from dYdX permanently and decentralized. With this
data we want to make it possible for other nodes to block sync the data from KYVE, making expensive archival nodes
on dYdX obsolete in the long run. More information on how to perform block sync with KYVE visit the documentation about
KSYNC [here](https://github.com/KYVENetwork/ksync). In addition, the validated archived block results enable a number of further use cases for data analysis.
