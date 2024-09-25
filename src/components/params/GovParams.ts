import React, { useEffect, useState } from "react";
import axios from "axios";

export const GovParam = ({
  render,
}: {
  render: (params: any) => React.ReactNode;
}): React.ReactNode => {
  const [params, setParams] = useState();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://api.kyve.network/cosmos/gov/v1/params/voting"
      );
      setParams(data);
    })();
  }, []);

  if (!params) return;

  return render(params);
};

export const StringToMinutes = (str: string) => {
  const minutes = parseInt(str.replace("s", ""));
  return minutes / 60;
};

export const StringToDays = (str: string) => {
  const days = parseInt(str.replace("d", ""));
  return days / 60 / 60 / 24;
};

export const DepositToKYVE = (deposit: { denom: string; amount: string }[]) => {
  const amount = (parseInt(deposit[0].amount) / 10 ** 6).toLocaleString();
  return amount + " $KYVE";
};

export const StringToPercent = (str: string) => {
  const percent = parseFloat(str);
  return percent * 100 + "%";
};
