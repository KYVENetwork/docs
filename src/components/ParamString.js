import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ParamString = ({ url, param }) => {
  const ERROR_MSG = "error";

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => setData(data.params[param]))
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
      <strong>{data}</strong>
    </div>
  );
};

export default ParamString;
