// Client only route (static page is not generated on the server)
// Configured in gatsby-config.js, under the plugin "gatsby-plugin-create-client-paths"

import React, { useContext } from "react";
import { IdentityContext } from "../identity-context";

import { Router } from "@reach/router";
import PrivateRoute from "../components/private-components/privateRoute";
import PrivateMain from "../components/private-components/privateMain";
import PrivateNotLoggedIn from "../components/private-components/privateNotLoggedIn";

const Private = () => {
  const { user, netlifyIdentity } = useContext(IdentityContext);

  if (!user) {
    netlifyIdentity.open();
    return <PrivateNotLoggedIn />;
  }

  const userName = user?.user_metadata?.full_name || "";

  return (
    <Router>
      <PrivateRoute path="/private" component={PrivateMain} />
    </Router>
  );
};

function PublicRoute(props) {
  return <div>{props.children}</div>;
}

export default Private;
