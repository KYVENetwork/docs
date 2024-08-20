import React from "react";
import { Message } from ".";
import Markdown from "react-markdown";

const MessageBox = ({ message: msg }: { message: Message }) => {
  return (
    <>
      <div>
        <div
          key={msg.content}
          className={
            "mt-2 " +
            (!msg.bot
              ? "font-bold text-2xl border-t-0 border-l-0 border-r-0 border-b border-solid dark:border-white border-black border-opacity-50 "
              : " ") +
            (msg.finished && !msg.bot && "slideIn")
          }
        >
          <Markdown>{msg.content}</Markdown>
        </div>
        {msg.sources && msg.finished && (
          <div className="flex flex-nowrap gap-1 items-center">
            <div>Sources:</div>
            {msg.sources.slice(0, 4).map((x, i) => (
              <a
                className="border-solid border border-borderColor p-1 rounded-md seelct-none cursor-pointer slideIn"
                style={{
                  animationDelay: i * 100 + "ms",
                }}
                key={x.title + i}
                href={x.source_url}
              >
                {x.title.slice(0, 12) + (x.title.length > 6 ? "..." : "")}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MessageBox;
