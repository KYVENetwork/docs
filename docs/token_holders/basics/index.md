---
title: Overview
order: 1
parent:
  title: Kyve Network
  order: 3
---

# The KYVE Network

KYVE is a network of storage pools built to store data streams or create snapshots of already existing data.
It is secured by its blockchain built on [cosmos](https://cosmos.network/)

# Architecture

KYVE consists of two layers that need to clarify:

![architecture](/img/architecture.png)

## Chain Layer

The chain layer is the backbone of KYVE. The chain layer is an entirely sovereign [Proof of Stake](https://en.wikipedia.org/wiki/Proof_of_stake) blockchain built with [Starport](https://starport.com/). This blockchain is run by independent nodes we call _chain nodes_ since they're running on the chain level. The native currency of the KYVE chain is $[KYVE](/basics/kyve.md). It secures the chain and allows
chain nodes to stake and other users to delegate to them.

## Protocol Layer

The protocol layer sits on top of the chain layer and enables the actual use case of KYVE. Every feature and unit of logic which makes KYVE unique is implemented directly into the chain nodes. This includes [pools](/basics/pools.md), [funding](/basics/funding.md), [staking](/basics/staking.md) and [delegating](/basics/delegating.md).
