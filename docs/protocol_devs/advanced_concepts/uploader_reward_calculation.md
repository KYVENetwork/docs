---
sidebar_position: 3
---

# Uploader Reward Calculation

## Introduction

To incentivize protocol nodes to stay online and continue uploading and validating data nodes receive a reward in $KYVE for every valid bundle proposed. The reward depends on two main parameters, the `operating_cost` which is stored per pool and the `storage_cost` which is stored as a module param and used for every pool. The operating cost covers all fixed costs a node has including server operating costs, $KYVE transaction fees and other fixed costs. The storage cost covers all variable costs which mainly covers the cost of storing the bundle proposals on a web3 provider like Arweave.

## Calculation

With this information the reward can be calculated as follows:

$$\begin{aligned}
r = operating\_cost + data\_size \cdot storage\_cost
\end{aligned}$$

where

- $r$ = `is the reward for a valid bundle in ukyve`
- $operating\_cost$ = `the fixed base reward per pool in ukyve`
- $data\_size$ = `the amount of bytes in bundle proposal`
- $storage\_cost$ = `the reward per byte in ukyve`
