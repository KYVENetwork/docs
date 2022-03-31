---
title: Storage pools
order: 3
parent:
  title: Basics
  order: 2
---

# Storage pools

Generally, storage pools (or just pools) can be described as discrete entities arranged around specific data sources.
They can be created by anyone through the governance and can store any data stream.

In order for a pool to function, protocol nodes have to run with the specified pool runtime. If certain criteria are met,
pools distribute $KYVE to designated node runners.

A pool always requires two instructions:

- How to retrieve data from a data-source
- How to validate this data

These instructions are defined in the pools _runtime_. Because data can look very different and every data stream
has its own special features, there are different runtimes for different data streams. For example, in order to archive
the Ethereum blockchain, the runtime will be `@kyve/evm`. Beside Ethereum this runtime can also archive other EVM chains
like Moonbeam or Aurora. If you want for example to archive Solana you need to run a different runtime specially designed for solana data which would be `@kyve/solana`.
