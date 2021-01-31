// Client only route (static page is not generated on the server)
// Configured in gatsby-config.js, under the plugin "gatsby-plugin-create-client-paths"

import React, { useContext } from "react";
import { IdentityContext } from "../context/identity-context";

import { Router } from "@reach/router";
import PrivateRoute from "../components/private-components/privateRoute";
import PrivateMain from "../components/private-components/privateMain";
import PrivateNotLoggedIn from "../components/private-components/privateNotLoggedIn";

const Informasjon = () => {
  const { user, netlifyIdentity } = useContext(IdentityContext);

  if (!user) {
    netlifyIdentity.open();
    return <PrivateNotLoggedIn />;
  }

  return (
    <Router>
      <PrivateRoute path="/informasjon" component={PrivateMain} />
    </Router>
  );
};

export default Informasjon;
