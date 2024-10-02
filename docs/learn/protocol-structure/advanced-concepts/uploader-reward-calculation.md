---
sidebar_position: 5
---

# Uploader Reward Calculation

## Introduction

To incentivize protocol validators to stay online and continue uploading and validating data nodes receive a reward in \$KYVE for every valid bundle proposed. This reward depends on the size of the data uploaded, the specified operating cost of the pool and the share of the inflation the pool receives. Once the total bundle reward is charged from the funders and the inflation share ([Inflation Splitting](/docs/learn/protocol-structure/advanced-concepts/inflation-splitting.md)) the reward gets distributed to all stakeholders which are the treasury, the uploader and its delegators.

## Bundle Reward

First the funders are charged with the operating cost. This should cover as the name already suggests the base operating costs of the validator nodes. In addition, the inflation share is added which further rewards the uploader and its delegators.

### Network Fee

The network fee collects a part of the bundle reward and transfers it to the community pool where the governance can decide how to use those funds. It is usually around 1-2% and can be found in the params of `x/bundles`. This gets deducted first from the total bundle reward.

### Storage Cost

The storage cost is a param in `x/bundles` and determines how much \$KYVE the uploader should receive for uploading a specific size
of data. This gets deducted after the network fee and credited directly to the uploader and **not** its delegators.

### Commission

Because the uploader has to share his rewards with delegators and the uploader's stake also counts as a normal delegation the uploader would earn the same rewards as a normal delegator who just delegated the same amount. This is of course unfair, since the node operator is putting way more work and capital in form of server costs and maintenance.

For this reason the commission was introduced, giving the node operator the option of setting a percentage of how much of the remaining bundle reward he directly receives. If the commission is at 0% the node operator does not earn anything extra and has the same rewards as a normal delegator. If the commission is 100% the node operator receives the full remaining bundle reward, leaving nothing for the delegators. Here of course the commission has to be chosen carefully by the node operator, choosing a too low commission could result in a loss for the operator, choosing it too high would result in users not delegating to your node. After the commission is then finally deducted the remaining reward is called the _delegation reward_. More information on how the delegation reward gets distributed between all delegators can be found on the next page.

:::info
**NOTE**: This means that the node operator always has two sources of income, the commission rewards and the delegation rewards from his self delegation.
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

The reward is calculated per bundle and per pool. A reward consists of multiple
coins. Funders can fund in any supported IBC-coin. 
The total bundle reward is calculated as

$$
\begin{aligned}
R_{\text{total}}= funders\_payout + (pool\_account\_balance \cdot inflation\_payout\_rate)
\end{aligned}
$$

where 
- $R_{\text{total}} \in \{ {x \in \mathcal{R}}^n \; | \; x_i > 0  \; \forall i \in \{1,..., N_{\text{coins}}\} \}$ consisting of $N_{\text{coins}}$ different coins. 
- $funders\_payout$ is the sum of all coins the funders paid for the given bundle in the given pool.
- $pool\_account\_balance$ is the current account balance of the pool from inflation splitting.
- $inflation\_payout\_rate$ is the rate at which the pool account should be charged (global parameter).

From the total bundle reward the network fee gets first deducted and transferred.
The value is given by

$$
\begin{aligned}
R_{\text{treasury}} = R_{\text{total}} \cdot network\_fee
\end{aligned}
$$
where $network\_fee$ is the percentage of the rewards that is paid to the community pool as a fee.

After the network fee is deducted, the storage cost for uploading the bundle to the storage provider
is calculated on a USD basis:

$$
\begin{aligned}
C_{storage} = data\_size \cdot storage\_cost
\end{aligned}
$$
where
- $date\_size$ is the size of the data uploaded to the storage-provider in bytes.
- $storage\_cost$ is the cost (in USD) per byte for uploading data to a given storage-provider (global parameter).

Now $C_{storage}$ is split across all available coins in the reward equally. 

$$
\begin{aligned}
S_{i} = \frac{C_{storage}}{N_{\text{coins}} \cdot p_i}
\end{aligned}
$$
where
- $p_i$ is the price of the $i$-th coin in USD (global parameter, which is kept up-to-date by the governance).

Now the storage cost is deducted from the total reward for each coin. If the storage
cost for a given coin is larger than the available amount, the entire amount is deducted.
The storage reward for the $i$-th coin is given by

$$
\begin{aligned}
R_{\text{storage},i} = \min(R_{\text{total},i}, S_i) \; .
\end{aligned}
$$

The treasury cost and the storage cost are deducted from the total reward which leads to
the remaining bundle reward which is split between the validator (uploader) and its delegators based on the validator's commission:

$$
\begin{aligned}
R_{\text{commission}} = (R_{\text{total}} - R_{\text{treasury}} - R_{\text{storage}}) \cdot c
\end{aligned}
$$

$$
\begin{aligned}
R_{\text{delegation}} = (R_{\text{total}} - R_{\text{treasury}} - R_{\text{storage}}) \cdot (1-c)
\end{aligned}
$$

where

- $c$ is the commission set by the validator.

The total reward can be summarized as:

$$
\begin{aligned}
R_{\text{total}} = \underbrace{R_{\text{treasury}}}_\text{Community Pool} + \underbrace{R_{\text{storage}} + R_{\text{commission}}}_\text{Validator} + \underbrace{R_{\text{delegation}}}_\text{Delegators}
\end{aligned}
$$
