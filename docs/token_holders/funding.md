---
sidebar_position: 5
---

# Funding

## What is funding, and why is it important?

A storage pool requires funding in $KYVE and can be provided by anyone. The funding gets paid out to the protocol nodes active in the pool. If a pool runs out of funds, it stops. This is a crucial part of KYVEs token economics. The goal at KYVE is to build a decentralized data lake that gets utilized by as many users/projects as possible. When users create a business case on top of KYVE data, they are highly incentivized to ensure that the pool keeps producing the data. Whenever a pool is close to running out of tokens, it will purchase some more tokens and top up the pool's funding. The more users/projects do this, the more they share the costs, making it easier and reducing the risk of a pool running out of funding.

## Who would fund a pool?

Projects/Users who are building business cases with the pools data. They want to have continued access to the data.

## How can I fund a pool?

:::caution
**IMPORTANT**: Funding will not earn you rewards. The opposite is the case. Funders pay for the delegation rewards in a pool and are therefore necessary for a pool to function. You should only fund if you have an interest in the data being archived and only if you know what you are doing
:::

The easiest way to fund a pool is through the KYVE web app. The web app for every network can be found below:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="network">
  <TabItem value="mainnet" label="Mainnet">
    <strong>Web App</strong>: <a href="https://app.kyve.network/#/pools">https://app.kyve.network/#/pools</a>
  </TabItem>
  <TabItem value="kaon" label="Kaon">
    <strong>Web App</strong>: <a href="https://app.kaon.kyve.network/#/pools">https://app.kaon.kyve.network/#/pools</a>
  </TabItem>
  <TabItem value="korellia" label="Korellia">
    <strong>Web App</strong>: <a href="https://app.korellia.kyve.network/#/pools">https://app.korellia.kyve.network/#/pools</a>
  </TabItem>
</Tabs>

First you have to connect your wallet to the app, after that you have to enable _expert mode_. You can find that toggle on the drawer on the left side right at the bottom. By enabling expert mode you are now able to fund a pool. This prevents unexperienced users from funding a pool without knowing that this will cost $KYVE.

<p align="center">
  <img src="/img/expert_mode.png" />
</p>

After that you can select and click on the pool you want to fund and click on the tab 'Funders'. When your wallet is connected you should see a list of users who are currently funding this pool and how much of their funds is left. When you click on 'Becoming a funder' a dialog opens where everything is explained again. There you can finally fund the pool. To verify if this was successful you can simply take a look at the list and see if you're in there.

<p align="center">
  <img src="/img/becoming_funder.png" />
</p>

Because funding slots are limited to 50 per pool only the highest funders can join. If the slots are full you have to fund more than the lowest funder. That lowest funder is then removed and his remaining funds are automatically transferred back to his account.
