---
sidebar_position: 3
---

# Bundle Proposals

Storing data is simple. Storing validated data coming from multiple parties is a bit more complicated. Because of
that, we will break down the process by which KYVE stores it's data.

## Saving data in rounds

Saving many data items or even a data stream is tricky. Thats why we group data into bundles to store them more
efficiently. This enables KYVE to validate multiple data items which are bundled up in a single validation round. With
this method, we can break down a data stream into various rounds, making it easier to work with. A selected validator
will collect data in each round, create a bundle, and submit it to the network. This marks the beginning of such a
proposal round.

In summary, in each proposal round one bundle gets proposed which consists of multiple data items and gets validated by letting other validators check the proposed bundle and vote accordingly. On-chain the votes are tallied and once the result is valid entry of the bundle gets stored on chain as valid. The data is still on the storage provider but the chain has the storage id, thus making it possible to view all the valid storage ids and therefore view the actual content on the storage provider.

## Lifecycle of a bundle proposal

The lifecycle of a bundle proposal can be seen in the following diagram:

<p align="center">
  <img width="70%" src="/img/round_lifecycle.png" />
</p>

## Summary

The diagram can summarize the following lifecycle in the chart below:

![data flow](/img/data_flow.png)
