import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import Ticker from "./Ticker";
import UserActions from "./UserActions";

export default () => (
  <Nav navbar className="border-left flex-row">
    <Ticker/>
    <Notifications />
    <UserActions />
  </Nav>
);
