---
sidebar_position: 1
---

# Airbyte Local Deployment

## System Requirements

To experiment with the ELT pipeline via local [Airbyte](https://airbyte.com/) instance, let's first ensure your computer is configured correctly.

### Windows

For Windows users, the Windows Subsystem for Linux 2 (WSL2) must be installed. You must be running Windows 10 version
2004 or higher (build 19041 or higher), or Windows 11 to use the commands in this tutorial.

1. Open PowerShell or the Windows Command Prompt in `administrator` mode, then enter the following command to install
   WSL2:

   ```bat
   wsl --install
   ```

   Note: In case the installation command returns _"This application requires the Windows Subsystem for Linux
   Optional Component"_, you should run:

   ```bat
   Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
   ```

2. Restart your machine after installation.

3. To ensure that WSL2 has been installed successfully, run the following command:

   ```bat
   wsl -l -v
   ```

   Expected output:

   ```bat
     NAME                   STATE           VERSION
   * Ubuntu                 Running         2
   ```

4. After you've set up WSL2 successfully, install `Docker desktop on Windows` by following the
   steps [here](https://docs.docker.com/desktop/install/windows-install/).

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

In this step, we'll deploy Airbyte locally on your machine. Make sure you have installed Docker and Docker Compose on your system as shown in the [Overview section](overview.md).

To deploy Airbyte locally, check out the KYVE Airbyte fork

```sh
git clone https://github.com/KYVENetwork/airbyte
cd airbyte
git checkout feat/mainnet-support
```

Then start the server by running

```sh
./run-ab-platform.sh
```

After the deployment is complete, you'll be able to access the Airbyte UI at <http://localhost:8000/>.
The default credentials are:

```sh
BASIC_AUTH_USERNAME=airbyte
BASIC_AUTH_PASSWORD=password
```

When you first access the Website, you will be directed to the onboarding screen. Enter an email to proceed.

<img src="/img/elt/airbyte_preferences.png" alt="Airbyte Preferences" width="500px;" />

You can browse on the `Sources` page and search for the KYVE source.

<img src="/img/elt/airbyte_source_page.png" alt="Airbyte Source Page" />
