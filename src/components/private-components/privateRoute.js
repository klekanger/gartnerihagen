import React, { useEffect, useContext } from "react";
import { navigate } from "gatsby";
import { IdentityContext } from "../../identity-context";

function PrivateRoute(props) {
  const { user } = useContext(IdentityContext);
  const { component: Component, location, ...rest } = props;

  useEffect(() => {
    if (!user && location.pathname !== `/app/login`) {
      // If the user is not logged in, redirect to the login page.
      console.log("You are not logged in!");
      navigate(`/app/login`);
    }
  }, [user, location]);
  return user ? <Component {...rest} /> : null;
}

export default PrivateRoute;
