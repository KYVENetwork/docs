---
sidebar_position: 6
---

# Community Pool

## Introduction

The community pool collects funds by charging taxes and network fees. Those funds can be used by the entire community for various reasons like funding a project which is building on top of KYVE or funding a Grant Program and other things.

The current balances for the community pool can be found below for every network:

import ParamCommunityPool from '/src/components/ParamCommunityPool';
import LastUpdated from '/src/components/LastUpdated';

|                  | Mainnet | Kaon                                  | Korellia                                  |
| ---------------- | ------- | ------------------------------------- | ----------------------------------------- |
| Community Pool\* | -       | <ParamCommunityPool network="kaon" /> | <ParamCommunityPool network="korellia" /> |

\*Updated at **<LastUpdated />**

## Earnings

The community pool has multiple channels where $KYVE is transferred to the pool. The following are listed below:

- `Community Tax`: This tax is deducted on the chain layer before the current block reward gets distributed to the network participants
- `Network Fee`: This fee is deducted on the protocol layer before the current bundle reward gets distributed to the network participants
- `Chain Node Slashes`: When a chain node gets slashed due to incorrect or malicious behaviour the slashed funds will get transferred to the community pool
- `Protocol Node Slashes`: When a protocol node gets slashed due to incorrect or malicious behaviour the slashed funds will get transferred to the community pool

The current values for the tax and the fee can be found below for every network:

import ParamPercentage from '/src/components/params/ParamPercentage';

|                 | Mainnet | Kaon                                                                                            | Korellia                                                                                            |
| --------------- | ------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Community Tax\* | -       | <ParamPercentage network="kaon" project="cosmos" module="distribution" param="community_tax" /> | <ParamPercentage network="korellia" project="cosmos" module="distribution" param="community_tax" /> |
| Network Fee\*   | -       | <ParamPercentage network="kaon" module="bundles" param="network_fee" />                         | <ParamPercentage network="korellia" module="bundles" param="network_fee" />                         |

\*Updated at **<LastUpdated />**

## Outgoings

Currently, the only way how to access the funds on the community pool are via a governance spend proposal. This implies that those funds can only be spent when the community agrees and the proposal passes accordingly, making the community pool an actual community pool. The proposal type is `MsgCommunityPoolSpend`.

:::tip
**NOTE**: More information on how to create governance proposal can be found **[here](/token_holders/governance.md)**
:::
