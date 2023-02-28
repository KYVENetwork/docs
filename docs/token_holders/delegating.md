---
sidebar_position: 4
---

# Delegating

Because there are two different types of nodes (chain node & protocol node) there are also two types of delegation. Both actions help to secure the KYVE network and earn rewards, but both come with their respected risks.

:::danger
**ATTENTION**: Delegating might lead to the loss of your $KYVE. Please read this guide until the end in order to understand how to prevent this.
:::

## Chain Delegation

Chain delegation helps to secure the KYVE blockchain, which further secures the protocol layer that sits on top of it. When you delegate into a chain node you're $KYVE is bonded and used in the Proof of Stake protocol to produce and validate new blocks. By delegating into a chain node you are trusting that node to act honestly. If that node is found to act mailicously and is getting slashed a part of your delegation is also slashed.

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

You can simply connect your wallet on the top right of the page and make sure you have some $KYVE that you want to delegate. On the 'Staking' page you can see a list of all chain nodes which are actively running in the network. After choosing a node based on certain factors like APY, commission or uptime you can delegate by clicking on the node itself or on the right button 'Delegate'.

The following example shows the delegation with the Ping explorer on the Kaon network.

<p align="center">
  <img src="/img/chain_delegation.png" />
</p>

### Rewards

In return for lending out $KYVE and putting them at risk in order to secure the network delegators receive rewards in form of $KYVE. The most important parameter to estimate the rewards is the APY (Annual percentage yield) or also sometimes called APR (Annual percentage rate). This is an estimation of how much interest you can accrue in one year.

:::caution
**IMPORTANT**: The chain delegation APY is **never** a garuantee. It is simply an estimation for the next year based on current parameters.
:::

Another parameter which influences the rewards of a delegator is the node commission. The node commission defines how much of the block reward directly goes to the node and how much goes to the rest - the delegators. A high commission means less rewards for delegators, a low one the opposite.

