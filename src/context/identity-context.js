import React, { useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

export const IdentityContext = React.createContext({});

const IdentityProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    netlifyIdentity.setLocale('en');
    netlifyIdentity.init({});
  }, []);

  netlifyIdentity.on('login', (user) => {
    setUser(user);
    console.log(netlifyIdentity);
    netlifyIdentity.close();
  });

  netlifyIdentity.on('logout', () => setUser());

  return (
    <IdentityContext.Provider value={{ netlifyIdentity, user }}>
      {props.children}
    </IdentityContext.Provider>
  );
};

export default ({ element }) => <IdentityProvider>{element}</IdentityProvider>;
