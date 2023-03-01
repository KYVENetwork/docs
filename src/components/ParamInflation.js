import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ParamInflation = ({ networkUrl }) => {
  const ERROR_MSG = "error";

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${networkUrl}/cosmos/mint/v1beta1/inflation`)
      .then(({ data }) =>
        setData((parseFloat(data.inflation) * 100).toFixed(2))
      )
      .catch(() => setData(ERROR_MSG));
  }, []);

  if (!data) {
    return <div>-</div>;
  }

  if (data === ERROR_MSG) {
    return <div>-</div>;
  }

  return (
    <div>
      <strong>{data}</strong> %
    </div>
  );
};

export default ParamInflation;