The source of those rewards are a combination of inflation and transaction fees. Inflation helps stablizing the network by providing consistent rewards to chain nodes and chain delegators. Those rewards are minted every block and collected in a fee pool where every transaction fee gets collected, too. After the rewards for each block are collected there are distributed in the Cosmos SDK [x/distribution](https://docs.cosmos.network/main/modules/distribution) module.

Those rewards then can be claimed in the block explorer. Once they are claimed they are liquid and free to use.

### Risks

As already briefly mentioned before, chain delegation comes with risk. Delegating into a chain node also implies that you as a delegator are responsible for the actions of that node. If the node behaves accordingly it and you as a delegator receive rewards. If the network finds the node was acting maliciously (for example double signing) or being offline the node and you receive a slash.

The severity of a slash depends on the action of the node and on the network parameters. These can be found below:

import ParamPercentage from '/src/components/ParamPercentage';
import LastUpdated from '/src/components/LastUpdated';

|               | Mainnet | Kaon                                                                                                                           | Korellia                                                                                                                      |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Double Sign\* | -       | <ParamPercentage url="https://api-eu-1.kaon.kyve.network/cosmos/slashing/v1beta1/params" param="slash_fraction_double_sign" /> | <ParamPercentage url="https://api.korellia.kyve.network/cosmos/slashing/v1beta1/params" param="slash_fraction_double_sign" /> |
| Downtime\*    | -       | <ParamPercentage url="https://api-eu-1.kaon.kyve.network/cosmos/slashing/v1beta1/params" param="slash_fraction_downtime" />    | <ParamPercentage url="https://api.korellia.kyve.network/cosmos/slashing/v1beta1/params" param="slash_fraction_downtime" />    |

\*Updated at **<LastUpdated />**

The chain slashing parameters can only be updated via the governance. The slashed $KYVE will get transferred to the community pool.

## Protocol Delegation

Similarly to chain delegation, which helps to secure the KYVE blockchain, protocol delegation helps to secure the actual validity of the data KYVE is archiving. For that you have to delegate into protocol nodes.
When protocol nodes receive delegations their voting power and their probability of getting chosen as the next uploader increases. This means that protocol nodes have more control over which data gets validated and
also earn more rewards. More information on that can be found [here](/protocol_devs/advanced_concepts/uploader_selection). By delegating into protocol nodes you again are trusting that node to act honestly. If that node is found to act maliciously and is getting slashed a part of your delegation is also slashed.

### How to delegate?

The easiest way to delegate into protocol nodes is by using the KYVE web app. The web app for every network can be found below:

<Tabs groupId="network">
  <TabItem value="korellia" label="Korellia">
    <strong>Web App</strong>: <a href="https://app.kyve.network/#/validators?status=1">https://app.kyve.network/#/validators?status=1</a>
  </TabItem>
  <TabItem value="kaon" label="Kaon">
    <strong>Web App</strong>: <a href="https://app.kaon.kyve.network/#/validators?status=1">https://app.kaon.kyve.network/#/validators?status=1</a>
  </TabItem>
  <TabItem value="kyve" label="KYVE">
    Coming Soon
  </TabItem>
</Tabs>

You can simply connect your wallet on the top right of the page and make sure you have some $KYVE that you want to delegate. On the 'Validators' page you can see a list of all protocol nodes which are actively running in the network. After choosing a node based on certain factors like APY, commission or slashing history you can delegate by clicking on the node itself or on the right button 'Delegate'.

The following example shows the delegation with the KYVE web app on the Korellia network.

<p align="center">
  <img src="/img/protocol_delegation.png" />
</p>

### Rewards

Again similar to chain delegation the delegator receives in return for lending out $KYVE and putting them at risk in order to secure the network and the process of data validation rewards in form of $KYVE. The most important parameter again is the APY (or APR).

:::caution
**IMPORTANT**: The protocol delegation APY is **never** a garuantee. It is simply an estimation for the next year based on current parameters.
:::

Another parameter which influences the rewards of a delegator is the node commission. The node commission defines how much of the bundle reward directly goes to the node and how much goes to the rest - the delegators. A high commission means less rewards for delegators, a low one the opposite. More information on that can be found [here](/protocol_devs/advanced_concepts/uploader_reward_calculation).

The source of those rewards are storage pool funds provided by pool funders. Pool funders have an interest in validating the archiving a specific data source the storage pool handles. Once a node receives
a bundle reward (the data he archived got validated) the rewards are distributed between all delegators. More information on the distribution details can be found [here](/protocol_devs/advanced_concepts/delegator_reward_calculation).

Those rewards then can be claimed in the web app under 'User'. Once they are claimed they are liquid and free to use.

### Risks

As already briefly mentioned before, protocol delegation comes with risk. Delegating into a protocol node also implies that you as a delegator are responsible for the actions of that node. If the node behaves accordingly it and you as a delegator receive rewards. If the network finds the node was acting maliciously (for example uploading incorrect data) or being offline the node and you receive a slash.

The severity of a slash depends on the action of the node and on the network parameters. More details of how and when those slashes are applied can be found [here](/protocol_devs/general_concepts/slashing). These can be found below:

|                 | Mainnet | Kaon                                                                                                              | Korellia                                                                                                         |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Upload Slash\*  | -       | <ParamPercentage url="https://api-eu-1.kaon.kyve.network/kyve/delegation/v1beta1/params" param="upload_slash" />  | <ParamPercentage url="https://api.korellia.kyve.network/kyve/delegation/v1beta1/params" param="upload_slash" />  |
| Vote Slash\*    | -       | <ParamPercentage url="https://api-eu-1.kaon.kyve.network/kyve/delegation/v1beta1/params" param="vote_slash" />    | <ParamPercentage url="https://api.korellia.kyve.network/kyve/delegation/v1beta1/params" param="vote_slash" />    |
| Timeout Slash\* | -       | <ParamPercentage url="https://api-eu-1.kaon.kyve.network/kyve/delegation/v1beta1/params" param="timeout_slash" /> | <ParamPercentage url="https://api.korellia.kyve.network/kyve/delegation/v1beta1/params" param="timeout_slash" /> |

\*Updated at **<LastUpdated />**

The protocol slashing parameters can only be updated via the governance. The slashed $KYVE will get transferred to the community pool.
