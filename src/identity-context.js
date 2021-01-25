import React, { useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

export const IdentityContext = React.createContext({});

const IdentityProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    console.log("useEffect -> netlifyIdentity.init ");
    netlifyIdentity.setLocale("nb-no");
    netlifyIdentity.init({});
  }, []);

  netlifyIdentity.on("login", (user) => {
    setUser(user);
  });

  netlifyIdentity.on("logout", () => setUser());

  return (
    <IdentityContext.Provider value={{ netlifyIdentity, user }}>
      {props.children}
    </IdentityContext.Provider>
  );
};

export default ({ element }) => <IdentityProvider>{element}</IdentityProvider>;
