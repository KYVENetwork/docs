---
sidebar_position: 3
---

# Run Avail Node

The Avail Node will act as the source for the KYVE protocol validator and is **required**. You can either run the node on the same machine with the KYVE protocol together (recommended) or on a seperate machine.

:::danger
Due to very specific requirements, an additional validation layer, accessibility as well as to prevent slashes, it is strongly recommended to run an independent data source node. API providers should be avoided and have already led to critical problems in the past.
:::

## How to run an Avail node

There are two main ways of running an Avail node:

1. By running a pre-built binary.
2. By building from source

### Run a pre-built binary

1. Go to the [Avail node GitHub releases page](https://github.com/availproject/avail/releases/).
   There you will see a lot of pre-built binaries for each version of the Avail node.

2. Please download the binary suitable from your system, of the `latest` version.
   You can do this by running the following command in your terminal:

```bash
curl -L -O https://github.com/availproject/avail/releases/download/<LATEST-AVAIL-NODE-VERSION>/<YOUR-SYSTEM-SPECIFIC-BINARY>.tar.gz
```
3. Extract the downloaded file by opening a terminal in the location of the downloaded file and using the following command:

```bash
tar -xzvf <YOUR-SYSTEM-SPECIFIC-BINARY>.tar.gz
```

4. Once extracted, you will see a pre-built, executable binary named `avail-node` in the same directory.
   You can run this binary using the following command:

```bash
./avail-node --name your-name --chain mainnet -d ./output --pruning archive --rpc-external --rpc-port <PORT>
```

5. Your terminal output should look something like this:

```bash
2024-04-29 07:48:22 Avail Node    
2024-04-29 07:48:22 ✌️  version 2.1.1-8608dc47f00    
2024-04-29 07:48:22 ❤️  by Avail Project <info@availproject.org>, 2017-2024    
2024-04-29 07:48:22 📋 Chain specification: Avail Turing Network    
2024-04-29 07:48:22 🏷  Node name: possible-point-3102    
2024-04-29 07:48:22 👤 Role: FULL    
2024-04-29 07:48:22 💾 Database: ParityDb at ./output/chains/avail_turing_network/paritydb/full    
2024-04-29 07:48:27 🔨 Initializing Genesis block/state (state: 0x5603…9c01, header-hash: 0xd3d2…8b70)    
2024-04-29 07:48:27 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.    
2024-04-29 07:48:29 👶 Creating empty BABE epoch changes on what appears to be first startup.    
2024-04-29 07:48:29 🏷  Local node identity is: 12D3KooWELgzaRZqsHNyUodhZZF7A1ydsRpgLsY7fojDegKni4YF    
2024-04-29 07:48:29 Prometheus metrics extended with avail metrics    
2024-04-29 07:48:29 💻 Operating system: linux    
2024-04-29 07:48:29 💻 CPU architecture: x86_64    
2024-04-29 07:48:29 💻 Target environment: gnu    
2024-04-29 07:48:29 💻 CPU: DO-Premium-Intel    
2024-04-29 07:48:29 💻 CPU cores: 4    
2024-04-29 07:48:29 💻 Memory: 7937MB    
2024-04-29 07:48:29 💻 Kernel: 5.15.0-105-generic    
2024-04-29 07:48:29 💻 Linux distribution: Ubuntu 22.04.4 LTS    
2024-04-29 07:48:29 💻 Virtual machine: yes    
2024-04-29 07:48:29 📦 Highest known block at #0    
2024-04-29 07:48:29 Running JSON-RPC server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]    
2024-04-29 07:48:29 🏁 CPU score: 950.72 MiBs    
2024-04-29 07:48:29 🏁 Memory score: 4.02 GiBs    
2024-04-29 07:48:29 🏁 Disk score (seq. writes): 845.72 MiBs    
2024-04-29 07:48:29 🏁 Disk score (rand. writes): 338.52 MiBs    
2024-04-29 07:48:29 〽️ Prometheus exporter started at 127.0.0.1:9615    
2024-04-29 07:48:30 🔍 Discovered new external address for our node: /ip4/139.59.94.121/tcp/30333/ws/p2p/12D3KooWELgzaRZqsHNyUodhZZF7A1ydsRpgLsY7fojDegKni4YF    
2024-04-29 07:48:34 ⚙️  Syncing, target=#137399 (9 peers), best: #1000 (0x9e8f…55ab), finalized #512 (0x0a9a…875a), ⬇ 316.3kiB/s ⬆ 14.2kiB/s    
2024-04-29 07:48:39 ⚙️  Syncing 235.4 bps, target=#137399 (9 peers), best: #2177 (0x5828…e9da), finalized #2048 (0x2f65…3b2e), ⬇ 113.3kiB/s ⬆ 5.5kiB/s    
2024-04-29 07:48:43 [3097] 💸 generated 8 npos targets    
2024-04-29 07:48:43 [3097] 💸 generated 8 npos voters, 8 from validators and 0 nominators    
2024-04-29 07:48:43 [#3097] 🗳  creating a snapshot with metadata SolutionOrSnapshotSize { voters: 8, targets: 8 }    
2024-04-29 07:48:43 [#3097] 🗳  Starting phase Signed, round 1.    
2024-04-29 07:48:44 [#3277] 🗳  Starting phase Unsigned((true, 3277)), round 1.    
2024-04-29 07:48:44 [#3278] 🗳  queued unsigned solution with score ElectionScore { minimal_stake: 184467440819699, sum_stake: 184467440819699, sum_stake_squared: 34028236722569152873026450601 }    
2024-04-29 07:48:44 ⚙️  Syncing 236.0 bps, target=#137400 (10 peers), best: #3357 (0x0c50…7d21), finalized #3072 (0x2803…c15b), ⬇ 244.0kiB/s ⬆ 20.2kiB/s    
2024-04-29 07:48:44 [#3457] 🗳  Starting phase Off, round 2.    
2024-04-29 07:48:44 [3457] 💸 new validator set of size 1 has been processed for era 1    
2024-04-29 07:48:49 ⚙️  Syncing 206.2 bps, target=#137400 (10 peers), best: #4388 (0x2d3d…6b93), finalized #4177 (0x58f8…9518), ⬇ 261.5kiB/s ⬆ 11.6kiB/s    
2024-04-29 07:48:54 ⚙️  Syncing 232.0 bps, target=#137400 (10 peers), best: #5548 (0x1aef…1c46), finalized #5120 (0x274f…e5d7), ⬇ 122.7kiB/s ⬆ 6.9kiB/s    
2024-04-29 07:48:59 ⚙️  Syncing 118.2 bps, target=#137400 (10 peers), best: #6139 (0x9e52…af00), finalized #5632 (0x5297…a001), ⬇ 66.5kiB/s ⬆ 4.9kiB/s    
2024-04-29 07:49:04 ⚙️  Syncing 185.7 bps, target=#137401 (10 peers), best: #7068 (0x911d…666a), finalized #6656 (0xdd79…2e5e), ⬇ 80.7kiB/s ⬆ 1.5kiB/s    
2024-04-29 07:49:05 [7417] 💸 generated 9 npos targets    
2024-04-29 07:49:05 [7417] 💸 generated 9 npos voters, 9 from validators and 0 nominators    
2024-04-29 07:49:05 [#7417] 🗳  creating a snapshot with metadata SolutionOrSnapshotSize { voters: 9, targets: 9 }    
2024-04-29 07:49:05 [#7417] 🗳  Starting phase Signed, round 2.    
2024-04-29 07:49:06 [#7597] 🗳  Starting phase Unsigned((true, 7597)), round 2.    
2024-04-29 07:49:06 [#7598] 🗳  queued unsigned solution with score ElectionScore { minimal_stake: 184447246591607, sum_stake: 1475577972732856, sum_stake_squared: 272166294201800640629142739592 }    
2024-04-29 07:49:07 [#7777] 🗳  Finalized election round with compute Unsigned.    
2024-04-29 07:49:07 [#7777] 🗳  Starting phase Off, round 3.    
2024-04-29 07:49:07 [7777] 💸 new validator set of size 8 has been processed for era 2    
2024-04-29 07:49:09 ⚙️  Syncing 206.2 bps, target=#137401 (10 peers), best: #8099 (0x559a…9c2e), finalized #7680 (0x84b6…abc0), ⬇ 103.9kiB/s ⬆ 0.9kiB/s    
2024-04-29 07:49:14 ⚙️  Syncing 204.4 bps, target=#137401 (10 peers), best: #9121 (0xf95e…5a17), finalized #8704 (0x6e49…33cd), ⬇ 98.0kiB/s ⬆ 1.5kiB/s
```

### Build from source

Please note that the following instructions were tested specifically on an Ubuntu machine. If you are using a different operating system, you may need to adjust the commands accordingly.
However, they should work on all Debian installations, and with minor tweaks, on all Linux distros.

Before proceeding, install the required dependencies:

1. The Rust toolchain: Go to [rust-lang.org/tools/install](https://www.rust-lang.org/tools/install) and follow the instructions to install the Rust toolchain onto your system.
   Verify Rust is installed on your system by running:
```bash
rustc --version
```

If the installation process seemed to go smoothly and the command above still doesn't work:
1. Close your current terminal and try it in a new one.
2. Alternatively, in your old terminal, run `source $HOME/.cargo/env` and then run `source $HOME/.cargo/env` again.

If you still encounter issues with Rust's installation, refer to the [Rust installation guide](https://www.rust-lang.org/tools/install) for troubleshooting tips.

2. Make sure your Linux distro is up-to-date by running:
```bash
apt update && apt upgrade
```

3. Make sure some common dependencies are installed using:
```bash
apt install make clang pkg-config libssl-dev build-essential git curl llvm libudev-dev cmake protobuf-compiler -y
```

Some of these commands might not work without being prefixed by 'sudo'.
However, the 'sudo' command gives the terminal root access, so be careful
when using it.

4. Clone the Avail node repo and move your terminal into it:

```bash
git clone https://github.com/availproject/avail.git && cd avail
```

5. Build the Avail node by executing this command:

```bash
cargo build --release
```
The build process may take some time, depending on your system's specifications.
On a system with a Quad-core processor & 8GBs of RAM, the build process typically takes 
around 35-40 minutes.

6. Once your Avail node is compiled locally, you can run it using:

```bash
cargo run --release -- --name your-name --chain mainnet -d ./output --pruning archive --rpc-external --rpc-port <PORT>
```

7. Your terminal output should look something like this:

```bash
2024-04-29 07:48:22 Avail Node    
2024-04-29 07:48:22 ✌️  version 2.1.1-8608dc47f00    
2024-04-29 07:48:22 ❤️  by Avail Project <info@availproject.org>, 2017-2024    
2024-04-29 07:48:22 📋 Chain specification: Avail Turing Network    
2024-04-29 07:48:22 🏷  Node name: possible-point-3102    
2024-04-29 07:48:22 👤 Role: FULL    
2024-04-29 07:48:22 💾 Database: ParityDb at ./output/chains/avail_turing_network/paritydb/full    
2024-04-29 07:48:27 🔨 Initializing Genesis block/state (state: 0x5603…9c01, header-hash: 0xd3d2…8b70)    
2024-04-29 07:48:27 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.    
2024-04-29 07:48:29 👶 Creating empty BABE epoch changes on what appears to be first startup.    
2024-04-29 07:48:29 🏷  Local node identity is: 12D3KooWELgzaRZqsHNyUodhZZF7A1ydsRpgLsY7fojDegKni4YF    
2024-04-29 07:48:29 Prometheus metrics extended with avail metrics    
2024-04-29 07:48:29 💻 Operating system: linux    
2024-04-29 07:48:29 💻 CPU architecture: x86_64    
2024-04-29 07:48:29 💻 Target environment: gnu    
2024-04-29 07:48:29 💻 CPU: DO-Premium-Intel    
2024-04-29 07:48:29 💻 CPU cores: 4    
2024-04-29 07:48:29 💻 Memory: 7937MB    
2024-04-29 07:48:29 💻 Kernel: 5.15.0-105-generic    
2024-04-29 07:48:29 💻 Linux distribution: Ubuntu 22.04.4 LTS    
2024-04-29 07:48:29 💻 Virtual machine: yes    
2024-04-29 07:48:29 📦 Highest known block at #0    
2024-04-29 07:48:29 Running JSON-RPC server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]    
2024-04-29 07:48:29 🏁 CPU score: 950.72 MiBs    
2024-04-29 07:48:29 🏁 Memory score: 4.02 GiBs    
2024-04-29 07:48:29 🏁 Disk score (seq. writes): 845.72 MiBs    
2024-04-29 07:48:29 🏁 Disk score (rand. writes): 338.52 MiBs    
2024-04-29 07:48:29 〽️ Prometheus exporter started at 127.0.0.1:9615    
2024-04-29 07:48:30 🔍 Discovered new external address for our node: /ip4/139.59.94.121/tcp/30333/ws/p2p/12D3KooWELgzaRZqsHNyUodhZZF7A1ydsRpgLsY7fojDegKni4YF    
2024-04-29 07:48:34 ⚙️  Syncing, target=#137399 (9 peers), best: #1000 (0x9e8f…55ab), finalized #512 (0x0a9a…875a), ⬇ 316.3kiB/s ⬆ 14.2kiB/s    
2024-04-29 07:48:39 ⚙️  Syncing 235.4 bps, target=#137399 (9 peers), best: #2177 (0x5828…e9da), finalized #2048 (0x2f65…3b2e), ⬇ 113.3kiB/s ⬆ 5.5kiB/s    
2024-04-29 07:48:43 [3097] 💸 generated 8 npos targets    
2024-04-29 07:48:43 [3097] 💸 generated 8 npos voters, 8 from validators and 0 nominators    
2024-04-29 07:48:43 [#3097] 🗳  creating a snapshot with metadata SolutionOrSnapshotSize { voters: 8, targets: 8 }    
2024-04-29 07:48:43 [#3097] 🗳  Starting phase Signed, round 1.    
2024-04-29 07:48:44 [#3277] 🗳  Starting phase Unsigned((true, 3277)), round 1.    
2024-04-29 07:48:44 [#3278] 🗳  queued unsigned solution with score ElectionScore { minimal_stake: 184467440819699, sum_stake: 184467440819699, sum_stake_squared: 34028236722569152873026450601 }    
2024-04-29 07:48:44 ⚙️  Syncing 236.0 bps, target=#137400 (10 peers), best: #3357 (0x0c50…7d21), finalized #3072 (0x2803…c15b), ⬇ 244.0kiB/s ⬆ 20.2kiB/s    
2024-04-29 07:48:44 [#3457] 🗳  Starting phase Off, round 2.    
2024-04-29 07:48:44 [3457] 💸 new validator set of size 1 has been processed for era 1    
2024-04-29 07:48:49 ⚙️  Syncing 206.2 bps, target=#137400 (10 peers), best: #4388 (0x2d3d…6b93), finalized #4177 (0x58f8…9518), ⬇ 261.5kiB/s ⬆ 11.6kiB/s    
2024-04-29 07:48:54 ⚙️  Syncing 232.0 bps, target=#137400 (10 peers), best: #5548 (0x1aef…1c46), finalized #5120 (0x274f…e5d7), ⬇ 122.7kiB/s ⬆ 6.9kiB/s    
2024-04-29 07:48:59 ⚙️  Syncing 118.2 bps, target=#137400 (10 peers), best: #6139 (0x9e52…af00), finalized #5632 (0x5297…a001), ⬇ 66.5kiB/s ⬆ 4.9kiB/s    
2024-04-29 07:49:04 ⚙️  Syncing 185.7 bps, target=#137401 (10 peers), best: #7068 (0x911d…666a), finalized #6656 (0xdd79…2e5e), ⬇ 80.7kiB/s ⬆ 1.5kiB/s    
2024-04-29 07:49:05 [7417] 💸 generated 9 npos targets    
2024-04-29 07:49:05 [7417] 💸 generated 9 npos voters, 9 from validators and 0 nominators    
2024-04-29 07:49:05 [#7417] 🗳  creating a snapshot with metadata SolutionOrSnapshotSize { voters: 9, targets: 9 }    
2024-04-29 07:49:05 [#7417] 🗳  Starting phase Signed, round 2.    
2024-04-29 07:49:06 [#7597] 🗳  Starting phase Unsigned((true, 7597)), round 2.    
2024-04-29 07:49:06 [#7598] 🗳  queued unsigned solution with score ElectionScore { minimal_stake: 184447246591607, sum_stake: 1475577972732856, sum_stake_squared: 272166294201800640629142739592 }    
2024-04-29 07:49:07 [#7777] 🗳  Finalized election round with compute Unsigned.    
2024-04-29 07:49:07 [#7777] 🗳  Starting phase Off, round 3.    
2024-04-29 07:49:07 [7777] 💸 new validator set of size 8 has been processed for era 2    
2024-04-29 07:49:09 ⚙️  Syncing 206.2 bps, target=#137401 (10 peers), best: #8099 (0x559a…9c2e), finalized #7680 (0x84b6…abc0), ⬇ 103.9kiB/s ⬆ 0.9kiB/s    
2024-04-29 07:49:14 ⚙️  Syncing 204.4 bps, target=#137401 (10 peers), best: #9121 (0xf95e…5a17), finalized #8704 (0x6e49…33cd), ⬇ 98.0kiB/s ⬆ 1.5kiB/s
```