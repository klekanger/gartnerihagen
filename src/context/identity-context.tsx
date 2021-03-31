import * as React from 'react';
import { createContext, useState, useEffect } from 'react';
import * as netlifyIdentity from 'netlify-identity-widget';

export const IdentityContext = createContext<any>({});

const IdentityProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState();
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  useEffect(() => {
    netlifyIdentity.setLocale('en');
    netlifyIdentity.init({});
    setIsLoggingIn(false);
  }, []);

  netlifyIdentity.on('login', (user: any) => {
    setUser(user);
    netlifyIdentity.close();
  });

  netlifyIdentity.on('logout', () => setUser(undefined));

  return (
    <IdentityContext.Provider value={{ netlifyIdentity, user, isLoggingIn }}>
      {children}
    </IdentityContext.Provider>
  );
};

export default IdentityProvider;

// TODO
// Alternativ autentiseringsløsning
// https://github.com/jon-sully/react-netlify-identity-gotrue
//
//
