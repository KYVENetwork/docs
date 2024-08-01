---
sidebar_position: 1
---

# Airbyte Local Deployment

## System Requirements

To experiment with the ELT pipeline via local [Airbyte](https://airbyte.com/) instance, let's first ensure your computer is configured correctly.

### Mac

1. Make sure you have Homebrew installed. If not you can follow the instructions listed [here](https://brew.sh/).

2. Make sure you have Docker Desktop installed. If not you can install it with Homebrew in your terminal:

   ```sh
   brew install --cask docker
   ```

### Linux

1. In order to install Docker and `docker-compose` on Linux, please follow the instructions
   listed [here](https://docs.docker.com/engine/install/) and choose your Linux distribution. Remember to also run the post-installation steps listed [here](https://docs.docker.com/engine/install/linux-postinstall/).

## Local Deployment

### Prerequisites

In this step, we'll deploy Airbyte locally on your machine. Make sure you have installed Docker and Docker Compose on your system as shown in the [Overview section](overview.md).

To deploy Airbyte locally, check out the KYVE Airbyte fork

```sh
git clone https://github.com/KYVENetwork/airbyte
cd airbyte
git checkout release/0.4.0
```

Then start Airbyte locally by running

```sh
./run-ab-platform.sh
```

After the deployment is complete, you'll be able to access the Airbyte UI at http://localhost:8000.
The default credentials are:

```sh
BASIC_AUTH_USERNAME=airbyte
BASIC_AUTH_PASSWORD=password
```

When you first access the Website, you will be directed to the onboarding screen. Enter an email to proceed.

<img src="/img/elt/airbyte_preferences.png" alt="Airbyte Preferences" width="500px;" />

### 1. Custom-build KYVE connector

Follow these steps to build the connector and load it into Airbyte:

1. Download the latest Docker image based on your OS:

**arm64:**
   ```sh
   docker pull kyve/airbyte:0.4.0-arm64
   ```

**amd64:**
   ```sh
   docker pull kyve/airbyte:0.4.0-amd64
   ```

2. In the Airbyte UI, navigate to the **Settings** > **Sources** > **New connector** > **Add a new Docker connector**.

3. Fill out the fields as follows, then click Add:

   - **Connector display name**: `KYVE:0.4.0`
   - **Docker repository name**: `kyve/airbyte`
   - **Docker image tag**: `0.4.0-arm64` or `0.4.0-amd64`
   - **Connector documentation URL**: `https://docs.kyve.network/`


### 2. Load KYVE connector

You can browse on the `Sources` page and search for the **integrated** KYVE (with the `custom` tag) source named like the specified  Connector display name (e.g. `KYVE:0.4.0`).

### 3. Usage

After loading the KYVE connector, it can be used by creating a new source using the built connector.

:::tip
Make sure to select the **custom** and not the community KYVE connector.
:::

The source requires the following:
- Pool-ID: The ID of the KYVE storage pool you want to load.
- Bundle-Start-ID: The ID of the first bundle that should be loaded,
- KYVE-API URL Base: URL to the KYVE Chain API.
- **[Optional]** Start and end key: Defines, from and to which key the pipeline should start to extract the data.
- **[Optional]** Enable Tendermint normalization: Normalizes block results object and writes each event of begin_block_events, end_block_events and txs_results in one row.

:::caution
If specified, the `Start key` must be higher or equal than the `from_key` of the specified bundle.
:::

:::tip
If you want to load Osmosis data, it is recommended to enable the Tendermint normalization due to its big row size. 
:::