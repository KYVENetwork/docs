---
sidebar_position: 7
---

# Governance

## Democratizing the network

The KYVE governance allows anyone who holds some \$KYVE and has them bonded in the network (either delegated to chain or protocol)
to participate in the process of changing and improving it. If a minimum deposit can be reached a \$KYVE holder can create a governance proposal which is able to change network parameters or make protocol changes like creating data pools. If the proposal passes with enough \$KYVE holders voting for yes and a certain quorum was reached the changes go into effect.

## Creating Proposals

Currently, the KYVE governance is able to make the following proposals:

- Cosmos
  - `MsgSoftwareUpgrade`: Create a scheduled software upgrade
  - `MsgCancelUpgrade`: Cancel a scheduled software upgrade
  - `MsgCommunityPoolSpend`: Spend assets from the community pool
  - `MsgUpdateParams`: Update params of x/bank module
  - `MsgUpdateParams`: Update params of x/distribution module
  - `MsgUpdateParams`: Update params of x/mint module
  - `MsgUpdateParams`: Update params of x/slashing module
  - `MsgUpdateParams`: Update params of x/staking module
- Params
  - `MsgUpdateParams`: Update params of x/stakers module
  - `MsgUpdateParams`: Update params of x/delegation module
  - `MsgUpdateParams`: Update params of x/bundles module
  - `MsgUpdateParams`: Update params of x/global module
- Pools
  - `MsgCreatePool`: Create a new data pool
  - `UpdatePool`: Update an existing data pool
  - `MsgDisablePool`: Stop a running data pool
  - `MsgEnablePool`: Continue a stopped data pool
  - `MsgScheduleRuntimeUpgrade`: Create and schedule a runtime upgrade for data pools
  - `MsgCancelRuntimeUpgrade`: Cancel a scheduled runtime upgrade for data pools

:::tip
**Note:** Working on a governance proposal or want to learn more about the voting process? Make sure to look at the [best practices](./governance-advanced/best-practices.md).
:::

## On- and off-chain Governance Structure

KYVE has an on-chain governance mechanism for passing
text proposals, changing chain parameters, and spending funds from the community pool.

### Communication Methods

Governance practices and decisions are communicated through different types of documents and design artifacts:

- On-chain governance [proposals](https://app.kyve.network/#/governance)
- Architecture Decision records
- Technical standards / specifications

### Decision-making and Discussion Venues

Venues involve community members to different degrees and individuals often perform multiple roles in the Cosmos ecosystem (validators, users, developers and core-members of KYVE Team). Because technical direction setting and development is almost always happening in the open, involvement from members in the extended community occurs organically.

- **[KYVE Discord](https://discord.gg/kyve)**
  - For ecosystem cross-pollination with an active developer presence.
  - `🏛│governance` channel for discussing proposals, upgrades, etc.
  - `📜│proposals` channel for a full list of proposals.
  - `⏫│upgrades` channel for upcoming software upgrades.
- **[Commonwealth](https://commonwealth.im/kyve)**
  - All-in-one platform to discuss, vote, and fund projects together
  - KYVE [proposals](https://commonwealth.im/kyve/proposals) list
- **[Telegram (@KYVENet)](https://t.me/KYVENet)**
  - General KYVE Telegram group
- **[Twitter (@KYVENetwork)](https://twitter.com/KYVENetwork)**
  - Official KYVE Twitter
