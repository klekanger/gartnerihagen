# Webside for Boligsameiet Gartnerihagen

Nye nettsider for Gartnerihagen Boligsameie, laget i Gatsby/React med Chakra UI. Innholdet hostes på Contentful, og bygging trigges hos Netlify når nytt innhold publiseres på Contentful (via "build hooks").

Les mer om prosjektet på lekanger.no og kode24.no:

- [Del 1: Slik bygget jeg nye nettsider til sameiet med Gatsby og Chakra UI](https://www.lekanger.no/project/del-1-slik-bygget-jeg-nye-nettsider-til-sameiet-med-gatsby-og-chakra-ui)
- [Del 2: Slik bygget jeg sameiets nye nettsider. Grunnmuren er på plass](https://www.lekanger.no/project/del-2-slik-bygget-jeg-sameiets-nye-nettsider-grunnmuren-er-pa-plass)
- [Del 3: Slik bygget jeg sameiets nye nettsider. Autentisering og private ruter i Gatsby](https://www.lekanger.no/project/del-3-slik-bygget-jeg-sameiets-nye-nettsider-autentisering-og-private-ruter-i-gatsby)
- [Del 4: Slik bygget jeg sameiets nye nettsider. Kontinuerlig utrulling til Netlify](https://www.lekanger.no/project/del-4-slik-bygget-jeg-sameiets-nye-nettsider-kontinuerlig-utrulling-til-netlify)

Du finner de ferdige nettsidene på [https://gartnerihagen-askim.no](https://gartnerihagen-askim.no)

# Teknologivalg

## Backend

- Hostes på: **Netlify**
- Innhold hostes i: **Contentful**

## Frontend

- React.js / Gatsby
  - [https://www.gatsbyjs.com/](https://www.gatsbyjs.com/)
- CSS
  - Chakra UI themes / Emotion
    - [https://chakra-ui.com/docs/theming/customize-theme](https://chakra-ui.com/docs/theming/customize-theme)
    - [https://www.gatsbyjs.com/docs/how-to/styling/emotion/](https://www.gatsbyjs.com/docs/how-to/styling/emotion/)
- Chakra UI for brukergrensesnitt
  - [https://chakra-ui.com/](https://chakra-ui.com/)
- Animasjoner med Framer Motion
  - [https://www.framer.com/api/motion/](https://www.framer.com/api/motion/)
  - [https://chakra-ui.com/guides/integrations/with-framer](https://chakra-ui.com/guides/integrations/with-framer)
- Auth0 for autentisering
  - [https://auth0.com/](https://auth0.com/)
- Apollo Client for å hente data når man er på "protected routes" (client only routes)
  - [https://www.apollographql.com/docs/react/](https://www.apollographql.com/docs/react/)
