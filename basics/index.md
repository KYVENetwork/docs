---
title: The KYVE Network
order: 1
parent:
  title: Basics
  order: 2
---

# The KYVE Network

KYVE is a network of storage pools built to store data streams or create snapshots of already existing data.
It is secured by its own blockchain build on [cosmos](https://cosmos.network/)

# Architecture

KYVE consists of two layers which need to clarified:

![architecture](/architecture.png)

## Chain Layer

The chain layer is the backbone of KYVE. The chain layer is a completely sovereign [Proof of Stake](https://en.wikipedia.org/wiki/Proof_of_stake) blockchain build with [Starport](https://starport.com/). This blockchain is run by independent nodes we call _chain nodes_ since they're running on the chain level. The native currency of the KYVE chain is $[KYVE](basics/kyve.md), it secures the chain and allows
chain nodes to stake and other users to delegate into them.

## Protocol Layer

The protocol layer sits on top of the chain layer and enables the actual use case of KYVE. Every feature and unit of logic which makes KYVE unique is implemented directly into the chain nodes. This includes [pools](basics/pools.md), [funding](basics/funding.md), [staking](basics/staking.md) and [delegating](basics/delegating.md).

## Summary

|                     | Chain node                        | Protocol node                        |
| ------------------- | --------------------------------- | ------------------------------------ |
| Currency            | $KYVE                             | $KYVE                                |
| Node maximum        | 100 Validators                    | 100 Validators per pool              |
| Secured by          | Proof of Stake                    | Proof of stake                       |
| CPU requirements    | 3vCPU                             | None                                 |
| Memory requirements | 4GB RAM                           | 2GB RAM                              |
| Disk requirements   | 80GB                              | 1GB                                  |
| Rewards in          | $KYVE                             | $KYVE                                |
| Function            | Secure blockchain                 | Upload and validate data             |
| Tutorials           | [How to run](intro/chain-node.md) | [How to run](intro/protocol-node.md) |
