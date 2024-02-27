import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { Card, CardProps } from "../components/Card";
import React from "react";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  const CARDS: CardProps[] = [
    {
      title: "Learn",
      desc: "Discover how KYVE is enabling validators, applications, and builder alike to bring their data experiences to the next level.",
      img: "img/homepage/learn.svg",
      href: "/learn",
    },
    {
      title: "Community",
      desc: "Discover how KYVE is enabling validators, applications, and builder alike to bring their data experiences to the next level.",
      img: "img/homepage/community.svg",
      href: "/community",
    },
    {
      title: "Validators",
      desc: "Discover how KYVE is enabling validators, applications, and builder alike to bring their data experiences to the next level.",
      img: "img/homepage/validators.png",
      href: "/validators",
    },
    {
      title: "Developers",
      desc: "Discover how KYVE is enabling validators, applications, and builder alike to bring their data experiences to the next level.",
      img: "img/homepage/developers.png",
      href: "/developers",
    },
  ];

  return (
    <Layout>
      <main className="container py-12">
        <div className="grid grid-cols-2 items-center">
          <div>
            <img src="/img/homepage/logo_text.svg"></img>
            <div className="text-5xl font-bold mt-16">
              We need some good looking text here!
            </div>
            <div className="mt-8">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </div>
            <div className="mt-8 flex flex-nowrap">
              <button className="bg-[#58C6B2] rounded-xl py-2.5 px-3 text-white drop-shadow-md btn-primary mr-4">
                Validate The Network
              </button>
              <button className="rounded-xl py-2.5 px-3 drop-shadow-md border border-black text-black">
                Build Your Own Data Rollup
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <img src="/img/homepage/kyve-markup.svg"></img>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-8">
          {CARDS.map((x, i) => (
            <div
              key={i}
              className="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1"
            >
              <Card {...x} />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
