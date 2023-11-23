// from https://github.com/facebook/docusaurus/issues/3399

import { ClientModule } from "@docusaurus/types";
import axios from "axios";

document.body.addEventListener("copy", function () {
  const selection = document.getSelection();
  sendCopyEvent(selection.toString());
});

const module: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (location.pathname != previousLocation?.pathname) {
      sendPageEvent();
    }
  },
};

const AJS_ANONYMOUS_ID = "ajs_anonymous_id";
// todo fetch this from environment
const ANALYTICS_URL = "https://apm.kyve.network";

async function sendCopyEvent(content: string): Promise<void> {
  const data = {
    user_id: null,
    ajs_anonymous_id: localStorage.getItem(AJS_ANONYMOUS_ID),
    path: window.location.href,
    referrer: document.referrer,
    event: "COPY",
    properties: {
      content,
    },
  };
  try {
    const res = await axios.post(`${ANALYTICS_URL}/track`, data, {
      withCredentials: true,
    });
    const id = res.data[AJS_ANONYMOUS_ID];
    if (id) {
      localStorage.setItem(AJS_ANONYMOUS_ID, id);
    }
  } catch (error) {
    console.error("There was an error sending identify data to APM:", error);
  }
}

async function sendPageEvent(): Promise<void> {
  const data = {
    user_id: null,
    path: window.location.href,
    referrer: document.referrer,
    ajs_anonymous_id: localStorage.getItem(AJS_ANONYMOUS_ID),
  };

  try {
    const res = await axios.post(`${ANALYTICS_URL}/page`, data, {
      withCredentials: true,
    });
    const id = res.data[AJS_ANONYMOUS_ID];
    if (id) {
      localStorage.setItem(AJS_ANONYMOUS_ID, id);
    }
  } catch (error) {
    console.error("There was an error sending identify data to APM:", error);
  }
}

export default module;
