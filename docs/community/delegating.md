---
sidebar_position: 4
---

# Delegating

Since there are two different types of nodes (consensus validator & protocol validator), there are also two types of delegation. Both actions help to secure the KYVE network and earn rewards, but both come with their respected risks.

:::caution
**ATTENTION**: Delegating might lead to the loss of your \$KYVE. Please read this guide until the end in order to understand how to prevent this.
:::

## Chain Delegation

Chain delegation helps to secure the KYVE blockchain, which further secures the protocol layer that sits on top of it. When you delegate to a consensus validator, you're \$KYVE is bonded and used in the Delegated Proof of Stake protocol to produce and validate new blocks. By delegating to a consensus validator, you are trusting that node to act honestly. If that node is found to act maliciously and is getting slashed, a part of your delegation is also slashed.

### How to delegate?

The easiest way to delegate to consensus validators is by using a block explorer which supports delegation. Such a block explorer is the _Ping_ explorer. The explorer can be found below for every network:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="network">
  <TabItem value="kyve" label="Mainnet">
    <strong>Explorer</strong>: <a href="https://explorer.kyve.network/kyve/staking">https://explorer.kyve.network/kyve/staking</a>
  </TabItem>
  <TabItem value="kaon" label="Kaon">
    <strong>Explorer</strong>: <a href="https://explorer.kyve.network/kaon/staking">https://explorer.kyve.network/kaon/staking</a>
  </TabItem>
  <TabItem value="korellia" label="Korellia">
    <strong>Explorer</strong>: <a href="https://explorer.kyve.network/korellia/staking">https://explorer.kyve.network/korellia/staking</a>
  </TabItem>
</Tabs>

You can simply connect your wallet on the top right of the page and make sure you have some \$KYVE that you want to delegate. On the 'Staking' page, you can see a list of all consensus validators which are actively running in the network. After choosing a node based on certain factors like APY, commission or uptime you can delegate by clicking on the node itself or on the right button 'Delegate'.

The following example shows the delegation with the Ping explorer on the Kaon network.

<p align="center">
  <img src="/img/chain_delegation.png" />
</p>

### Rewards

In return for lending out \$KYVE and putting them at risk in order to secure, the network delegators receive rewards in form of \$KYVE. The most important parameter to estimate the rewards is the APY (Annual percentage yield), or also sometimes called APR (Annual percentage rate). This is an estimation of how much interest you can accrue in one year.

:::caution
**IMPORTANT**: The chain delegation APY is **never** a guarantee. It is simply an estimation for the next year based on current parameters.
:::

Another parameter which influences the rewards of a delegator is the node commission. The node commission defines how much of the block reward directly goes to the node and how much goes to the rest - the delegators. A high commission means less rewards for delegators, a low one the opposite.

