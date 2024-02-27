import React from "react";

export interface CardProps {
  title: string;
  desc: string;
  img: string;
  href: string;
}

export const Card = ({ desc, title, img, href }: CardProps) => {
  return (
    <a
      className="flex flex-col p-6 w-full min-h-[250px] bg-gradient-to-b from-[#252B2E] to-[#3f776f] rounded-xl text-white relative shadow-xl hover:scale-[1.025] transition-all duration-300 hover:text-white"
      href={href}
    >
      <div className="text-3xl font-bold mb-4 mt-auto z-10">{title}</div>
      <div className="z-10">{desc}</div>
      <img src={img} className="absolute right-0 top-0 z-0"></img>
    </a>
  );
};
