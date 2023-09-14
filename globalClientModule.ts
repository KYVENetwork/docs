// from https://github.com/facebook/docusaurus/issues/3399

import {ClientModule} from "@docusaurus/types";
import axios from "axios";

const module: ClientModule = {
  onRouteDidUpdate({location, previousLocation}) {
    if (location.pathname != previousLocation?.pathname) {
      sendPageEvent();
    }

  }
}

const AJS_ANONYMOUS_ID = 'ajs_anonymous_id';
// todo fetch this from environment
const ANALYTICS_URL = "https://apm.kyve.network";

async function sendPageEvent(): Promise<void> {
  const data = {
    user_id: null,
    path: window.location.href,
    referrer: document.referrer,
    ajs_anonymous_id: localStorage.getItem(AJS_ANONYMOUS_ID)
  };

  try {
    const res = await axios.post(`${ANALYTICS_URL}/page`, data, {withCredentials: true});
    const id = res.data[AJS_ANONYMOUS_ID];
    if (id) {
      localStorage.setItem(AJS_ANONYMOUS_ID, id);
    }
  } catch (error) {
    console.error('There was an error sending identify data to APM:', error);
  }
}

export default module
