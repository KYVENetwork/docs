---
sidebar_position: 1
---

# Overview

## What is \$KYVE

\$KYVE is KYVE’s native coin. It has multiple use cases:
On the chain level, \$KYVE is used for staking and delegating, securing the network through Proof of Stake;
On the protocol level, \$KYVE is used for funding, staking, and delegating, providing security for uploaded data.
On the governance level, \$KYVE is used for submitting and voting on proposals, allowing stakeholders to have a say in the evolution and growth of KYVE.
Find more about \$KYVE via [CoinMarketCap](https://coinmarketcap.com/currencies/kyve-network).

## Key Parameters

The most important parameters of \$KYVE are listed below depending on the network:

import ParamTotalSupply from '/src/components/ParamTotalSupply';
import ParamInflation from '/src/components/ParamInflation';
import LastUpdated from '/src/components/LastUpdated';

|                        | Mainnet                                                                               | Kaon                                                                                       | Korellia                                                                                       |
|------------------------|---------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| Genesis Supply         | **1,000,000,000** \$KYVE                                                              | **1,000,000,000** \$KYVE                                                                   | **1,000,000,000** \$KYVE                                                                       |
| Current Total Supply\* | <ParamTotalSupply networkUrl="https://api.kyve.network" denom="ukyve" decimals={6} /> | <ParamTotalSupply networkUrl="https://api.kaon.kyve.network" denom="tkyve" decimals={6} /> | <ParamTotalSupply networkUrl="https://api.korellia.kyve.network" denom="tkyve" decimals={6} /> |
| Current Inflation\*    | <ParamInflation networkUrl="https://api.kyve.network" />                              | <ParamInflation networkUrl="https://api.kaon.kyve.network" />                              | <ParamInflation networkUrl="https://api.korellia.kyve.network" />                              |
| Coin Type              | **118**                                                                               | **118**                                                                                    | **118**                                                                                        |
| Base Denom             | **ukyve**                                                                             | **tkyve**                                                                                  | **tkyve**                                                                                      |
| Decimals               | **6**                                                                                 | **6**                                                                                      | **6**                                                                                          |

\*Updated at **<LastUpdated />**

## What can I do with my \$KYVE?

On the chain level, \$KYVE is used for delegating and securing the network through Proof of Stake. On the protocol level, \$KYVE is used for funding and delegating, providing security for uploaded and validated data. On the governance level, \$KYVE is used for submitting and voting on proposals, allowing stakeholders to have a say in the evolution and growth of KYVE.

## \$KYVE Faucet

To participate in the Testnet **Kaon** or the Devnet **Korellia**, you will need tokens that can be obtained through faucets.

- **[Kaon Faucet](https://app.kaon.kyve.network/#/faucet)**
- **[Korellia Faucet](https://app.korellia.kyve.network/#/faucet)**

## $KYVE Inflation

Inflation in the blockchain context refers to the process of minting new tokens to incentivize network participation and maintain a balance between supply and demand. It's crucial for ensuring network security, especially in Proof of Stake (PoS) chains, by providing rewards for node operation and allowing new participants to join.

KYVE implements a unique approach to inflation by maintaining a goal bonded ratio of 80%. The goal bonded ratio refers to the target ratio of tokens being staked within a network, regulating the inflation rate: when more tokens are staked, inflation decreases, and when fewer tokens are staked, inflation increases. The inflation rate is capped between min and max parameters. Only governance has the authority to adjust inflation parameters. Furthermore, KYVE's governance can modify inflation rates and introduce mechanisms such as burning transaction fees to prevent excessive inflation, showcasing decentralized control over the network's economic model.

KYVE has also implemented inflation splitting to best balance the two layers. This is a highly advanced concept, you can read more about it [here](/learn/protocol_structure/advanced_concepts/inflation_splitting).
