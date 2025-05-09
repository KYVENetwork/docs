import axios from "axios";
import { load } from "js-yaml";

const Cosmos = {
  name: "Cosmos Hub",
  chainId: "cosmoshub-4",
  val_name: "cosmoshub",
  runtime: "@kyvejs/tendermint-bsync",
  datasource: "Self hosted Gaia full node (cosmoshub-4)",
  start_data: "height 5,200,791",
  storage_provider: "Irys",
  configName: ".cosmos",
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
};

const Osmosis = {
  name: "Osmosis",
  chainId: "osmosis-1",
  val_name: "osmosis",
  runtime: "@kyvejs/tendermint",
  datasource: "Self hosted Osmosis full node (osmosis-1)",
  start_data: "Genesis",
  storage_provider: "Irys",
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
  binaryVersion: "v3.1.0",
  goVersion: "go15",
  binaryName: "osmosisd",
  configName: ".osmosis",
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
  storage_provider: "Irys",
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
  binaryVersion: "v1.0.1",
  goVersion: "go19",
  nodeName: "Archway",
  configName: ".archway",
  binaryName: "archwayd",
  binaryDownload:
    "https://github.com/archway-network/archway/releases/tag/v1.0.1",
  installInstructions:
    "https://docs.archway.io/validators/running-a-node/join-a-network/sync-from-genesis",
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
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "150 GB DISK",
    "100mbps network bandwith",
  ],
};

const Avail = {
  name: "Avail",
  logo: "ar://fvncwI5IqQfDBcOtkL2kad3RgwwEjEamdrofPt9cDm4",
  val_name: "avail",
  runtime: "@kyvejs/avail",
  datasource: "Self hosted Avail Mainnet archive node",
  start_data: "Blocks and Data Submissions starting from Genesis",
  networks: {
    Korellia: 156,
  },
  requirements: [
    "8 or more physical CPU cores",
    "16 GB RAM",
    "200 GB DISK",
    "100mbps network bandwith",
  ],
  integrations: [],
  description:
      "The goal of this pool is to validate and archive all Avail blocks and data submissions in a decentralized and permanent manner. By leveraging Arweave and Irys for long-term storage, this data becomes a \n" +
      "public good for developers and researchers. The pool ensures reliable access to the full history of the Avail blockchain, supporting transparency, data analysis, and long-term verifiability \n" +
      "of the network's activity.",
};

const Axelar = {
  name: "Axelar",
  chainId: "axelar-dojo-1",
  val_name: "axelar",
  runtime: "@kyvejs/tendermint",
  datasource: "Self hosted Axelar full node (axelar-dojo-1)",
  start_data: "Genesis",
  storage_provider: "Irys",
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
  binaryVersion: "v0.10.7",
  goVersion: "go16",
  binaryName: "axelard",
  configName: ".axelar",
  binaryDownload:
    "https://github.com/axelarnetwork/axelar-core/releases/tag/v0.10.7",
  installInstructions: "https://docs.axelar.dev/node/join-genesis",
  seed: "ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:15156,3d67d0646cddcc203b41434aceea64ade22ba6fc@k8s-mainnet-axelarco-79b464ee93-f03cb16c57cf7cb2.elb.us-east-2.amazonaws.com:26656,609504b517f88f628e98d4a918ffc69e9654b451@65.108.192.147:26656,691101434ca4016b28e6a9943da2ad6838b80685@axelar-seed.pops.one:26656,44596cd8c8fd80be909a5968ac4ba6651d840b36@axelar-seed.validatrium.com:6969",
};

const Cronos = {
  name: "Cronos",
  chainId: "cronosmainnet_25-1",
  val_name: "cronos",
  runtime: "@kyvejs/tendermint",
  datasource: "Self hosted Cronos full node (cronosmainnet_25-1)",
  start_data: "Genesis",
  storage_provider: "Irys",
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
  binaryVersion: "v0.6.11",
  goVersion: "go17",
  nodeName: "Cronos",
  configName: ".cronos",
  binaryName: "cronosd",
  binaryDownload:
    "https://github.com/crypto-org-chain/cronos/releases/tag/v0.6.11",
  installInstructions:
    "https://docs.cronos.org/for-node-hosts/running-nodes/cronos-mainnet",
  seed: "0d5cf1394a1cfde28dc8f023567222abc0f47534@cronos-seed-0.crypto.org:26656,3032073adc06d710dd512240281637c1bd0c8a7b@cronos-seed-1.crypto.org:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@cronos-seed-2.crypto.org:26656,337377dcda43d79c537d2c4d93ad3b698ce9452e@bd-cronos-mainnet-seed-node-01.bdnodes.net:26656",
};