The source of those rewards are a combination of inflation and transaction fees. Inflation helps stabilizing the network by providing consistent rewards to consensus validators and chain delegators. Those rewards are minted every block and collected in a fee pool where every transaction fee gets collected, too. After the rewards for each block are collected there are distributed in the Cosmos SDK [x/distribution](https://docs.cosmos.network/main/modules/distribution) module.

Those rewards then can be claimed in the block explorer. Once they are claimed they are liquid and free to use.

### Risks

As already briefly mentioned before, chain delegation comes with risk. Delegating into a consensus validator also implies that you as a delegator are responsible for the actions of that node. If the node behaves accordingly it and you as a delegator receive rewards. If the network finds the node was acting maliciously (for example double signing) or being offline the node and you receive a slash.

The severity of a slash depends on the action of the node and on the network parameters. These can be found below:

import ParamPercentage from '/src/components/params/ParamPercentage';
import LastUpdated from '/src/components/LastUpdated';

|               | Mainnet                                                                                                  | Kaon                                                                                                     | Korellia                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Double Sign\* | <ParamPercentage network="kyve" module="slashing" project="cosmos" param="slash_fraction_double_sign" /> | <ParamPercentage network="kaon" module="slashing" project="cosmos" param="slash_fraction_double_sign" /> | <ParamPercentage network="korellia" module="slashing" project="cosmos" param="slash_fraction_double_sign" /> |
| Downtime\*    | <ParamPercentage network="kyve" module="slashing" project="cosmos" param="slash_fraction_downtime" />    | <ParamPercentage network="kaon" module="slashing" project="cosmos" param="slash_fraction_downtime" />    | <ParamPercentage network="korellia" module="slashing" project="cosmos" param="slash_fraction_downtime" />    |

\*Updated at **<LastUpdated />**

The chain slashing parameters can only be updated via the governance. The slashed \$KYVE will get transferred to the community pool.

### Undelegation

To prevent undelegation, and therefore mitigate slashings before the evidence of a malicious node can be found, there is an unbonding time.
When a delegator starts undelegating, the \$KYVE are unbonding for the specified unbonding time. After the unbonding time is reached the \$KYVE is automatically transferred to the delegator. Max entries
defines how much undelegations and redelegations you can have in parallel.

import ParamString from '/src/components/params/ParamString';

|                  | Mainnet                                                                                 | Kaon                                                                                    | Korellia                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Unbonding Time\* | <ParamString network="kyve" project="cosmos" module="staking" param="unbonding_time" /> | <ParamString network="kaon" project="cosmos" module="staking" param="unbonding_time" /> | <ParamString network="korellia" project="cosmos" module="staking" param="unbonding_time" /> |
| Max Entries\*    | <ParamString network="kyve" project="cosmos" module="staking" param="max_entries" />    | <ParamString network="kaon" project="cosmos" module="staking" param="max_entries" />    | <ParamString network="korellia" project="cosmos" module="staking" param="max_entries" />    |

\*Updated at **<LastUpdated />**

:::caution
**ATTENTION**: During the unbonding time the delegation still can be slashed and **no** rewards are earned
:::

You can undelegate by going to the explorer and to your delegations. There should be a button called 'Undelegate'.

### Redelegation

On the chain level, redelegation is possible immediately. If you perform a redelegation you start earning rewards from the new target consensus validator and not from the old source consensus validator. The catch is that you still can get slashed during the unbonding
time in the old and the new target consensus validator at the same time. After the unbonding time is done you can only get slashed if the new target consensus validator receives a slash. Here, the same parameters like in the undelegation are used for redelegation.

|                  | Mainnet                                                                                 | Kaon                                                                                    | Korellia                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Unbonding Time\* | <ParamString network="kyve" project="cosmos" module="staking" param="unbonding_time" /> | <ParamString network="kaon" project="cosmos" module="staking" param="unbonding_time" /> | <ParamString network="korellia" project="cosmos" module="staking" param="unbonding_time" /> |
| Max Entries\*    | <ParamString network="kyve" project="cosmos" module="staking" param="max_entries" />    | <ParamString network="kaon" project="cosmos" module="staking" param="max_entries" />    | <ParamString network="korellia" project="cosmos" module="staking" param="max_entries" />    |

\*Updated at **<LastUpdated />**

You can redelegate by going to the explorer and to your delegations. There should be a button called 'Redelegate'.

## Protocol Delegation

Similarly to chain delegation, which helps to secure the KYVE blockchain, protocol delegation helps to secure the actual validity of the data KYVE is archiving. For that you have to delegate into protocol validators.
When protocol validators receive delegations their voting power and their probability of getting chosen as the next uploader increases. This means that protocol validators have more control over which data gets validated and
also earn more rewards. More information on that can be found [here](/learn/protocol_devs/advanced_concepts/uploader_selection). By delegating into protocol validators you again are trusting that node to act honestly. If that node is found to act maliciously and is getting slashed a part of your delegation is also slashed.

### How to delegate?

The easiest way to delegate into protocol validators is by using the KYVE web app. The web app for every network can be found below:

<Tabs groupId="network">
<TabItem value="kyve" label="Mainnet">
    <strong>Web App</strong>: <a href="https://app.kyve.network/#/validators?status=1">https://app.kyve.network/#/validators?status=1</a>
  </TabItem>
  <TabItem value="kaon" label="Kaon">
    <strong>Web App</strong>: <a href="https://app.kaon.kyve.network/#/validators?status=1">https://app.kaon.kyve.network/#/validators?status=1</a>
  </TabItem>
  <TabItem value="korellia" label="Korellia">
    <strong>Web App</strong>: <a href="https://app.korellia.kyve.network/#/validators?status=1">https://app.korellia.kyve.network/#/validators?status=1</a>
  </TabItem>
</Tabs>

You can simply connect your wallet on the top right of the page and make sure you have some \$KYVE that you want to delegate. On the 'Validators' page you can see a list of all protocol validators which are actively running in the network. After choosing a node based on certain factors like APY, commission or slashing history you can delegate by clicking on the node itself or on the right button 'Delegate'.

The following example shows the delegation with the KYVE web app on the Korellia network.

<p align="center">
  <img src="/img/protocol_delegation.png" />
</p>

### Rewards

Again similar to chain delegation the delegator receives in return for lending out \$KYVE and putting them at risk in order to secure the network and the process of data validation rewards in form of \$KYVE. The most important parameter again is the APY (or APR).

:::caution
**IMPORTANT**: The protocol delegation APY is **never** a guarantee. It is simply an estimation for the next year based on current parameters.
:::

Another parameter which influences the rewards of a delegator is the node commission. The node commission defines how much of the bundle reward directly goes to the node and how much goes to the rest - the delegators. A high commission means less rewards for delegators, a low one the opposite. More information on that can be found [here](/learn/protocol_devs/advanced_concepts/uploader_reward_calculation).

The source of those rewards are data pool funds provided by pool funders. Pool funders have an interest in validating the archiving a specific data source the data pool handles. Once a node receives
a bundle reward (the data he archived got validated) the rewards are distributed between all delegators. More information on the distribution details can be found [here](/learn/protocol_devs/advanced_concepts/delegation_reward_calculation).

Those rewards then can be claimed in the web app under 'User'. Once they are claimed they are liquid and free to use.

### Risks

As already briefly mentioned before, protocol delegation comes with risk. Delegating into a protocol validator also implies that you as a delegator are responsible for the actions of that node. If the node behaves accordingly it and you as a delegator receive rewards. If the network finds the node was acting maliciously (for example uploading incorrect data) or being offline the node and you receive a slash.

The severity of a slash depends on the action of the node and on the network parameters. More details of how and when those slashes are applied can be found [here](/learn/protocol_devs/general_concepts/slashing). These can be found below:

|                 | Mainnet                                                                      | Kaon                                                                         | Korellia                                                                         |
| --------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Upload Slash\*  | <ParamPercentage network="kyve" module="delegation" param="upload_slash" />  | <ParamPercentage network="kaon" module="delegation" param="upload_slash" />  | <ParamPercentage network="korellia" module="delegation" param="upload_slash" />  |
| Vote Slash\*    | <ParamPercentage network="kyve" module="delegation" param="vote_slash" />    | <ParamPercentage network="kaon" module="delegation" param="vote_slash" />    | <ParamPercentage network="korellia" module="delegation" param="vote_slash" />    |
| Timeout Slash\* | <ParamPercentage network="kyve" module="delegation" param="timeout_slash" /> | <ParamPercentage network="kaon" module="delegation" param="timeout_slash" /> | <ParamPercentage network="korellia" module="delegation" param="timeout_slash" /> |

\*Updated at **<LastUpdated />**

The protocol slashing parameters can only be updated via the governance. The slashed \$KYVE will get transferred to the community pool.

### Undelegation

To prevent undelegation and therefore mitigate slashings before a bundle proposal round is closed there is an undelegation time.
When a delegator starts undelegating the \$KYVE are unbonding for the specified unbonding time. After the unbonding time is reached the \$KYVE is automatically transferred to the delegator.

|                  | Mainnet                                                                                  | Kaon                                                                                     | Korellia                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Unbonding Time\* | <ParamString network="kyve" module="delegation" param="unbonding_delegation_time" /> sec | <ParamString network="kaon" module="delegation" param="unbonding_delegation_time" /> sec | <ParamString network="korellia" module="delegation" param="unbonding_delegation_time" /> sec |

\*Updated at **<LastUpdated />**

:::caution
**ATTENTION**: During the unbonding time the delegation still can be slashed, but during this time rewards are still earned
:::

You can undelegate by going to the web app and view your delegations on the 'User' page. There should be a button called 'Undelegate'.

:::info
**NOTE**: After the unbonding time is reached the entire current rewards are also automatically claimed and transferred to the delegator account
:::

### Redelegation

To permit redelegations without the need to wait for a long unbonding time, the protocol reledelation uses _redelegation spells_.
This special concept allows to redelegate to other protocol validators immediately. This can only be done depending on how many
redelegation spells you have left. If you perform a redelegation you loose one spell. When all spells are used you can't redelegate
anymore. Spells are enabled again after the redelegation cooldown time. The redelegation cooldown time immediately starts after a spell has been used.

|                              | Mainnet                                                                              | Kaon                                                                                 | Korellia                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Redelegation Spells\*        | <ParamString network="kyve" module="delegation" param="redelegation_max_amount" />   | <ParamString network="kaon" module="delegation" param="redelegation_max_amount" />   | <ParamString network="korellia" module="delegation" param="redelegation_max_amount" />   |
| Redelegation Cooldown Time\* | <ParamString network="kyve" module="delegation" param="redelegation_cooldown" /> sec | <ParamString network="kaon" module="delegation" param="redelegation_cooldown" /> sec | <ParamString network="korellia" module="delegation" param="redelegation_cooldown" /> sec |

\*Updated at **<LastUpdated />**

You can redelegate by going to the web app and view your delegations on the 'User' page. There should be a button called 'Redelegate'.
