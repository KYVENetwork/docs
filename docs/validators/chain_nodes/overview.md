---
sidebar_position: 1
---

# Overview

## Introduction

The KYVE blockchain is built on [Tendermint Core](https://github.com/tendermint/tendermint), which relies on validators to commit new blocks to the blockchain using a consensus protocol. These validators participate by broadcasting votes with cryptographic signatures signed by their private keys. Validator candidates can stake their own tokens and have tokens delegated to them by token holders. KYVE's native token is **$KYVE**, and at genesis, KYVE will launch with 100 validator slots. The top 100 validator candidates with the most stake will become KYVE validators.

Validators and their delegators earn KYVE as block provisions and transaction fees through the Tendermint consensus protocol. Initially, there will be no fee burning but in the future it is up to the governance to decide if this feature gets enable, thus making $KYVE a deflationary currency. Futhermore, validators can set commission on the fees their delegators receive to provide further incentive.

If validators are frequently offline, double sign, or fail to participate in governance, their staked KYVE (as well as the KYVE of their delegators) may be slashed, with the severity of the penalty depending on the severity of the violation.

## Responsibilities

Since it is highly important to keep a high uptime to prevent slashing due to being offline and even to prevent network downtime we advise
validators to set up a physical operation secured with restricted access. A good starting place, for example, would be co-locating in secure data centers.

To become a validator, it's essential to prepare your data center with reliable power, connectivity, and storage backups. This involves having multiple redundant networking boxes for fiber, firewall, and switching, as well as small servers with redundant hard drives and failover capability. It's acceptable to start with low-end data center hardware initially.

In the early stages, network requirements are expected to be minimal. However, as the network expands, bandwidth, CPU, and memory requirements will increase. Therefore, it's recommended to have large hard drives for storing several years of blockchain history.

## First Steps

To gain the trust of users who stake their KYVE, it's crucial to create a dedicated validator's website and social profile, such as a Twitter account. Additionally, you should signal your intent to become a validator on Discord. Having an online presence provides users with important information about your entity, which can be reassuring and encourage them to stake to you.

You can use our [Discord](https://discord.com/invite/PATvZvEmxF) platform to engage in detailed discussions about the intricacies of being a validator and to seek advice from the wider validator community.
