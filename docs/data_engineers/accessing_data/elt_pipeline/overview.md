---
sidebar_position: 0
---

# Overview

The KYVE Data Pipeline enables easy import of KYVE data into any data warehouse or destination
supported by [Airbyte](https://airbyte.com/). With the [ELT](https://en.wikipedia.org/wiki/Extract,_load,_transform)
format, data analysts and engineers can now confidently source KYVE data without worrying about its validity or
reliability.

The sections that follow were created to help you set up a local environment for testing KYVE's Data Pipeline.

## System Requirements

To experiment with the ELT pipeline via [Airbyte](https://airbyte.com/) let's first ensure your computer is configured correctly.

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

1. Make sure you have Docker Desktop installed. If not you can install it with Homebrew in your Terminal:

   ```sh
   brew install --cask docker
   ```

### Linux

1. In order to install Docker and `docker-compose` on Linux, please follow the instructions
   listed [here](https://docs.docker.com/engine/install/) and choose your Linux distribution. Remember to also run the post-installation steps listed [here](https://docs.docker.com/engine/install/linux-postinstall/).
