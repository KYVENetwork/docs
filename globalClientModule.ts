// from https://github.com/facebook/docusaurus/issues/3399

import {ClientModule} from "@docusaurus/types";
import axios from "axios";

const module: ClientModule = {
  onRouteDidUpdate({location, previousLocation}) {
    if (location.pathname != previousLocation?.pathname) {
      // todo: put this into environment
      axios.post(`https://apm.kyve.network/page`,
        {user_id: null, path: window.location.href, referrer: document.referrer},
        {withCredentials: true})
    }

  }
}

export default module
