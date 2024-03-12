import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { Card, CardProps } from "../components/Card";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import React, { useEffect } from "react";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { useHistory } from "@docusaurus/router";
import sal from "sal.js";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const histroy = useHistory();

  useEffect(() => {
    sal();
  }, []);

  const POOLS = (siteConfig.customFields!.pools as PoolCardProps[]).filter(
    (x) => !x.name.includes("State-Sync")
  );

  const CARDS = [
    {
      title: "KSYNC",
      img: "img/homepage/learn.svg",
      href: "/validators/ksync",
    },
    {
      title: "Delegation",
      img: "img/homepage/community.svg",
      href: "/community/delegating",
    },
    {
      title: "Data Pipeline",
      img: "img/homepage/validators.png",
      href: "/validators",
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
      title: "Tokenholders",
      img: "img/homepage/community.svg",
      href: "/community",
      desc: "Discover how KYVE is enabling validators, applications, and builders alike to bring their data experiences to the next level.",
    },
    {
      title: "Validators: Optimize",
      img: "img/homepage/validators.png",
      href: "/community/delegating",
      desc: "Run a node on KYVE's chain, or a validator on it's protocol, or simply benefit from KYVE's node optimization tooling to enhance your overall experience running on other chains.",
    },
    {
      title: "DApp Builders: Get Started",
      img: "img/homepage/developers.png",
      href: "/developers",
      desc: "Take your scalability to the next level by creating your own custom data rollup powered by KYVE. We handle the data, you build the future.",
    },
  ];

  return (
    <Layout>
      <main className="container py-12">
        <div className="grid grid-cols-2 items-center">
          <div className="col-span-2 md:col-span-1">
            <ThemedImage
              alt="logo"
              sources={{
                dark: useBaseUrl("/img/homepage/logo_white.svg"),
                light: useBaseUrl("/img/homepage/logo.svg"),
              }}
              data-sal="zoom-in"
              data-sal-easing="ease-out-back"
              data-sal-duration="500"
            />
            <div
              className="text-5xl font-bold mt-16"
              data-sal="slide-right"
              data-sal-easing="ease-out-back"
              data-sal-duration="500"
              data-sal-delay="200"
            >
              <span className="text-primary">KYVE</span> Handles The Data,
              <br />
              You Build The Future
            </div>
            <div
              className="mt-8"
              data-sal="slide-left"
              data-sal-easing="ease-out-back"
              data-sal-duration="500"
              data-sal-delay="400"
            >
              Transform your data experience with KYVE's ultimate data
              rollups-as-a-service (DRaaS) solution for unmatched scalability
              and seamless support for validators, builders, blockchains, and
              apps alike.
            </div>
          </div>
          <div className="flex justify-center col-span-2 md:col-span-1">
            <img
              className="hidden sm:visible sm:flex"
              draggable={false}
              src="/img/homepage/kyve-markup.svg"
              data-sal="zoom-out"
              data-sal-easing="ease-out-back"
              data-sal-duration="500"
            />
          </div>
        </div>
        <div>
          <div className="text-3xl mt-8 mb-2 font-bold">Top pages</div>
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
          <div className="font-bold text-3xl mt-12">Validate those pools</div>
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
              autoScroll: {
                speed: 0.75,
              },
            }}
            extensions={{ AutoScroll }}
          >
            {POOLS.map((x, i) => (
              <SplideSlide
                key={i}
                className="py-2"
                onClick={() =>
                  histroy.push(
                    `/validators/protocol_nodes/pools/${x.name
                      .toLowerCase()
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
