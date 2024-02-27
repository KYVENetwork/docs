import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BigNumber from "bignumber.js";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const toHumanReadable = (amount) => {
  const fmt = new BigNumber(amount || "0").toFixed(0, 1);

  return fmt.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ParamCommunityPool = ({ network = "mainnet" }) => {
  const { siteConfig, errorMsg } = useDocusaurusContext();
  const {
    customFields: {
      [network]: { rest, denom, decimals },
    },
  } = siteConfig;

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${rest}/cosmos/distribution/v1beta1/community_pool`)
      .then(({ data }) => {
        const amount = new BigNumber(
          data.pool.find((s) => s.denom === denom).amount
        ).dividedBy(new BigNumber(10).exponentiatedBy(decimals));

        setData(toHumanReadable(amount.toString(10)));
      })
      .catch(() => setData(errorMsg));
  }, []);

  if (!data) {
    return <div>-</div>;
  }

  if (data === errorMsg) {
    return <div>-</div>;
  }

  return (
    <div>
      <strong>{data}</strong> \$KYVE
    </div>
  );
};

export default ParamCommunityPool;
