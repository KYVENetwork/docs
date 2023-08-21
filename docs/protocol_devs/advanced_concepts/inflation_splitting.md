---
sidebar_position: 2
---

# Inflation Splitting

Consensus and Protocol Validators have two different sources of income, both earn their rewards from performing work in form of
creating and validating new blocks/bundles and providing security to the network. While on chain a block reward consists of the
transaction fees from the previous block and the block provision which was minted due to inflation a bundle reward on protocol
merely consists of the funds provided by pool funders.

While pool funders have a strong incentive funding a pool which validates and archives their data of their interest the burden is
quite big to finance the entire network especially in the starting phase. A short summary of this model can be taken from below:

<p align="center">
  <img width="50%" src="/img/without_inflation_split.png" />
</p>

It actually starts to become unfair looking at the chain where
the minted $KYVE from inflation is used to support the block reward. For this reason and to decrease the burden of the funders
inflation splitting was introduced, which basically splits the inflation between chain and protocol, redirecting parts of the newly
minted $KYVE to protocol and therefore supporting the bundle reward. A summary of this process can be taken from below:

<p align="center">
  <img width="50%" src="/img/with_inflation_split.png" />
</p>

While the funders get charged with the operating cost of the pool, the pool also takes a certain amount from its inflation fund
depending on the payout rate. With this total payout the bundle reward gets distributed to all stakeholders like the treasury, the uploader and its delegators. More information on that calculation can be found [here](/protocol_devs/advanced_concepts/uploader_reward_calculation.md)
