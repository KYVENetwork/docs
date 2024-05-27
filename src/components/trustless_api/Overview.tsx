import { Card } from "../Card";
import React, { useEffect } from "react";
import sal from "sal.js";

const TrustlessAPIOverview = () => {
  useEffect(() => {
    sal();
  }, []);

  const CARDS_DETAILED = [
    {
      title: "How to use",
      img: "",
      href: "/developers/data_engineers/accessing_data/trustless_api/how_to_use",
      desc: "This section describes how to use the Trustless API and how to access the endpoint by KYVE.",
    },
    {
      title: "Trustless Client",
      img: "",
      href: "/developers/data_engineers/accessing_data/trustless_api/trustless_client",
      desc: "This section describes the usage of the Trustless Client, enabling a seamless integration of the Trustless API.",
    },
    {
      title: "Implementation",
      img: "",
      href: "/developers/data_engineers/accessing_data/trustless_api/implementation",
      desc: "This section describes the implementation details of the Trustless API.",
    },
    {
      title: "Run Your Own API Endpoint",
      img: "",
      href: "/developers/data_engineers/accessing_data/trustless_api/run_trustless_api",
      desc: "This section describes how to spin up and run an own Trustless API endpoint.",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 mt-8">
        {CARDS_DETAILED.map((x, i) => (
          <div
            className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1"
            key={i}
          >
            <Card
              href={x.href}
              img={x.img}
              className="p-8"
              delay={(i % 4) * 150}
            >
              <div className="font-bold text-3xl mt-16">{x.title}</div>
              <div className="mt-4">{x.desc}</div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustlessAPIOverview;
