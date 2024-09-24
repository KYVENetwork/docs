import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { Card } from "../components/Card";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import React, { useEffect, useState } from "react";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { useHistory } from "@docusaurus/router";
import Chat from "../components/chat";
import sal from "sal.js";

import KyveMarkup from "../../static/img/homepage/kyve-markup.svg";
import KyveMarkupAnimated from "../../static/img/homepage/kyve-markup-animated.svg";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const histroy = useHistory();
  const [isFirefox, setFirefox] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    sal();
  }, [isFirefox]);

  useEffect(() => {
    setFirefox(navigator.userAgent.toLowerCase().includes("firefox"));

    setShowBanner(localStorage.getItem("banner") != "true");
  }, []);

  const POOLS = (siteConfig.customFields!.pools as PoolCardProps[]).filter(
    (x) => !x.name.includes("State-Sync")
  );

  const CARDS = [
    {
      title: "KSYNC",
      img: "img/homepage/learn.svg",
      href: "/access-data-sets/ksync/overview",
    },
    {
      title: "Delegation",
      img: "img/homepage/community.png",
      href: "/community/delegating",
    },
    {
      title: "Data Pipeline",
      img: "img/homepage/validators.png",
      href: "/access-data-sets/data-pipeline/overview",
    },
    {
      title: "Architecture",
      img: "img/homepage/developers.png",
      href: "/learn/architecture",
    },
  ];

  const CARDS_DETAILED = [
    {
      title: "New to KYVE?",
      img: "img/homepage/learn.svg",
      href: "/learn",
      desc: "Discover how KYVE is enabling validators, applications, and builders alike to bring their data experiences to the next level.",
    },
    {
      title: "Token Holders",
      img: "img/homepage/community.png",
      href: "/community",
      desc: "With $KYVE, stake to further decentralize and secure the network's two unique layers, and participate in governance to give your say in driving the future of KYVE.",
    },
    {
      title: "Validators",
      img: "img/homepage/validators.png",
      href: "/run-a-node",
      desc: "Run a node on KYVE's chain, or a validator on it's protocol, or simply benefit from KYVE's node optimization tooling to enhance your overall experience running on other chains.",
    },
    {
      title: "DApp Builders",
      img: "img/homepage/developers.png",
      href: "/build",
      desc: "Take your scalability to the next level by creating your own custom data rollup powered by KYVE. We handle the data, you build the future.",
    },
  ];

  const animation = (type = "slide-in", delay = 0) => {
    return {
      "data-sal": type,
      "data-sal-easing": "ease-out-back",
      "data-sal-duration": "500",
      "data-sal-delay": delay,
    };
  };

  const renderBanner = () => {
    if (!showBanner) return <></>;
    return (
      <div className="grid grid-flow-col grid-cols-12 rounded-xl bg-[#0000003f] px-5 py-5 mb-5">
        <div className="col-span-11">
          <div className="flex items-center flex-nowrap">
            <div className="rounded-full bg-primary p-1.5 items-center justify-center flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width={20}
                height={20}
              >
                <path
                  fill="#ffffff"
                  d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
                />
              </svg>
            </div>
            <div className="ml-2 font-bold text-xl">Builders!</div>
          </div>
          <div className="mt-2">
            The KYVE Grants Program Phase 0 is live.{" "}
            <a href="https://commonwealth.im/kyve/discussions/2.5%20Grant%20Applications">
              Apply today
            </a>{" "}
            to launch your innovations with KYVE trustless data and tooling.
          </div>
        </div>
        <div
          className="text-primary underline hover:cursor-pointer"
          onClick={() => {
            setShowBanner(false);
            localStorage.setItem("banner", "true");
          }}
        >
          Don't show me again
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <main className="container py-12">
        {renderBanner()}
        <div className="grid grid-cols-2 items-center">
          <div className="col-span-2 md:col-span-1">
            <div {...animation("zoom-in")}>
              <ThemedImage
                alt="logo"
                sources={{
                  dark: useBaseUrl("/img/homepage/logo_white.svg"),
                  light: useBaseUrl("/img/homepage/logo.svg"),
                }}
              />
            </div>
            <div
              className="text-5xl font-bold mt-16"
              {...animation("slide-right", 200)}
            >
              <span className="text-primary">KYVE</span> Handles The Data,
              <br />
              You Build The Future
            </div>
            <div className="mt-8" {...animation("slide-left", 400)}>
              Transform your data experience with KYVE's Data
              Rollups-as-a-Service (DRaaS), ensuring unmatched scalability and
              seamless support for validators, builders, blockchains, and apps
              alike.
            </div>
          </div>
          <div className="flex justify-center col-span-2 md:col-span-1">
            {isFirefox ? (
              <KyveMarkup
                className="hidden sm:visible sm:flex"
                {...animation("zoom-out")}
              />
            ) : (
              <KyveMarkupAnimated
                className="hidden sm:visible sm:flex"
                {...animation("zoom-out")}
              />
            )}
          </div>
        </div>
        <div {...animation("zoom-out", 500)}>
          <Chat />
        </div>
        <div>
          <div
            className="text-3xl mt-8 mb-2 font-bold"
            {...animation("zoom-out")}
          >
            Top pages
          </div>
          <div className="grid grid-cols-4 gap-6">
            {CARDS.map((x, i) => (
              <div
                className="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1"
                key={i}
              >
                <Card href={x.href} img={x.img} className="p-4" delay={i * 150}>
                  <div className="font-bold text-2xl">{x.title}</div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-3xl mt-8 mb-2 font-bold">Getting started</div>
          <div className="grid grid-cols-2 gap-6">
            {CARDS_DETAILED.map((x, i) => (
              <div
                className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1"
                key={i}
              >
                <Card
                  href={x.href}
                  img={x.img}
                  className="p-8"
                  delay={(i % 2) * 150}
                >
                  <div className="font-bold text-3xl mt-16">{x.title}</div>
                  <div className="mt-4">{x.desc}</div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold text-3xl mt-12">
            Validate These Blockchains
          </div>
          <Splide
            options={{
              rewind: true,
              arrows: false,
              breakpoints: {
                1024: {
                  perPage: 2,
                },
                640: {
                  perPage: 1,
                },
              },
              perPage: 3,
              gap: 10,
              type: "loop",
              pagination: false,
            }}
            extensions={{ AutoScroll }}
          >
            {POOLS.map((x, i) => (
              <SplideSlide
                key={i}
                className="py-2"
                onClick={() =>
                  histroy.push(
                    `/run-a-node/protocol-nodes/pools/${x.name
                      .toLowerCase()
                      .replace(" //", "")
                      .split(" ")
                      .join("_")}/overview`
                  )
                }
              >
                <div className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-2">
                  <PoolCard {...x} />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </main>
    </Layout>
  );
}
