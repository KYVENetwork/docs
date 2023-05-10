---
sidebar_position: 1
---

# Airbyte Local Deployment

In this step, we'll deploy Airbyte locally on your machine. Make sure you have installed Docker and Docker Compose on your system as shown in the [Overview section](overview.md).

To deploy Airbyte locally, run the following commands in your terminal:

```sh
git clone https://github.com/KYVENetwork/airbyte.git
```

```sh
cd airbyte
```

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
