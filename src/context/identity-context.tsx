import * as React from 'react'
import { createContext, useState, useEffect } from 'react';
import * as netlifyIdentity from 'netlify-identity-widget';

export const IdentityContext: any = createContext({});

type IdentityProviderProps = {
  children: React.ReactNode | undefined
}

const IdentityProvider = (props: IdentityProviderProps) => {
  const [user, setUser] = useState();

  useEffect(() => {
    netlifyIdentity.setLocale('en');
    netlifyIdentity.init({});
  }, []);

  netlifyIdentity.on('login', (user: any) => {
    setUser(user);
    netlifyIdentity.close();
  });

  netlifyIdentity.on('logout', () => setUser(undefined));

  return (
    <IdentityContext.Provider value={{ netlifyIdentity, user }}>
      {props.children}
    </IdentityContext.Provider>
  );
};

const el = ({ element } : {element: any}) => <IdentityProvider>{element}</IdentityProvider>;

export default el;
