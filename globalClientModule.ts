const BCPAnalytics = require("bcp-analytics").default;

if (typeof window !== "undefined") {
  new BCPAnalytics({ debug: true })
    .registerSegment({
      url: "https://apm.kyve.network",
    })
    .start();
}

export default module;
