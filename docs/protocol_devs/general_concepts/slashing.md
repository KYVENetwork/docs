---
sidebar_position: 6
---

# Slashing

## Introduction

To discourage and punish malicious behaviour protocol nodes can get slashed and therefore loose a part of their
delegation.
Depending on the severity of the behaviour different kind of slashes are applied. There are three types of slashes:

- **Timeout slash**: applied if the node misses a certain amount of bundle proposals
- **Vote slash**: applied if the node voted incorrect (for example voted valid although the bundle was invalid
  etc.)
- **Upload slash**: applied if the node proposed a bundle which then gets rejected as invalid

To prevent multiple slashing and therefore to protect the node's stake because of for example an incorrect configuration
the node automatically
gets removed from the pool if any of the above slashings are applied.

:::danger
**ATTENTION**: Not only the node's personal delegation will get slashed, also normal delegators will loose a part of
their delegation in the same ratio. This implies that delegators have to choose their node carefully.
:::

## Point System

It is quite clear to determine when a vote or upload slash should get applied - immediately when the votes are tallied.
But determining when a timeout slash
should get applied is a bit more complicated because we don't exactly know if the node is actually offline or for
example the internet, the web3 storage provider
or the data source itself is offline. For this reason a point system was introduced.

Every time a node misses to vote on a bundle proposal or even upload a bundle proposal
if the node is the current designated uploader the node receives a point. If a certain amount of points is
reached (`max_points`) the timeout slash gets applied, but for that to occur
the node has to receive the max points in a row. If for example the node has already 2 points but then starts voting
again because of a short internet timeout the points
are reset to zero again. With this system we can ensure with a high probability, that the node is actually offline.
The `max_points` is a global parameter in the `x/bundles` module.

## Slash Parameters

The current slashing parameters and the max points (important metric of timeout slashes) can be found below.

import ParamPercentage from '/src/components/ParamPercentage';
import ParamString from '/src/components/ParamString';
import LastUpdated from '/src/components/LastUpdated';

|                 | Mainnet | Kaon                                                                                                              | Korellia                                                                                                         |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Upload Slash\*  | -       | <ParamPercentage url="https://api-eu-1.kaon.kyve.network/kyve/delegation/v1beta1/params" param="upload_slash" />  | <ParamPercentage url="https://api.korellia.kyve.network/kyve/delegation/v1beta1/params" param="upload_slash" />  |
| Vote Slash\*    | -       | <ParamPercentage url="https://api-eu-1.kaon.kyve.network/kyve/delegation/v1beta1/params" param="vote_slash" />    | <ParamPercentage url="https://api.korellia.kyve.network/kyve/delegation/v1beta1/params" param="vote_slash" />    |
| Timeout Slash\* | -       | <ParamPercentage url="https://api-eu-1.kaon.kyve.network/kyve/delegation/v1beta1/params" param="timeout_slash" /> | <ParamPercentage url="https://api.korellia.kyve.network/kyve/delegation/v1beta1/params" param="timeout_slash" /> |
| Max Points\*    | -       | <ParamString url="https://api-eu-1.kaon.kyve.network/kyve/bundles/v1beta1/params" param="max_points" />           | <ParamString url="https://api.korellia.kyve.network/kyve/bundles/v1beta1/params" param="max_points" />           |

\*Updated at **<LastUpdated />**

The protocol slashing parameters can only be updated via the governance. The slashed $KYVE will get transferred to the community pool.

## Calculation

In order to understand the slashing calculation the following example can be used. Here the above slashing parameters
are used.

```
Node delegation = 100,000 $KYVE
Upload slash    = 5%
Vote slash      = 2%
Timeout slash   = 0.05%

# Timeout slash
Slash amount = 100,000 $KYVE * 0.0005 = 50 $KYVE
Remaining delegation = 100,000 $KYVE - 100,000 $KYVE * 0.0005 = 99,950 $KYVE

# Vote slash
Slash amount = 100,000 $KYVE * 0.02 = 2000 $KYVE
Remaining delegation = 100,000 $KYVE - 100,000 $KYVE * 0.02 = 98,000 $KYVE

# Upload slash
Slash amount = 100,000 $KYVE * 0.05 = 5000 $KYVE
Remaining delegation = 100,000 $KYVE - 100,000 $KYVE * 0.05 = 95,000 $KYVE
```