const CronosSSync = {
  ...Cronos,
  name: "Cronos // State-Sync",
  val_name: "cronos-ssync",
  runtime: "@kyvejs/tendermint-ssync",
  datasource: "KSYNC (over serve-snapshots)",
  start_data: "state-sync snapshots every 5,000 blocks",
  networks: {
    Mainnet: 6,
    Kaon: 7,
    Korellia: 37,
  },
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
  storage_provider: "Irys",
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
  binaryVersion: "v1.0.0",
  goVersion: [
    ["v1.0.0", "go19"],
    ["v2.0.0", "go19"],
    ["v3.0.0", "go19"],
    ["v3.1.0", "go19"],
    ["v4.0.1", "go21"],
  ],
  nodeName: "Noble",
  configName: ".noble",
  binaryName: "nobled",
  binaryDownload: "https://github.com/noble-assets/noble/releases/tag/v1.0.0",
  installInstructions: "https://docs.nobleassets.xyz/network/running",
  seed: "20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:21590",
};

const NobleSSync = {
  ...Noble,
  name: "Noble // State-Sync",
  val_name: "noble-ssync",
  runtime: "@kyvejs/tendermint-ssync",
  datasource: "KSYNC (over serve-snapshots)",
  start_data: "state-sync snapshots every 3,000 blocks",
  networks: {
    Mainnet: 8,
    Kaon: 12,
    Korellia: 46,
  },
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "150 GB DISK",
    "100mbps network bandwith",
  ],
};

const Celestia = {
  name: "Celestia",
  chainId: "celestia",
  val_name: "celestia",
  runtime: "@kyvejs/tendermint",
  datasource: "Self hosted Celestia full node (celestia)",
  start_data: "Genesis",
  storage_provider: "Irys",
  networks: {
    Mainnet: 9,
    Kaon: 14,
    Korellia: 70,
  },
  requirements: [
    "4 or more physical CPU cores",
    "32 GB RAM",
    "1 TB DISK",
    "100mbps network bandwith",
  ],
  binaryVersion: "v1.7.0",
  goVersion: [["v1.7.0", "go22"]],
  nodeName: "Celestia",
  configName: ".celestia-app",
  binaryName: "celestia-appd",
  binaryDownload:
    "https://github.com/celestiaorg/celestia-app/releases/tag/v1.7.0",
  installInstructions: "https://docs.celestia.org/nodes/consensus-node",
  seed: "6de4ce5baa9d2bed33c0c53b9518b907cfaab33b@65.108.128.201:11656",
  configToml: {
    description:
      "Due to the size of the block_results response and because Celestia disables the storage of block results by default, ",
    code: 'discard_abci_responses = false\ntimeout_broadcast_tx_commit = "120s"',
  },
  appToml:
    'pruning = "everything"\nindex-events = [""]\n\n[state-sync]\n\nsnapshot-interval = 0\nsnapshot-keep-recent = 0',
};

const CelestiaSSync = {
  ...Celestia,
  name: "Celestia // State-Sync",
  val_name: "celestia-ssync",
  runtime: "@kyvejs/tendermint-ssync",
  datasource: "KSYNC (over serve-snapshots)",
  start_data: "state-sync snapshots every 3,000 blocks",
  networks: {
    Mainnet: 10,
    Kaon: 15,
  },
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "150 GB DISK",
    "100mbps network bandwith",
  ],
};

const EthereumBlobs = {
  name: "Ethereum // Blobs",
  logo: "ar://Ui5fULe72VfEKo5reeGKvGXF_5HOuAIfdaOM7fXjVyA",
  val_name: "ethereum-blobs",
  runtime: "@kyvejs/ethereum-blobs",
  datasource: "Self hosted Ethereum full node (Lighthose & Geth)",
  start_data: "Blobs starting from the Dencun upgrade",
  networks: {
    Kaon: 20,
    Korellia: 97,
  },
  requirements: [
    "8 or more physical CPU cores",
    "16 GB RAM",
    "2 TB DISK",
    "100mbps network bandwith",
  ],
  integrations: [],
  description:
    "Data blobs are a fresh approach to optimizing transaction data storage on L2 networks within Ethereum. They are inexpensive and temporary memory carrying data about transactions, called blob-carrying transactions. These blobs are designed to make the verification of these transactions more efficient.",
};

