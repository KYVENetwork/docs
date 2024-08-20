import { Card } from "../Card";
import React, { useEffect } from "react";
import sal from "sal.js";

const AccessDatasetsOverview = () => {
  useEffect(() => {
    sal();
  }, []);

  const CARDS_DETAILED = [
    {
      title: "KSYNC",
      img: "",
      href: "/access-data-sets/ksync/overview",
      desc: "KSYNC is a tool capable of syncing blocks and state-sync snapshots from the decentralized KYVE data lake directly into Cosmos blockchain nodes. ",
    },
    {
      title: "Data Pipeline",
      img: "",
      href: "/access-data-sets/data-pipeline/overview",
      desc: "Effortlessly sync and load validated KYVE data from major blockchains into your preferred database.",
    },
    {
      title: "Trustless API",
      img: "",
      href: "/access-data-sets/trustless-api/overview",
      desc: "Instantly connect your applications to trustless, verified historical node data within seconds.",
    },
    {
      title: "REST",
      img: "",
      href: "/access-data-sets/using-rest",
      desc: "Native way to access data that has been stored through KYVE by querying node endpoints.",
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

export default AccessDatasetsOverview;
