---
sidebar_position: 1
---

# Architecture

KYVE is a network of storage pools built to store data streams or create snapshots of already existing data.
It is secured by its blockchain built on [cosmos](https://cosmos.network/)

KYVE consists of two layers that need to clarify:

![architecture](/img/architecture.png)

## Pools

Generally, storage pools (or just pools) can be described as discrete entities arranged around specific data sources.
Anyone can create them through governance and can store any data stream.

Protocol nodes have to run with the specified pool runtime for a pool to function. If specific criteria are met,
pools distribute $KYVE to designated node runners.

A pool always requires two instructions:

- How to retrieve data from a data source
- How to validate this data

These instructions are defined in the pools _runtime_. Because data can look very different and every data stream
has its unique features, other runtimes exist for different data streams. For example, to archive
the Ethereum blockchain, the runtime will be `@kyve/evm`. Besides Ethereum, this runtime can also archive other EVM
chains
like Moonbeam or Aurora. For example, suppose you want to archive Solana. In that case, you need to run a different
runtime specially designed for Solana data, `@kyve/solana`.

## Chain Layer

The chain layer is the backbone of KYVE. The chain layer is an entirely
sovereign [Proof of Stake](https://en.wikipedia.org/wiki/Proof_of_stake) blockchain built
with [Starport](https://starport.com/). This blockchain is run by independent nodes we call _chain nodes_ since they're
running on the chain level. The native currency of the KYVE chain is $KYVE. It secures the chain and
allows
chain nodes to stake and other users to delegate to them.

## Protocol Layer

The protocol layer sits on top of the chain layer and enables the actual use case of KYVE. Every feature and unit of
logic which makes KYVE unique is implemented directly into the chain nodes. This
includes pools, [funding](/token_holders/funding.md), [stakingng
and delegating](/token_holders/staking_delegation.md).
