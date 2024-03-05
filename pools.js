const Cosmos = {
  name: "Cosmos Hub",
  chainId: "cosmoshub-4",
  val_name: "cosmoshub",
  runtime: "@kyvejs/tendermint-bsync",
  datasource: "Self hosted Gaia full node (cosmoshub-4)",
  start_data: "height 5,200,791",
  storage_provider: "Bundlr",
  networks: {
    Mainnet: 0,
    Kaon: 0,
    Korellia: 24,
  },
  requirements: [
    "2 or more physical CPU cores",
    "16 GB RAM",
    "512 GB DISK",
    "50mbps network bandwith",
  ],
  hex: "#1c2049",
  logo: "ar://GSK9zAQx1jOnQIhbM20qCoOFYT3EJXIJfwfvT_QhLVM",
  description:
    "Serving as the economic center of the Interchain, the Cosmos Hub is a blockchain that provides vital ecosystem services. The primary token of the Cosmos Hub is the ATOM, but the Hub will support many tokens in the future.",
};

const Osmosis = {
  name: "Osmosis",
  chainId: "osmosis-1",
  val_name: "osmosis",
  runtime: "@kyvejs/tendermint",
  datasource: "Self hosted Osmosis full node (osmosis-1)",
  start_data: "Genesis",
  storage_provider: "Bundlr",
  networks: {
    Mainnet: 1,
    Kaon: 1,
    Korellia: 30,
  },
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "1 TB DISK",
    "100mbps network bandwith",
  ],
  hex: "#8d07c7",
  logo: "ar://u8kGlBx37seQCO1X5vQsc3Q8iO2CE-BHqsm0937poak",
  description:
    "Osmosis, dubbed the Interchain Liquidity Lab, is a decentralized exchange (DEX) for Cosmos, an ecosystem of sovereign, interoperable blockchains all connected trustlessly over IBC, the Inter-Blockchain Communication Protocol.",
  binaryVersion: "v3.1.0",
  goVersion: "go15",
  binaryName: "osmosisd",
  binaryDownload: "https://github.com/osmosis-labs/osmosis/releases/tag/v3.1.0",
  installInstructions: "https://docs.osmosis.zone/osmosis-core/osmosisd/",
};

const Archway = {
  name: "Archway",
  chainId: "archway-1",
  val_name: "archway",
  runtime: "@kyvejs/tendermint",
  datasource: "Self hosted Archway full node (archway-1)",
  start_data: "Genesis",
  storage_provider: "Bundlr",
  networks: {
    Mainnet: 2,
    Kaon: 2,
    Korellia: 31,
  },
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "1 TB DISK",
    "100mbps network bandwith",
  ],
  hex: "#e45121",
  logo: "ar://hKb8dVx4E1NCUJ_BlhNOcyfQEta5r38SBXqsfPnAsWE",
  description:
    "Archway is a Cosmos-native incentivized smart contract chain that enables developers to deploy high-performance dapps that earn rewards based on the traffic they bring to the network. As developers build and launch impactful dapps, they receive a proportional share of network fees, inflation, and premiums. At its core, Archway is designed to enable developers to capture the value they create through sustainable economic models built into the blockchain.",
  binaryVersion: "v1.0.1",
  goVersion: "go19",
  binaryName: "archwayd",
  binaryDownload:
    "https://github.com/archway-network/archway/releases/tag/v1.0.1",
  installInstructions:
    "https://docs.archway.io/validators/running-a-node/join-a-network/sync-from-genesis",
  genesisFile:
    "https://github.com/archway-network/networks/raw/main/archway/genesis/genesis.json.gz",
  seed: "3ba7bf08f00e228026177e9cdc027f6ef6eb2b39@35.232.234.58:26656",
};

const ArchwaySSync = {
  ...Archway,
  name: "Archway // State-Sync",
  val_name: "archway-ssync",
  runtime: "@kyvejs/tendermint-ssync",
  datasource: "KSYNC (over serve-snapshots)",
  start_data: "state-sync snapshots every 3,000 blocks",
  networks: {
    Mainnet: 4,
    Kaon: 4,
  },
  blockPoolId: 2,
  nodeName: "Archway",
  configName: ".archway",
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "150 GB DISK",
    "100mbps network bandwith",
  ],
};

const Axelar = {
  name: "Axelar",
  chainId: "axelar-dojo-1",
  val_name: "axelar",
  runtime: "@kyvejs/tendermint",
  datasource: "Self hosted Axelar full node (axelar-dojo-1)",
  start_data: "Genesis",
  storage_provider: "Bundlr",
  networks: {
    Mainnet: 3,
    Kaon: 3,
    Korellia: 36,
  },
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "1 TB DISK",
    "100mbps network bandwith",
  ],
  hex: "#5cc1fa",
  logo: "ar://iW1jN99yH_gdQtRhf5J_lVwOIu8p_i7FyxEgoQAkWxU",
  description:
    "Axelar is the programmable Web3 interoperability platform, connecting over 50 blockchains via a secure, scalable network – internet infrastructure for the world’s next super app. For partners ranging from Uniswap to Circle, Axelar enables scalable cross-chain solutions. Users interact with any asset in one click. Developers span multiple blockchains as though building on one, supported by a simple API and a permissionless ecosystem of tools and service providers. Backers include Binance, Coinbase, Dragonfly, Galaxy and Polychain. See what full-stack interoperability can do for your dApp. Learn more at https://axelar.network.",
  binaryVersion: "v0.10.7",
  goVersion: "go16",
  binaryName: "axelard",
  binaryDownload:
    "https://github.com/axelarnetwork/axelar-core/releases/tag/v0.10.7",
  installInstructions: "https://docs.axelar.dev/node/join-genesis",
  genesisFile:
    "https://s3.eu-central-1.amazonaws.com/files.kyve.network/infrastructure/axelar/genesis.json.gz",
  seed: "ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:15156,3d67d0646cddcc203b41434aceea64ade22ba6fc@k8s-mainnet-axelarco-79b464ee93-f03cb16c57cf7cb2.elb.us-east-2.amazonaws.com:26656,609504b517f88f628e98d4a918ffc69e9654b451@65.108.192.147:26656,691101434ca4016b28e6a9943da2ad6838b80685@axelar-seed.pops.one:26656,44596cd8c8fd80be909a5968ac4ba6651d840b36@axelar-seed.validatrium.com:6969",
};

