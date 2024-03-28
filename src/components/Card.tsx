import React, { HTMLAttributes } from "react";
import { useHistory } from "@docusaurus/router";
import Tilt from "react-parallax-tilt";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  img: string;
  href: string;
  delay: number;
}

export const Card = ({ delay, img, href, children, className }: CardProps) => {
  const histroy = useHistory();
  return (
    <div
      className="h-full"
      data-sal="slide-up"
      data-sal-easing="ease-out-back"
      data-sal-duration="500"
      data-sal-delay={delay}
    >
      <Tilt
        perspective={10000}
        glareEnable
        glareMaxOpacity={0.4}
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        scale={1.025}
        className="rounded-lg overflow-hidden h-full"
      >
        <div
          className={
            "flex flex-col w-full bg-gradient-to-b h-full from-[#252B2E] to-[#3f776f] rounded-xl text-white relative shadow-xl transition-all duration-300 hover:cursor-pointer overflow-hidden justify-center " +
            className
          }
          onClick={() => {
            if (href.includes("https://")) window.open(href);
            else histroy.push(href);
          }}
        >
          <div className="z-10">{children}</div>
          <img src={img} className="absolute right-0 top-0 z-0"></img>
        </div>
      </Tilt>
    </div>
  );
};
