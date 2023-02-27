import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ParamInflation = ({ networkUrl }) => {
  const ERROR_MSG = "err";

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
    return <div>Loading ...</div>;
  }

  if (data === ERROR_MSG) {
    return <div>error</div>;
  }

  return (
    <div>
      <strong>{data}</strong> %
    </div>
  );
};

export default ParamInflation;