const Cronos = {
  name: "Cronos",
  chainId: "cronosmainnet_25-1",
  val_name: "cronos",
  runtime: "@kyvejs/tendermint",
  datasource: "Self hosted Cronos full node (cronosmainnet_25-1)",
  start_data: "Genesis",
  storage_provider: "Bundlr",
  networks: {
    Mainnet: 5,
    Kaon: 6,
    Korellia: 36,
  },
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "1.5 TB DISK",
    "100mbps network bandwith",
  ],
  hex: "#191b34",
  logo: "ar://BbNmwRFv11y68Jiele3wxZNYQTqRVn_ZK6BwJ5S2MCE",
  description:
    "Cronos (cronos.org) is the leading Ethereum-compatible layer 1 blockchain network built on the Cosmos SDK, supported by Crypto.com, Crypto.org, and more than 500 app developers and partners. Today, the #CROfam ecosystem represents an addressable user base of more than 80 million people worldwide. Our mission is to make it easy and safe for the next billion crypto users to adopt Web3, with a focus on decentralized applications in the DeFi, NFTs and GameFi verticals.",
  binaryVersion: "v0.6.11",
  goVersion: "go17",
  binaryName: "cronosd",
  binaryDownload:
    "https://github.com/crypto-org-chain/cronos/releases/tag/v0.6.11",
  installInstructions:
    "https://docs.cronos.org/for-node-hosts/running-nodes/cronos-mainnet",
  genesisFile:
    "https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet_25-1/genesis.json",
  seed: "0d5cf1394a1cfde28dc8f023567222abc0f47534@cronos-seed-0.crypto.org:26656,3032073adc06d710dd512240281637c1bd0c8a7b@cronos-seed-1.crypto.org:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@cronos-seed-2.crypto.org:26656,337377dcda43d79c537d2c4d93ad3b698ce9452e@bd-cronos-mainnet-seed-node-01.bdnodes.net:26656",
};

const CronosSSync = {
  ...Cronos,
  name: "Cronos // State-Sync",
  val_name: "cronos-ssync",
  runtime: "@kyvejs/tendermint-ssync",
  datasource: "Self hosted Cronos full node (cronosmainnet_25-1)",
  start_data: "state-sync snapshots every 5,000 blocks",
  networks: {
    Mainnet: 6,
    Kaon: 7,
    Korellia: 37,
  },
  nodeName: "Cronos",
  blockPoolId: 5,
  configName: ".cronos",
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "150 GB DISK",
    "100mbps network bandwith",
  ],
};

const Noble = {
  name: "Noble",
  chainId: "noble-1",
  val_name: "noble",
  runtime: "@kyvejs/tendermint",
  datasource: "Self hosted Noble full node (noble-1)",
  start_data: "Genesis",
  storage_provider: "Bundlr",
  networks: {
    Mainnet: 7,
    Kaon: 12,
    Korellia: 45,
  },
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "1 TB DISK",
    "100mbps network bandwith",
  ],
  hex: "#0e1225",
  logo: "ar://DZP1WPGja9LAa7Vf1P2N-dfDVUlG9lmCkD_psZj47tU",
  description:
    "Noble is a Cosmos application-specific blockchain purpose-built for native asset issuance. Noble brings the efficiency and interoperability of native assets to the wider Cosmos ecosystem, starting with USDC. Noble’s vision is to be the world’s premier issuance hub for digital assets that connect to other blockchains seamlessly. Noble leverages the Cosmos-SDK – a flexible toolkit that allows developers to incorporate existing modules and to seamlessly integrate custom modules that add virtually unlimited functionality for asset issuers on the Noble blockchain.",
  binaryVersion: "v1.0.0",
  goVersion: "go19",
  binaryName: "nobled",
  binaryDownload: "https://github.com/noble-assets/noble/releases/tag/v1.0.0",
  installInstructions: "https://docs.nobleassets.xyz/network/running",
  genesisFile:
    "https://raw.githubusercontent.com/strangelove-ventures/noble-networks/main/mainnet/noble-1/genesis.json",
  seed: "20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:21590",
};

const NobleSSync = {
  ...Noble,
  name: "Noble // State-Sync",
  val_name: "noble-ssync",
  runtime: "@kyvejs/tendermint-ssync",
  datasource: "Self hosted Cronos full node (noble-1)",
  start_data: "state-sync snapshots every 3,000 blocks",
  networks: {
    Mainnet: 8,
    Kaon: 12,
    Korellia: 46,
  },
  nodeName: "Noble",
  blockPoolId: 7,
  configName: ".noble",
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "150 GB DISK",
    "100mbps network bandwith",
  ],
};

export default [
  Cosmos,
  Osmosis,
  Archway,
  ArchwaySSync,
  Axelar,
  Cronos,
  CronosSSync,
  Noble,
  NobleSSync,
];
