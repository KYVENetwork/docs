---
sidebar_position: 0
---

# Overview

### Rapidly sync validated blocks and snapshots from KYVE to every Tendermint based Blockchain Application.

## What is KSYNC?

Since KYVE is validating and archiving blocks and state-sync snapshots from several blockchains permanently this data can be
used to bootstrap nodes. This is especially helpful since most nodes today are pruning nodes and therefore
finding peers which have the requested blocks becomes harder each day. With KSYNC nodes can retrieve
the data from KYVE and directly feed the blocks into every Tendermint based Blockchain Application in order
to sync blocks and join the network. Furthermore, any Tendermint based application can rapidly join the network by
applying state-sync snapshots which are permanently archived on Arweave.

:::info
You can find the source code and additional docs in the GitHub repository [here](https://github.com/KYVENetwork/ksync).
:::

## How does it work?

KSYNC basically replaces the inbuilt tendermint process and communicates with the app directly over the Tendermint
Socket Protocol (TSP) with the [ABCI](https://github.com/tendermint/spec/blob/master/spec/abci/abci.md) interface.
Once KSYNC has retrieved the requested blocks for the application from a permanent storage provider like Arweave it
executes them against the app and stores all relevant information in the blockstore and state.db databases directly. The
same applies to _state-sync_ snapshots, where KSYNC offers the snapshots over the ABCI methods against the app.

After a node has been successfully synced with KSYNC the node simply can fetch remaining blocks and switch to live mode
like it would have if synced normally. This makes operating nodes way cheaper and even may make archival nodes
obsolete since blocks archived by KYVE can then be safely dropped in the nodes and synced again once needed
with this tool.

Overview of how KSYNC interacts with the tendermint application:

<p align="center">
  <img width="70%" src="/img/db_sync.png" />
</p>