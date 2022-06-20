---
title: Pool economics
order: 1
parent:
  title: Advanced
  order: 4
---

# Pool economics

Keeping pools funded and therefore keeping the data flowing while at the same time keeping validators' stakes secured and incentivized is a challenge. KYVE designed pools in a way that they fulfill all those needs.

## Basic $KYVE flow

![pool economics](/pool_economics.png)

## Keeping pools funded

For pools to incentivize validators and payout, their rewards pool needs funds. These funds are provided by `Funders`; they are interested in archiving the data the specific pool handles. This could be the project or the foundation behind a data source that wants its data to be permanently archived onto Arweave. Besides people interested in making the data permanent, anyone can become a funder. The only downside is that there are currently no rewards for becoming a funder. The opposite is the case; being a funder will cost you $KYVE.

Because of limited funding slots, only those who fund the highest amount can claim a funding slot. Currently, there are 100 funding slots available per pool. If there are still funding slots available, you only need to fund more than 0 $KYVE to claim a slot. You have to fund more than the current lowest funder if all slots are occupied, basically outbidding him.
Once you outbid the current lowest funder, you claim his funding slot. The remaining funds of the outbid funder will be automatically transferred back to him. This mechanism ensures that only people with the highest interest in archiving the data can operate as a funder.

## Keeping validators incentivized

Validators have many tasks. They have to collect data, bundle them, upload, and submit them. To reward validators for their work and keep them incentivized, they receive bundle rewards when they successfully propose a valid bundle (more on that can be found [here](/advanced/data_stored.md)). As described above, those rewards are funded by funders. But before the uploader receives his reward, a network fee (usually 1%) is deducted and automatically transferred to the treasury.

## Keeping delegators incentivized

Delegators have the task of lending validators capital in the form of $KYVE and helping them to earn more rewards (more on how that works [here](/advanced/data_stored.md)). The rewards delegators receive and have to share is determined by the validator's commission. If it is high (e.g., 99%), the delegators only receive a tiny fraction of the staker's rewards. On the other hand, if it is low, the delegators receive more. By that, delegators are rewarded for giving validators capital that they trust so everyone has a benefit.
