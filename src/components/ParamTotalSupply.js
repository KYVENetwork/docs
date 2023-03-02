import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BigNumber from "bignumber.js";

export const toHumanReadable = (amount) => {
  const fmt = new BigNumber(amount || "0").toFixed(0, 1);

  return fmt.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ParamTotalSupply = ({ networkUrl, denom, decimals }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${networkUrl}/cosmos/bank/v1beta1/supply`)
      .then(({ data }) => {
        const amount = new BigNumber(
          data.supply.find((s) => s.denom === denom).amount
        ).dividedBy(new BigNumber(10).exponentiatedBy(decimals));

        setData(toHumanReadable(amount.toString(10)));
      })
      .catch(() => setData("-"));
  }, []);

  if (!data) {
    return <div>-</div>;
  }

  return (
    <div>
      <strong>{data}</strong> $KYVE
    </div>
  );
};

export default ParamTotalSupply;
