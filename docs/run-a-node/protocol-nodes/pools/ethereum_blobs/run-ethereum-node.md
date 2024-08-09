---
sidebar_position: 3
---

# Run an Ethereum node

The Ethereum Node will act as the source for the KYVE protocol validator and is **required**. You can either run the Ethereum node on the same machine with the KYVE protocol together (recommended) or on a seperate machine.

:::danger
Due to very specific requirements, an additional validation layer, accessibility as well as to prevent slashes, it is strongly recommended to run an independent data source node. API providers should be avoided and have already led to critical problems in the past.
:::

## Prerequisites
The Ethereum node consists of an execution and a consensus layer. Geth serves as the execution client, while Lighthouse operates as the consensus client.
There are multiple methods for setting up the node; however, this version is the recommended one.

Create a directory named `ethereum` on your SSD, followed by two subdirectories within it named `consensus` and `execution`:
```
📂ethereum
┣ 📂consensus
┣ 📂execution
```

Create a JWT secret file:
```bash
openssl rand -hex 32 | tr -d "\n" | tee ~/ethereum/jwt.hex
```

## Execution client

### Install Geth
Multiple methods exist for setting up the Geth execution client. This section focuses on building it from source on Linux. For additional options, refer to the [Geth documentation](https://geth.ethereum.org/docs/getting-started/installing-geth).


#### Build Geth
First, go to the consensus client directory:
```bash
cd ~/ethereum/consensus
```

To build Geth from source, it is required to have **Go 1.21** installed ([documentation](https://go.dev/doc/install)). Confirm the installation with:
```bash
go version
```

Build Geth from source:
```bash
git clone https://github.com/ethereum/go-ethereum.git
cd go-ethereum
make geth
```

These commands create a Geth executable file in the `go-ethereum/build/bin` folder that can be moved and run from another directory if required.
The binary is standalone and doesn't require any additional files.

### Start Execution client
To start the installed Geth execution client, simply run:
```bash
~/ethereum/execution/go-ethereum/build/bin/geth --mainnet --http --http.api eth,net,engine,admin --authrpc.jwtsecret=~/ethereum/jwt.hex --http.port 8545
```

## Consensus client

### Install Lighthouse
Various methods exist for installing the Lighthouse consensus client. This section focuses on building it from source on Ubuntu. For additional options, refer to the [Lighthouse documentation](https://lighthouse-book.sigmaprime.io/installation.html).

#### Requirements:
Install Rust with:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Verify successful installation with:
```bash
cargo version
```

:::tip
**INFO**: If it cannot be found, run `source $HOME/.cargo/env`. After that, running `cargo version` should return the installed version.
:::

Install required packages:
```bash
sudo apt update && sudo apt install -y git gcc g++ make cmake pkg-config llvm-dev libclang-dev clang
```

#### Build Lighthouse
First, go to the consensus client directory:
```bash
cd ~/ethereum/consensus
```

After installing Rust and the build dependencies, build Lighthouse with:
```bash
git clone https://github.com/sigp/lighthouse.git
cd lighthouse
git checkout stable
make
```

### Start Beacon Node

#### Checkpoint-Sync and State Reconstruction
Initially, it is recommended to checkpoint sync the Beacon node, thereby reconstructing historic states:
```bash
lighthouse bn --network mainnet --execution-endpoint http://localhost:8551 --execution-jwt ~/ethereum/jwt.hex --http --disable-deposit-contract-sync --http-port 3500 --prune-blobs false --checkpoint-sync-url <endpoint> --reconstruct-historic-states
```

If the pool has almost caught up with the Ethereum live, the node can be also started with:
```bash
lighthouse bn --network mainnet --execution-endpoint http://localhost:8551 --execution-jwt ~/ethereum/jwt.hex --http --disable-deposit-contract-sync --http-port 3500 --prune-blobs false --checkpoint-sync-url <endpoint>
```

Endpoints for the checkpoint sync can be found [here](https://eth-clients.github.io/checkpoint-sync-endpoints/).

#### Pruning
Because the blobs can result in very high storage size, the default pruning can be used after the pool has reached the Ethereum live height. 
The blobs then are pruned after 18 days, which gives the pool more than two weeks to validate and archive the stored blobs.

To enable pruning, simply run:
```bash
lighthouse bn --network mainnet --execution-endpoint http://localhost:8551 --execution-jwt ~/ethereum/jwt.hex --http --disable-deposit-contract-sync --http-port 3500 --checkpoint-sync-url <endpoint>
```

## Verifying the completed node setup

After the successful start of the node you have to wait until the Consensus client is 
fully synced. To verify the completed node setup, you can check if the node has synced to the 
required height by requesting the blobs of `to_slot` from the latest bundle summary. For example, 
with the following bundle summary:

```json
{
    "from_slot": 8775925, 
    "to_slot": 8775931, 
    "merkle_root": "b4b60406a8a2104feceacf361c1e94fc5b4700c4a9428f9d247d189337bf24e7"
}
```

You can verify that your setup is completed by executing the follwing query:
```bash
curl http://localhost:3500/eth/v1/beacon/blob_sidecars/8775931
```

To verfiy that your execution client is running properly, you can check if the latest block of the local client is nearby the latest key of the KYVE pool.
To get the height of the local running Execution client in hex, execute:
```bash
curl http://localhost:8545 \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}'
```

If both queries return a valid response you can continue with starting the actual KYVE protocol validator
and start participating in the validation and archival process.
