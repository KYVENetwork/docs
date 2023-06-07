---
sidebar_position: 5
---

# Delegation Reward Calculation

## Introduction

Since it is possible that users can delegate into protocol validators a mechanism had to be implemented on how to distribute those rewards between the node operator and the remaining delegators. For that we treat the stake of the node operator as a normal delegation. In this case we call this _self-delegation_. Furthermore, each node operator can choose a _commission_ which is a percentage of how much of the reward will directly go to the node operator. The remaining rewards will then be distributed according to the [F1-Fee distribution](https://drops.dagstuhl.de/opus/volltexte/2020/11974/pdf/OASIcs-Tokenomics-2019-10.pdf) between all delegators **including** the self-delegation of the node operator.
