---
sidebar_position: 4
---

# Delegating

Because there are two different types of nodes (chain node & protocol node) there are also two types of delegation. Both actions help to secure the KYVE network and earn rewards, but both come with their respected risks.

## Chain delegation

Chain delegation helps to secure the KYVE blockchain, which further secures the protocol layer that sits on top of it. When you delegate into a chain node you're $KYVE is bonded and used in the Proof of Stake protocol to produce and validate new blocks. By delegating into a chain node you are trusting that node to act honestly. If that node is found to act mailicously and is getting slashes a part of your delegation is also slashed.

### How to delegate?

The easiest way to delegate into chain nodes is by using a block explorer which supports delegation. Such a block explorer is the _Ping_ explorer. The explorer can be found below for every network:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="network">
  <TabItem value="korellia" label="Korellia">
    <strong>Ping.Pub</strong>: <a href="https://explorer.kyve.network/korellia/staking">https://explorer.kyve.network/korellia/staking</a>
  </TabItem>
  <TabItem value="kaon" label="Kaon">
    <strong>Ping.Pub</strong>: <a href="https://explorer.kaon.kyve.network/kaon/staking">https://explorer.kaon.kyve.network/kaon/staking</a>
  </TabItem>
  <TabItem value="kyve" label="KYVE">
    Coming Soon
  </TabItem>
</Tabs>

You can simply connect your wallet on the top right of the page and make sure you have some $KYVE that you want to delegate. On the 'Staking' page you can see a list of all chain nodes which are actively running in the network. After choosing a node based based on certain factors like APY, commission or uptime you can delegate by clicking on the node itself or on the right button 'Delegate'.

The following example shows the delegation with the Ping explorer on the Kaon network.

<p align="center">
  <img src="/img/chain_delegation.png" />
</p>

### Rewards

In return for lending out $KYVE and putting them at risk in order to secure the network delegators receive rewards in form of $KYVE. The most important parameter to estimate the rewards is the APY (Annual percentage yield) or also sometimes called APR (Annual percentage rate). This is an estimation of how much interest you can accrue in one year.

:::caution
**IMPORTANT**: The APY is **never** a garuantee. It is simply an estimation for the next year based on current parameters.
:::

Another parameter which influences the rewards of a delegator is the node commission. The node commission defines how much of the block reward directly goes to the node and how much goes to the rest - the delegators. A high commission means less rewards for delegators, a low one the opposite.

The source of those rewards are a combination of inflation and transaction fees. Inflation helps stablizing the network by providing consistent rewards to chain nodes and chain delegators. Those rewards are minted every block and collected in a fee pool where every transaction fee gets collected, too. After the rewards for each block are collected there are distributed in the Cosmos SDK [x/distribution](https://docs.cosmos.network/main/modules/distribution) module.

Those rewards then can be claimed in the block explorer. Once they are claimed they are liquid.

### Risks

## Protocol delegation

### How to delegate?

### Rewards

### Risks
