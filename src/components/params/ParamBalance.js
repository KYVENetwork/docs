import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BigNumber from "bignumber.js";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const toHumanReadable = (amount) => {
  const fmt = new BigNumber(amount || "0").toFixed(0, 1);

  return fmt.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ParamBalance = ({
  network = "mainnet",
  module,
  param,
  project = "kyve",
  version = "v1beta1",
}) => {
  const { siteConfig, errorMsg } = useDocusaurusContext();
  const {
    customFields: {
      [network]: { rest, decimals },
    },
  } = siteConfig;

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${rest}/${project}/${module}/${version}/params`)
      .then(({ data: { params } }) => {
        const amount = new BigNumber(params[param]).dividedBy(
          new BigNumber(10).exponentiatedBy(decimals)
        );

        setData(toHumanReadable(amount.toString(10)));
      })
      .catch(() => setData(errorMsg));
  }, []);

  if (!data) {
    return <span>-</span>;
  }

  if (data === errorMsg) {
    return <span>-</span>;
  }

  return (
    <span>
      <strong>{data}</strong> \$KYVE
    </span>
  );
};

export default ParamBalance;
