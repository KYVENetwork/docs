---
sidebar_position: 0
---

# Overview

## What is KSYNC?

Since KYVE is validating and archiving blocks from several blockchains permanently this data can be used to bootstrap nodes. This is especially helpful since most nodes today are pruning nodes and therefore finding peers which have the requested blocks becomes harder each day. With KSYNC nodes can retrieve the data from KYVE and directly feed the blocks into every Tendermint based Blockchain Application in order to sync blocks and join the network.

:::info
You can find the source code and additional docs in the GitHub repository [here](https://github.com/KYVENetwork/ksync).
:::

## How does it work?

KSYNC comes with three sync modes which can be applied depending on the type of application. There is DB-SYNC which syncs blocks by directly communicating with the app and writing the data directly to the database and then there P2P-SYNC where KSYNC mocks a peer in the network which has all the required blocks, streaming them over the dedicated block channels over to the node.

After a node has been successfully synced with KSYNC the node simply can fetch remaining blocks and switch to live mode like it would have if synced normally. This makes operating nodes way cheaper and even may make archival nodes obsolete since blocks archived by KYVE can then be safely dropped in the nodes and synced again once needed with this tool.
