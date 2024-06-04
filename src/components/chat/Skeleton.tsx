import React from "react";
export const Skeleton = () => {
  return (
    <>
      <div className="flex flex-col">
        <div
          className="mb-[0.5] w-80 skeleton-grow"
          style={{
            animationDelay: "000ms",
          }}
        >
          <div className="skeleton w-full">&zwnj;</div>
        </div>
        <div
          className="mb-[0.5] w-52 skeleton-grow"
          style={{
            animationDelay: "00ms",
          }}
        >
          <div className="skeleton w-full">&zwnj;</div>
        </div>
        <div
          className="mb-[0.5] w-40 skeleton-grow"
          style={{
            animationDelay: "00ms",
          }}
        >
          <div className="skeleton w-full">&zwnj;</div>
        </div>
      </div>
    </>
  );
};
