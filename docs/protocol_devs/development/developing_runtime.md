---
sidebar_position: 7
---

# Developing your own Runtime

## Setup

To get started with developing your own runtime create a fork of KYVE's kyvejs repository (https://github.com/KYVENetwork/kyvejs).

Once checked out you can verify that you can successfully build the project with

```bash
yarn install
yarn setup
```

With that you are ready to start with your custom runtime development.

## Project structure

Before starting it is useful to understand the general structure of the kyvejs monorepo:

```
.kyvejs
├── common
│   ├── protocol
│   ├── sdk
│   └── types
├── tools
│   └── kysor
├── integrations
│   ├── tendermint
│   ├── tendermint-bsync
│   └── <your_runtime>
├── LICENSE
├── README.md
├── lerna.json
├── nx.json
└── package.json
```

Here the following directories have the following roles:

- `.kyvejs` - KYVEJS home directory, contains all packages and monorepo config
- `common` - package directory of KYVE core projects
- `common/protocol` - project containing core functionality for running protocol validators
- `common/sdk` - Typescript development kit for communicating with the KYVE blockchain
- `common/types` - project holding all types for the KYVE application in Typescript
- `tools` - package directory of KYVE tools
- `tools/kysor` - project containing the cosmovisor of KYVE (a supervysor managing KYVE protocol nodes)
- `integrations` - package directory of all KYVE runtimes
- `integrations/tendermint` - project containing the `@kyvejs/tendermint` runtime (recommended to use as an example for implementing your own runtime)
- `integrations/tendermint-bsync` - project containing the `@kyvejs/tendermint-bsync` runtime
- **`integrations/<your_runtime>`** - **this is where you create your runtime with the name `@<fork_name>/<your_runtime>`**
- `LICENSE` - License file for the KYVEJS project
- `README.md` - README of the project
- `lerna.json` - config file for lerna (monorepo settings)
- `nx.json` - config file for nx
- `package.json` - config for project dependencies

## Runtime Template & Structure

The runtime structure generally looks as the following:

```
.<your_runtime>
├── CHANGELOG.md
├── LICENSE
├── README.md
├── package.json
├── src
│   ├── index.ts
│   ├── runtime.ts
│   └── schemas
│       └── data.json
└── tsconfig.json
```

- `.<your_runtime>` - the home directory of your runtime, this is basically a Typescript project
- `CHANGELOG.md` - the changelog of your runtime
- `LICENSE` - the license of your runtime
- `package.json` - your package json file containing runtime dependencies
- `src` - directory holding the source code of your runtime
- `src/index.ts` - the entry file of the runtime, usually only bootstrapping is done here
- `src/runtime.ts` - implementation of the runtime logic
- `src/schemas` - directory holding schemas for data validation (this is not required but depending on the data recommended)
- `src/schemas/data.json` - schema file describing the format of your data. This is usually used in the `prevalidateDataItem` method
- `tsconfig.json` - typescript config file

You can clone a runtime template available [here](https://github.com/KYVENetwork/runtime-template) with

```
git clone https://github.com/KYVENetwork/runtime-template.git integrations
mv integrations/runtime-template integrations/<your_runtime_name>
```

After that paste the latest @kyvejs/protocol version into the runtime's package.json and try to build it with:

```
yarn install
yarn setup
```

If that build succeeds you can start implementing your runtime logic.

## Creating your Data Pool

Since new data pools need to be tested heavily the start their journey on our Devnet Korellia. For that you can use this proposal template and once filled out you have to submit it to the KYVE Core Team via [Discord](https://discord.com/invite/kyve) or [Telegram](https://t.me/KYVENet) so we can vote it through governance.

```json
{
  "messages": [
    {
      "@type": "/kyve.pool.v1beta1.MsgCreatePool",
      "authority": "kyve10d07y265gmmuvt4z0w9aw880jnsr700jdv7nah",
      "name": "<your_pool_name>",
      "runtime": "@<your_fork>/<_your_runtime>",
      "logo": "<your_logo>",
      "config": "{}",
      "start_key": "1",
      "upload_interval": "60",
      "operating_cost": "1000000000",
      "min_delegation": "100000000",
      "max_bundle_size": "100",
      "version": "<your_version>",
      "binaries": "{}",
      "storage_provider_id": 3,
      "compression_id": 1
    }
  ],
  "metadata": "",
  "deposit": "20000000000000tkyve"
}
```

If you're curious how a real [Pool](https://app.korellia.kyve.network/#/pools/30) create proposal looked like on Korellia take a look at the following:

```json
{
  "messages": [
    {
      "@type": "/kyve.pool.v1beta1.MsgCreatePool",
      "authority": "kyve10d07y265gmmuvt4z0w9aw880jnsr700jdv7nah",
      "name": "Osmosis",
      "runtime": "@kyvejs/tendermint",
      "logo": "ar://u8kGlBx37seQCO1X5vQsc3Q8iO2CE-BHqsm0937poak",
      "config": "{\"rpc\":\"http://localhost:26657\",\"network\":\"osmosis-1\"}",
      "start_key": "1",
      "upload_interval": "60",
      "operating_cost": "2500000000",
      "min_delegation": "100000000000",
      "max_bundle_size": "100",
      "version": "1.0.0-beta.2",
      "binaries": "{\"kyve-linux-x64\":\"https://github.com/KYVENetwork/kyvejs/releases/download/%40kyvejs%2Ftendermint%401.0.0-beta.2/kyve-linux-x64.zip\",\"kyve-linux-arm64\":\"https://github.com/KYVENetwork/kyvejs/releases/download/%40kyvejs%2Ftendermint%401.0.0-beta.2/kyve-linux-arm64.zip\"}",
      "storage_provider_id": 3,
      "compression_id": 1
    }
  ],
  "metadata": "",
  "deposit": "20000000000000tkyve"
}
```

## Joining your Pool and testing your Runtime

Once your pool and runtime are ready you can join your pool. For that simply use KYSOR (example [here](https://docs.kyve.network/validators/protocol_nodes/pools/cosmos_hub/installation#install-kyve-protocol-validator)) and follow the steps but just for your pool on Korellia.
