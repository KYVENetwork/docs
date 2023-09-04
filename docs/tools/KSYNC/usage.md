---
sidebar_position: 1
---

# Usage

Depending on the blockchain application you are trying to sync the following sync modes can be used.

Whichever sync mode you're using, you still have to make sure that the blocks for your node are actually available.
You can check out available storage pools for every KYVE network below:

- **KYVE (Mainnet)**: https://app.kyve.network/#/pools
- **Kaon (Testnet)**: https://app.kaon.kyve.network/#/pools
- **Korellia (Devent)**: https://app.korellia.kyve.network/#/pools

### Limitations

If you want to sync a node from genesis and the genesis file is bigger than 100MB you have to use P2P because of a
message size limitation in the Tendermint Socket Protocol (TSP).

Currently, P2P-SYNC is only supported for nodes using `github.com/tendermint/tendermint`. If nodes use CometBFT, DB-SYNC
has to be used. CometBFT support will be added in the future.

:::info 
[AUTO-SYNC](#auto-sync) wil manage the P2P or DB decision on its own.
:::

### AUTO-SYNC

Due to the 100MB limitation, [P2P-SYNC](#p2p-sync) was implemented to support KSYNC for any type of Tendermint blockchain.
However, in comparison to [DB-SYNC](#db-sync) it has some disadvantages, which is why it's recommended to use P2P-Sync only as long as the first block was synced successfully before switching back to DB-SYNC.
On top of that, you need to run the node to be synced and KSYNC in two different terminals, which isn't that comfortable for developers.
AUTO-SYNC consists of a process manager, running P2P-Sync or DB-Sync on the one hand and the node to be synced on the other hand.
Based on the requirements, the process manager will manage which syncing process is required, thereby enabling the best way of syncing the node with the validated blocks.
If the node is completely synced with the corresponding KYVE pool, it will start normally to find peers through the provided seeds.
This resolves in the ability to sync a node completely with KYVE data requiring just one command.

#### AUTO-SYNC requirements

The requirements are similar to the [DB-SYNC requirements](#db-requirements). Everything else will be set up automatically.

#### Sync node with AUTO-SYNC

To start the syncing process, simply run

````bash
ksync start --home="/Users/<user>/.<chain>" --daemon-path="/Users/<user>/<daemon>" --pool-id=<pool> --chain-id=<chain-id> --seeds <p2p.seeds>
````

:::info
Since AUTO-SYNC is the default syncing mode you don't have to specify with a flag.
:::

### P2P-SYNC

In this sync mode this tool mocks a peer which has all the blocks the actual peer node needs. The
blocks are then streamed over the dedicated block channels and storing them is handled by the node itself.

<p align="center">
  <img width="70%" src="/img/p2p_sync.png" />
</p>

#### P2P Requirements

It does not matter if you want to sync a node from genesis or from an existing height, the following settings have
to be changed in order to run p2p sync.

Make sure that `persistent_peers` are empty in the `config.toml` config file:

`~/.<chain>/config/config.toml`
```toml
[p2p]

persistent_peers = ""
```

Make sure that your `addrbook.json` is empty or delete it entirely:

```bash
rm ~/.<chain>/config/addrbook.json
```

And finally make the following settings:

`~/.<chain>/config/config.toml`
```toml
[p2p]

pex = false

allow_duplicate_ip = true
```

#### Sync node with P2P

Now you can start your node simply with the `start` command like you would start the node normally.

```bash
./<chaind> start
```

When you see that the  node is trying to search for peers but is unable to find any you can start KSYNC.

:::caution 
If the node actually finds peers the configuration is wrong, in this case double-check the settings
above.
:::

You can then start KSYNC in a **new** terminal with the following command. Please make sure to replace `<user>` and
`<chain>` with your specific values. This of course is also true for `<pool>` and `<chain-id>`.

```bash
ksync start mode=p2p --home="/Users/<user>/.<chain>" --pool-id=<pool> --chain-id=<chain-id>
```

Available chain ids are `kyve-1` for Mainnet, `kaon-1` for Kaon Testnet and `korellia` for Korellia Devnet

:::info
If you want to use your own rest endpoint for syncing, because you are running your own KYVE node
for example or want to use a different geolocated endpoint, simply overwrite it by adding the `--rest-endpoint=https://api-us-1.kyve.network`
:::

Once KSYNC starts it automatically continues from the latest height found in the node and starts downloading
the blocks from the storage provider and validates the checksum. You should see blocks streaming over and the node
committing those blocks. If you run this command without a `--target-height` it will sync all blocks which are
available in the pool. You can simply exit the sync process by killing KSYNC with CMD+C.

### DB-SYNC

In this sync mode this tool mocks the tendermint process which communicates directly with the
blockchain application over ABCI and replays the blocks against the app and manually writes the results
to the DB directly.

<p align="center">
  <img width="70%" src="/img/db_sync.png" />
</p>

#### DB Requirements

It does not matter if you want to sync a node from genesis or from an existing height, the following settings have
to be changed in order to run DB sync.

Make sure that `persistent_peers` are empty in the `config.toml` config file:

`~/.<chain>/config/config.toml`
```toml
[p2p]

persistent_peers = ""
```

Make sure that your `addrbook.json` is empty or delete it entirely:

```bash
rm ~/.<chain>/config/addrbook.json
```

Make sure that `proxy_app` and `abci` have the following default values in the `config.toml` config file:

`~/.<chain>/config/config.toml`
```toml
#######################################################################
###                   Main Base Config Options                      ###
#######################################################################

proxy_app = "tcp://127.0.0.1:26658"
abci = "socket"
```

#### Sync node with DB

Now you can start your node with a special flag, so it does not start with tendermint as an embedded process:

```bash
./<chaind> start --with-tendermint=false
```

If you see that the abci server is waiting for new connections you can proceed with starting KSYNC in a **new**
terminal with the following command. Please make sure to replace `<user>` and
`<chain>` with your specific values. This of course is also true for `<pool>` and `<chain-id>`.

Available chain ids are `kyve-1` for Mainnet, `kaon-1` for Kaon Testnet and `korellia` for Korellia Devnet

:::info
If you want to use your own rest endpoint for syncing, because you are running your own KYVE node
for example or want to use a different geolocated endpoint, simply overwrite it by adding the `--rest-endpoint=https://api-us-1.kyve.network`
:::

Once KSYNC starts it automatically continues from the latest height found in the node and starts downloading
the blocks from the storage provider and validates the checksum. You should KSYNC committing blocks against the app.
If you run this command without a `--target-height` it will sync all blocks which are
available in the pool. KSYNC will automatically exit once a target height is reached, or you can simply exit the sync
process by killing KSYNC with CMD+C.