const dYdX = {
  name: "dYdX",
  chainId: "dydx-mainnet-1",
  val_name: "dydx",
  runtime: "@kyvejs/tendermint",
  datasource: "Self hosted dYdX full node (dydx-mainnet-1)",
  start_data: "Genesis",
  storage_provider: "Irys",
  networks: {
    Mainnet: 13,
    Kaon: 8,
  },
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "1 TB DISK",
    "100mbps network bandwith",
  ],
  binaryVersion: "v2.0.1",
  goVersion: [],
  nodeName: "dYdX",
  configName: ".dydxprotocol",
  binaryName: "dydxprotocold",
  binaryDownload:
    "https://github.com/dydxprotocol/v4-chain/releases/tag/protocol/v2.0.1",
  installInstructions:
    "https://docs.dydx.exchange/infrastructure_providers-validators/set_up_full_node",
  seed: "ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:23856",
};

const Andromeda = {
  name: "Andromeda",
  chainId: "andromeda-1",
  val_name: "andromeda",
  runtime: "@kyvejs/tendermint",
  datasource: "Self hosted Andromeda full node (andromeda-1)",
  start_data: "Genesis",
  storage_provider: "Irys",
  networks: {
    Mainnet: 14,
    Kaon: 33,
  },
  requirements: [
    "8 or more physical CPU cores",
    "32 GB RAM",
    "1 TB DISK",
    "100mbps network bandwith",
  ],
  binaryVersion: "v0.1.1-beta-patch",
  goVersion: [],
  nodeName: "andromeda",
  configName: ".andromeda",
  binaryName: "andromedad",
  binaryDownload:
    "https://github.com/andromedaprotocol/andromedad/releases/tag/v0.1.1-beta-patch",
  installInstructions:
    "https://docs.andromedaprotocol.io/andromeda/chain/running-a-node",
  seed: "ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:21256",
};

const pools = [
  Cosmos,
  Osmosis,
  Archway,
  ArchwaySSync,
  Avail,
  Axelar,
  Cronos,
  CronosSSync,
  Noble,
  NobleSSync,
  Celestia,
  CelestiaSSync,
  EthereumBlobs,
  dYdX,
  Andromeda,
];

export default pools;

const loadRegistry = async () => {
  try {
    const { data } = await axios.get(
      "https://raw.githubusercontent.com/KYVENetwork/source-registry/main/.github/registry.yml"
    );
    const parsedRegistry = load(data);
    for (const pool of pools) {
      try {
        const source = parsedRegistry[pool.chainId];
        pool.hex = source["networks"]["kyve-1"]["properties"]["hex"];
        pool.logo = source["networks"]["kyve-1"]["properties"]["logo"];
        pool.description =
          source["networks"]["kyve-1"]["properties"]["description"];
        pool.genesisFile =
          source["codebase"]["settings"]["cosmos-properties"]["genesis-url"];
        if (source["networks"]["kyve-1"]["integrations"]["ksync"]) {
          pool.binaryName =
            source["networks"]["kyve-1"]["integrations"]["ksync"][
              "binary-name"
            ];

          // check if the source has a state sync pool
          pool.integrations = [];
          if (
            source["networks"]["kyve-1"].pools.find((p) =>
              p.runtime.includes("ssync")
            )
          ) {
            pool.integrations.push("State-Sync", "Height-Sync");
          }
          pool.integrations.push("Block-Sync");
        }
      } catch {}
    }
  } catch (e) {
    console.log("Faild to load registry!");
    console.log(e);
  }
};

export async function updatePoolsPlugin(context, options) {
  return {
    name: "docusuaurs-updatepools",
    async loadContent() {
      await loadRegistry();
      if (context.siteConfig && context.siteConfig.customFields)
        context.siteConfig.customFields.pools = pools;
    },
    getPathsToWatch() {
      return [`pools.js`];
    },
  };
}
