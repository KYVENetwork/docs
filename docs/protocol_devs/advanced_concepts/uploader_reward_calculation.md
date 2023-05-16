---
sidebar_position: 4
---

# Uploader Reward Calculation

## Introduction

To incentivize protocol validators to stay online and continue uploading and validating data nodes receive a reward in $KYVE for every valid bundle proposed. The reward depends on two main parameters, the `operating_cost` which is stored per pool and the `storage_cost` which is stored as a module param and used for every pool. The operating cost covers all fixed costs a node has including server operating costs, $KYVE transaction fees and other fixed costs. The storage cost covers all variable costs which mainly covers the cost of storing the bundle proposals on a web3 provider like Arweave.

## Bundle Reward

The entire reward for the bundle is called the bundle reward and is calculated by adding the operating cost to the product of the data size times the storage cost. But this is not the final amount the uploader actually receives at the end. That final uploader reward depends on the _network fee_ and the uploader's _commission_.

### Network Fee

The network fee collects a part of the bundle reward and transfers it to the community pool where the governance can decide how to use those funds. It is usually around 1-2% and can be found in the params of `x/bundles`.

### Commission

After the network fee is deducted the uploader can take his share of the remaining bundle reward. Because the uploader has to share his rewards with delegators and the uploader's stake also counts as a normal delegation the uploader would earn the same rewards as a normal delegator who just delegated the same amount. This is of course unfair, since the node operator is putting way more work and capital in form of server costs and maintenance.

For this reason the commission was introduced, giving the node operator the option of setting a percentage of how much of the remaining bundle reward he directly receives. If the commission is at 0% the node operator does not earn anything extra and has the same rewards as a normal delegator. If the commission is 100% the node operator receives the full remaining bundle reward, leaving nothing for the delegators. Here of course the commission has to be chosen carefully by the node operator, choosing a too low commission could result in a loss for the operator, choosing it too high would result in users not delegating to your node. After the commission is then finally deducted the remaining reward is called the _delegation reward_. More information on how the delegation reward gets distributed between all delegators can be found on the next page.

:::info
**NOTE**: This means that the node operator always has to sources of income, the commission rewards and the delegation rewards from his self delegation.
:::

## Reward Parameters

The current reward parameters can be found below. The operating cost is the parameter which is not globally set and defined in each pool itself where the bundle reward is applied.

import ParamString from '/src/components/params/ParamString';
import ParamPercentage from '/src/components/params/ParamPercentage';
import LastUpdated from '/src/components/LastUpdated';

|                | Mainnet                                                                    | Kaon                                                                       | Korellia                                                                       |
| -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Network Fee\*  | <ParamPercentage network="kyve" module="bundles" param="network_fee" />    | <ParamPercentage network="kaon" module="bundles" param="network_fee" />    | <ParamPercentage network="korellia" module="bundles" param="network_fee" />    |
| Storage Cost\* | <ParamString network="kyve" module="bundles" param="storage_cost" /> tkyve | <ParamString network="kaon" module="bundles" param="storage_cost" /> tkyve | <ParamString network="korellia" module="bundles" param="storage_cost" /> tkyve |
| Operating Cost | per Pool                                                                   | per Pool                                                                   | per Pool                                                                       |

\*Updated at **<LastUpdated />**

These parameters can only be updated via the governance.

## Calculation

With this information the rewards can be calculated as follows:

$$
\begin{aligned}
bundle\_reward = operating\_cost + (data\_size \cdot storage\_cost)
\end{aligned}
$$

$$
\begin{aligned}
commission\_reward = bundle\_reward \cdot (1 - network\_fee) \cdot commission
\end{aligned}
$$

where

- $bundle\_reward$ = `is the reward for a valid bundle in ukyve`
- $operating\_cost$ = `the fixed base reward per pool in ukyve`
- $data\_size$ = `the amount of bytes in bundle proposal`
- $storage\_cost$ = `the reward per byte in ukyve`
- $commission\_reward$ = `is the reward the uploader receives through commission`
- $network\_fee$ = `the percentage of how much goes to the community pool`
- $commission$ = `the commission percentage chosen by the node operator`
