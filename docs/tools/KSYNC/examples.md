---
sidebar_position: 3
---

# Examples

### 1. Sync Cosmos Hub (Mainnet) with AUTO-SYNC

Cosmos Hub requires a start with P2P sync due to the >100MB genesis file.
To simplify the syncing process, we can use AUTO-SYNC to let KSYNC manage both processes independently.

To start successfully, you need to download and set up the correct binary with the version `v.4.2.1`. You can download them [here](https://github.com/cosmos/gaia/releases/tag/v4.2.1) or build them from source:
[https://github.com/cosmos/gaia](https://github.com/cosmos/gaia)

Verify installation with

```bash
./gaiad version
4.2.1
```

After the installation init the project

```bash
./gaiad init <your-moniker> --chain-id cosmoshub-4
```

download the genesis

```bash
wget https://raw.githubusercontent.com/cosmos/mainnet/master/genesis/genesis.cosmoshub-4.json.gz
gzip -d genesis.cosmoshub-4.json.gz
mv genesis.cosmoshub-4.json ~/.gaia/config/genesis.json
```

Don't include an addrbook.json and KSYNC will manage your config file itself.
It should only connect to our peer. The supervised KSYNC process can be started with

`````bash
 ksync start --daemon-path /<daemon-path>/gaiad --home /Users/<user>/.gaia --pool-id 0 --chain-id=kyve-1
`````

### 2. Sync Osmosis (Kaon) with DB-SYNC

To sync osmosis you have to download and set up the correct osmosis binary. To sync from genesis the version `v3.1.0` has
to be used. You can download them [here](https://github.com/osmosis-labs/osmosis/releases/tag/v3.1.0) or build them from source: [https://github.com/osmosis-labs/osmosis](https://github.com/osmosis-labs/osmosis)

Verify installation with

```bash
./osmosisd version
3.1.0
```

After the installation init the config

```bash
./osmosisd init <your-moniker> --chain-id osmosis-1
```

download the genesis

```bash
wget -O ~/.osmosisd/config/genesis.json https://github.com/osmosis-labs/networks/raw/main/osmosis-1/genesis.json
```

Important: Don't include an addrbook.json and make sure persistent_peers and etc. (e.g. unconditional_peer_ids, private_peer_ids
and seeds) are empty for now or else the node will connect to other peers. It should only connect to our peer.

when the config is done the node can be started

```bash
./osmosisd start --with-tendermint=false
```

After you see that the node is waiting for incoming connections you can open a **new** terminal and start
the sync.

```bash
ksync start --mode=db --home="/Users/<user>/.osmosisd" --pool-id=1 --chain-id=kaon-1
```

You should see KSYNC connecting to Osmosis and applying the blocks against the app. You can exit anytime with CMD+C
if you wish to abort the syncing process.

When you want to continue to sync normally you can now add an addrbook or add peers in `persistent_peers`. When you start
the node again with the normal start command `./osmosisd start` the node should continue normally and tries to sync the remaining blocks.

### 3. Sync Cosmos Hub (Mainnet) with P2P-SYNC

Since we want to sync Cosmos Hub from genesis and the genesis file is bigger than 100MB we have to use P2P sync.

To sync cosmos you have to download and set up the correct gaia binary. To sync from genesis the version `v4.2.1` has
to be used. You can download them [here](https://github.com/cosmos/gaia/releases/tag/v4.2.1) or build them from source:
[https://github.com/cosmos/gaia](https://github.com/cosmos/gaia)

Verify installation with

```bash
./gaiad version
4.2.1
```

After the installation init the project

```bash
./gaiad init <your-moniker> --chain-id cosmoshub-4
```

download the genesis

```bash
wget https://raw.githubusercontent.com/cosmos/mainnet/master/genesis/genesis.cosmoshub-4.json.gz
gzip -d genesis.cosmoshub-4.json.gz
mv genesis.cosmoshub-4.json ~/.gaia/config/genesis.json
```

and edit the following in `~/.gaia/config/config.toml`.

```toml
pex = false
allow_duplicate_ip = true
```

Important: Don't include an addrbook.json and make sure persistent_peers and etc. (e.g. unconditional_peer_ids, private_peer_ids
and seeds) are empty for now or else the node will connect to other peers. It should only connect to our peer.

When the config is done the node can be started. 

:::info 
This can take a while (~5mins) since the genesis file is
quite big. You can skip invariants checks to boot even faster, but it still takes a long time until the gaia node starts.

```bash
./gaiad start --x-crisis-skip-assert-invariants
```
:::

After you see that the node is searching for peers you can start the tool. For testing KYVE has archived the first
5000 blocks of Cosmos Hub, so after that height is reached the sync will be done.

```bash
ksync start --mode=p2p --home="/Users/<user>/.gaia" --pool-id=0 --chain-id=kyve-1
```

You should see the peer connecting and sending over blocks to the gaia node. After all the blocks have been applied
the tool shows _Done_ and you can safely exit the process with CMD+C.

When you want to continue to sync normally you can now add an addrbook or add peers in `persistent_peers`.
When you start  the node again the node should continue normally and tries to sync the remaining blocks.