---
title: Pool economics
order: 1
parent:
  title: Advanced
  order: 3
---

# Pool economics

Keeping pools funded and therefore keeping the data flowing while at the same time keeping validators stakes secured and incentivised is a challenge. KYVE designed pools in a way that they fullfill all those needs.

## Basic $KYVE flow

![pool economics](/pool_economics.png)

## Keeping pools funded

In order for pools to incentivise validators and payout their rewards pool need funds. These funds are provided by `Funders`, they have a special interest in archiving the data the specific pool handles. This could the project or the foundation behind a data source who want their data to be permanently archived onto Arweave. Beside people who have an interest in making the data permanent anyone can become a funder, the only downside is that there are currently no rewards of becoming a funder. The opposite is the case, being a funders will cost you $KYVE.

Because of limited funding slots only those who fund the highest amount can claim a funding slot. Currently, there are 100 funding slots available per pool. If there are still funding slots available you only need to fund more than 0 $KYVE to claim a slot, if all slots are occupied you have to fund more than the current lowest funder, basically outbidding him.
Once you outbid the current lowest funder you claim his funding slot. The remaining funds of the outbidded funder will be automatically transferred back to him. This mechanism ensures that only people with the highest interest in archiving the data can operate as a funder.

## Keeping validators incentivised

Validators have many tasks, they have to collect data, bundle them, upload and submit them. To reward validators for their work and keep them incentivised they receive bundle rewards when they successfully propose a valid bundle (more on that can be found [here](/advanced/data_stored.md)). Like described above, those rewards are funded by funders. But before the uploader receives his reward a network fee (usually 1%) is deducted and automatically transferred to treasury.

## Keeping delegators incentivised

Delegators have the task of lending validators capital in form of $KYVE and help them to earn more rewards (more on how that works [here](/advanced/data_stored.md)). The rewards delegators receive and have to share is determined by the validators commission. If it is high (e.g. 99%) the delegators only receive a tiny fraction of the stakers rewards, if it is low on the other hand the delegators receive more. By that delegators are rewarded for giving validators capital that they trust so everyone has a benefit.
