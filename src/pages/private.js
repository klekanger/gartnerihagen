import React, { useContext } from "react";
import { IdentityContext } from "../identity-context";

import { Router } from "@reach/router";

let Dash = () => <div>Dash</div>;

export default (props) => {
  const id = useContext(IdentityContext);
  const userName = id?.user?.user_metadata?.full_name || "";
  console.log("Brukernavn:", userName);
  return (
    <Router>
      <Dash path="/private" />
    </Router>
  );
};
