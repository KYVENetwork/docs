---
sidebar_position: 0
---

# Overview

The KYVE Data Pipeline enables easy import of KYVE data into any data warehouse or destination
supported by [Airbyte](https://airbyte.com/). With the [ELT](https://en.wikipedia.org/wiki/Extract,_load,_transform)
format, data analysts and engineers can now confidently source KYVE data without worrying about its validity or
reliability.

The sections that follow were created to help you understand how to setup the KYVE source connector of Airbyte in order to retrieve data. There are two options that you can test the ELT connector of KYVE.

## Airbyte Local Deployment

For users that wants to experiment locally with the KYVE data it is recommended the Local Deployment approach of Airbyte. This option requires some configuration steps in order to run locally the Airbyte app. Detailed instructions are presented in [Airbyte Local Deployment](airbyte_local_deployment) section.

## Airbyte Cloud

You can connect to the [Airbyte Cloud](https://airbyte.com/airbyte-cloud) platform and try the [KYVE Source Connector](https://cloud.airbyte.com/workspaces/2a2bfca3-c289-48af-a11d-1a9ad69ea187/source/new-source/60a1efcc-c31c-4c63-b508-5b48b6a9f4a6).

This option does not require any local setup. For setting up a destination follow the documentation in the Airbyte cloud page. For example, the [Snowflake](elt_destinations/snowflake) section presents one such destination that could be used with cloud.
