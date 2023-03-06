---
sidebar_position: 1
---

# Airbyte Local Deployment

In this step, we'll deploy Airbyte locally on your machine. Make sure you have installed Docker and Docker Compose on
your system as shown in the [Overview section](overview.md).

To deploy Airbyte locally, run the following commands in your terminal:

```sh
  git clone https://github.com/KYVENetwork/airbyte.git
```
```sh
  cd DataPipeline
```
```sh
  docker-compose up
```

After the deployment is complete, you'll be able to access the Airbyte UI at <http://localhost:8000/>.
The default credentials are:

```sh
BASIC_AUTH_USERNAME=airbyte
BASIC_AUTH_PASSWORD=password
```

When you first access the Website, you will be directed to the onboarding screen. You can submit your email address to receive Airbyte notifications.
Enter your email address and proceed if you wish.

<img  src="/img/elt/airbyte_preferences.png" width="500px;" />