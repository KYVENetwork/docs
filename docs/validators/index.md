---
sidebar_position: 1
---

# Overview

Validators are the backbone of KYVE and depending on which type of validator you want to join different requirements and responsibilities have to be met.

## Types of validators

KYVE currently has two types of validators: A _consensus validator_ which is a validator in a Cosmos based Proof of Stake blockchain. Their main tasks are finding consensus on the chain state which includes keeping track of the data pools and other related data. On the other hand we have _protocol validators_ which is a validator on the protocol level. Their main tasks are connecting to data pools and uploading and validating data from various data sources, archiving them on a web3 storage provider like Arweave. A general overview of that architecture can be found below:

![architecture](/img/architecture.png)

## Differences

Because of the nature of each type of validator there are many differences regarding the setup, minimum stake and other requirements. An overview of those differences can be found below:

|                             | Consensus validator                                   | Protocol validator                                |
| --------------------------- |----------------------------------------------| -------------------------------------------- |
| Task                        | find consensus on chain state                | find consensus on data validity              |
| Available Slots             | 100                                          | pools x 50                                   |
| Minimum \$KYVE required      | more than lowest validator if slots are full | more than lowest validator if slots are full |
| Min CPU requirements        | 2vCPU                                        | 1vCPU                                        |
| Min RAM requirements        | 16 GB                                        | 2 GB                                         |
| Minimum DISK requirements   | 250 GB                                       | 8 GB                                         |
| Source of rewards           | transaction fees + inflation                 | data pool funds                           |
| Delegation possible         | yes                                          | yes                                          |
| Commission rewards possible | yes                                          | yes                                          |
| Reasons for slashing        | double signing, being offline                | invalid voting/uploading, being offline      |
| Programming language        | go                                           | typescript                                   |
| Source code                 | https://github.com/KYVENetwork/chain         | https://github.com/KYVENetwork/kyvejs        |
