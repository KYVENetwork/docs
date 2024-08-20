import React, { useState } from "react";
import Chat from "../../components/chat";

function Root({ children }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  };
  return (
    <>
      <div>
        <div className="fixed bottom-[20px] right-[20px] z-50 bg-surfaceContainer border border-solid border-outline-variant rounded-lg">
          <div
            className="text-center border-none outline-none p-3 rounded-md shadow-xl hover:cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <img
              src="https://docs.kyve.network/img/favicon.ico"
              width="32px"
              className="rounded-md"
            />
            <div className="font-bold text-xl">Ask AI</div>
          </div>
        </div>
        {open && (
          <div
            className={
              "w-[100dvw] fixed left-0 h-[100dvh] bg-black top-0 z-[1000] flex items-center transition-all " +
              (closing
                ? "bg-opacity-0 backdrop-blur-0"
                : "bg-opacity-50 backdrop-blur-sm")
            }
            onClick={close}
          />
        )}
        {open && (
          <div className="fixed z-[1000] left-[50%] top-[5%] translate-x-[-50%]">
            <div
              className={
                "slideIn w-[90dvw] md:w-[60dvw] p-4 rounded-lg bg-surfaceContainer " +
                (closing ? "slideOut" : "")
              }
            >
              <Chat big />
            </div>
          </div>
        )}
      </div>
      {children}
    </>
  );
}

export default Root;
