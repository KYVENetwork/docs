---
sidebar_position: 5
---

# Uploader Reward Calculation

## Introduction

To incentivize protocol validators to stay online and continue uploading and validating data nodes receive a reward in $KYVE for every valid bundle proposed. This reward depends on the size of the data uploaded, the specified operating cost of the pool and the share of the inflation the pool receives. Once the total bundle reward is charged from the funders and the inflation share ([Inflation Splitting](/protocol_devs/advanced_concepts/inflation_splitting.md)) the reward gets distributed to all stakeholders which are the treasury, the uploader and it's delegators.

## Bundle Reward

First the funders are charged with the operating cost. This should cover as the name already suggests the base operating costs of the validator nodes. In addition, the inflation share is added which further rewards the uploader and it's delegators.

### Network Fee

The network fee collects a part of the bundle reward and transfers it to the community pool where the governance can decide how to use those funds. It is usually around 1-2% and can be found in the params of `x/bundles`. This gets deducted first from the total bundle reward.

### Storage Cost

The storage cost is a param in `x/bundles` and determines how much $KYVE the uploader should receive for uploading a specific size
of data. This gets deducted after the network fee and credited directly to the uploader and **not** it's delegators.

### Commission

Because the uploader has to share his rewards with delegators and the uploader's stake also counts as a normal delegation the uploader would earn the same rewards as a normal delegator who just delegated the same amount. This is of course unfair, since the node operator is putting way more work and capital in form of server costs and maintenance.

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

The total bundle reward is calculated as follows:

$$
\begin{aligned}
total\_bundle\_reward = operating\_cost + (pool\_account\_balance \cdot inflation\_payout\_rate)
\end{aligned}
$$

From the total bundle reward the network fee gets first deducted and tranferred.

$$
\begin{aligned}
treasury\_reward = total\_bundle\_reward \cdot network\_fee
\end{aligned}
$$

After the network fee got deducted we further deduct the storage reward and credit it to the uploader
directly to cover his storage costs:

$$
\begin{aligned}
storage\_reward = data\_size \cdot storage\_cost
\end{aligned}
$$

This yields our remaining bundle reward which is split between uploader and it's delegators:

$$
\begin{aligned}
bundle\_reward = total\_bundle\_reward - treasury\_reward - storage\_reward
\end{aligned}
$$

The commission reward for the uploader can then be calculated with:

$$
\begin{aligned}
commission\_reward = bundle\_reward \cdot commission
\end{aligned}
$$

The remains are distributed to the delegators:

$$
\begin{aligned}
delegation\_reward = bundle\_reward - commission\_reward
\end{aligned}
$$

where

- $total\_bundle\_reward$ = `is the total bundle reward paid out from the pool`
- $operating\_cost$ = `the fixed base reward per pool in ukyve`
- $pool\_account\_balance$ = `the current account balance of the pool from inflation splitting`
- $inflation\_payout\_rate$ = `the rate in % at which the pool account should be charged`
- $network\_fee$ = `the percentage of how much goes to the community pool as a fee`
- $data\_size$ = `the amount of bytes in bundle proposal`
- $storage\_cost$ = `the reward per byte in ukyve`
- $bundle\_reward$ = `the remaining bundle reward for uploader and it's delegators`
- $commission$ = `the commission percentage chosen by the node operator`
- $commission\_reward$ = `is the reward the uploader receives through commission`
- $delegation\_reward$ = `the rewards delegators receive for securing the network`
