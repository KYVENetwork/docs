---
sidebar_position: 1
---

# Introduction

This data pool validates and archives state-sync snapshots from Osmosis and makes them permanently
available with Arweave and Irys (previously Bundlr).

## Overview

-   **Runtime**: @kyvejs/tendermint-ssync
-   **Data Source**: KSYNC (over serve-snapshots)
-   **Data**: state-sync snapshots every 10,000 blocks from genesis ongoing
-   **Storage Provider**: Irys
-   **Networks**
    -   [Kaon](https://app.kaon.kyve.network/#/pools/5) (Pool Id: 5)
    -   [Korellia](https://app.korellia.kyve.network/#/pools/5) (Pool Id: 5)
-   **Min Hardware Requirements**
    -   4 or more physical CPU cores
    -   32 GB RAM
    -   150 GB DISK
    -   100mbps network bandwidth

## General Setup

If you want to participate in the Osmosis // State-Sync pool you will have to run KSYNC with a set up Osmosis node which will act as the
data source for the KYVE protocol validator.

This is required because KSYNC enables the requesting of deterministic state-sync snapshots in order to validate
and archive them. Therefore, KSYNC is using already validated Osmosis data of the [Osmosis Mainnet pool](https://app.kyve.network/#/pools/1)
to feed the node with blocks and serves the created snapshots through an implemented server. With that setup, a user who wants to join this pool first has to sync
his Osmosis node with KSYNC to the current height of the latest created snapshot and then start the
actual KYVE protocol validator.

This architecture diagram summarizes the setup of the Osmosis // State-Sync integration on KYVE:

<p align="center">
  <img width="90%" src="/img/tendermint-ssync-archway.png" />
</p>

Here, the tendermint-ssync runtime is responsible for communicating with KSYNC, and forwarding the data to the KYVE core protocol. The KYVE core then handles the communication with the pool. This entire process (yellow) is the KYVE protocol validator. The resulting
data are the state-sync snapshots from the tendermint application - validated and permanently stored on a storage provider like Arweave.

## Goal

The goal of this pool is to validate and archive state-sync snapshots from Osmosis permanently and decentralized. With this
data, we want to make it possible for other nodes to state-sync the data from KYVE, making expensive archival nodes
on Osmosis obsolete in the long run. More information on how to perform state-sync with KYVE visit the documentation about
KSYNC [here](https://github.com/KYVENetwork/ksync).
