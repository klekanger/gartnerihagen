// Client only route (static page is not generated on the server)
// Configured in gatsby-config.js, under the plugin "gatsby-plugin-create-client-paths"

import React, { useContext } from "react";
import { IdentityContext } from "../context/identity-context";

import { Router } from "@reach/router";
import PrivateRoute from "../utils/privateRoute";
import Main from "../components/private-components/main";
import NotLoggedIn from "../components/private-components/notLoggedIn";

const Informasjon = () => {
  const { user, netlifyIdentity } = useContext(IdentityContext);

  if (!user) {
    netlifyIdentity.open();
    return <NotLoggedIn />;
  }

  return (
    <Router>
      <PrivateRoute path="/informasjon" component={Main} />
    </Router>
  );
};

export default Informasjon;
