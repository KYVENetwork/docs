---
title: Pools
order: 4
parent:
  title: Basics
  order: 2
---

# Pools

Generally, storage pools (or just pools) can be described as discrete entities arranged around specific data sources.
Anyone can create them through governance and can store any data stream.

Protocol nodes have to run with the specified pool runtime for a pool to function. If specific criteria are met,
pools distribute $KYVE to designated node runners.

A pool always requires two instructions:

- How to retrieve data from a data source
- How to validate this data

These instructions are defined in the pools _runtime_. Because data can look very different and every data stream
has its unique features, other runtimes exist for different data streams. For example, to archive
the Ethereum blockchain, the runtime will be `@kyve/evm`. Besides Ethereum, this runtime can also archive other EVM chains
like Moonbeam or Aurora. For example, suppose you want to archive Solana. In that case, you need to run a different runtime specially designed for Solana data, `@kyve/solana`.
