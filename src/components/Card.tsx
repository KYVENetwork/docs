import React, { useEffect, useState } from "react";
import { useHistory } from "@docusaurus/router";
import { useInView } from "react-intersection-observer";

export interface CardProps {
  title: string;
  desc?: string;
  img: string;
  href: string;
  delay?: number;
}

export const Card = ({ desc, title, img, href, delay }: CardProps) => {
  const histroy = useHistory();
  const [ref, inView] = useInView();
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    if (inView && !animated) {
      setAnimated(true);
    }
  }, [inView]);
  return (
    <div
      ref={ref}
      className={(animated ? "fadeIn" : "opacity-0") + " h-full"}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="flex flex-col p-6 w-full bg-gradient-to-b h-full from-[#252B2E] to-[#3f776f] rounded-xl text-white relative shadow-xl hover:scale-[1.025] transition-all duration-300 hover:text-white hover:cursor-pointer overflow-hidden justify-center"
        onClick={() => histroy.push(href)}
      >
        <div className="text-3xl font-bold z-10">{title}</div>
        {desc && <div className="z-10 mt-8">{desc}</div>}
        <img src={img} className="absolute right-0 top-0 z-0"></img>
      </div>
    </div>
  );
};
