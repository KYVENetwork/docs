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

For users who want to experiment locally with the KYVE data it is recommended 
to use the Local Deployment approach of Airbyte. This option requires some 
configuration steps in order to run Airbyte locally. Detailed instructions are 
presented in [Airbyte Local Deployment](airbyte_local_deployment).

## Airbyte Cloud

You can connect to the [Airbyte Cloud](https://airbyte.com/airbyte-cloud) 
platform and use the `KYVE Source Connector`.

This option does not require any local setup. For setting up a destination 
follow the documentation in the Airbyte Cloud page. For example, 
the [Snowflake](elt_destinations/snowflake) section presents one such 
destination that could be used with Airbyte Cloud.

:::caution

The Airbyte integration receives regular updates. These take
some time until they are available in Airbyte Cloud. Therefore, if you need
support for the latest features consider using the Local Deployment until
it's available in Airbyte Cloud.

:::

## FAQ

For common issues and troubleshooting tips, please refer to the [FAQ section](elt_faq).
