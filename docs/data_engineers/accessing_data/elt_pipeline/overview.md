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

You can connect to the [Airbyte Cloud](https://airbyte.com/airbyte-cloud) platform and try the `KYVE Source Connector`.

This option does not require any local setup. For setting up a destination follow the documentation in the Airbyte cloud page. For example, the [Snowflake](elt_destinations/snowflake) section presents one such destination that could be used with cloud.

## FAQ

For common issues and troubleshooting tips, please refer to the [FAQ section](elt_faq).
