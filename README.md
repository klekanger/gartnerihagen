# Web pages for a condominium built with Gatsby, Chakra UI, Contentful and Auth0

This is the full (open source) source code for the web pages I have built for my condominium, complete with protected routes in Gatsby and a user admin dashboard built with Gatsby Functions and Auth0 Management API.

I have written about the project in a 6 part series at Dev.to: [Part 1: How I built our condos's new web pages with Gatsby and Chakra UI](https://dev.to/klekanger/part-1-how-i-built-our-condos-s-new-web-pages-with-gatsby-and-chakra-ui-4jd5).

The original Norwegian articles are published on my personal web site, [www.lekanger.no](https://www.lekanger.no)

Some of the Norwegian articles are [published on Kode24.no](https://www.lekanger.no/project/del-1-slik-bygget-jeg-nye-nettsider-til-sameiet-med-gatsby-og-chakra-ui) as well.

If you have suggestions for improvements, or find any bugs, please feel free to use the issues tab, make a pull request, or just send me an email at [kurt@lekanger.no](mailto:kurt@lekanger.no). I'm also at [Twitter](https://twitter.com/lekanger).

The rest of this will be in Norwegian... :-)
<br />
<br />

# Webside for Boligsameiet Gartnerihagen

Nye nettsider for Gartnerihagen Boligsameie, laget i Gatsby/React med Chakra UI. Innholdet hostes på Contentful, og bygging trigges hos Netlify når nytt innhold publiseres på Contentful (via "build hooks").

Les mer om prosjektet på lekanger.no og kode24.no:

- [Del 1: Slik bygget jeg nye nettsider til sameiet med Gatsby og Chakra UI](https://www.lekanger.no/project/del-1-slik-bygget-jeg-nye-nettsider-til-sameiet-med-gatsby-og-chakra-ui)
- [Del 2: Slik bygget jeg sameiets nye nettsider. Grunnmuren er på plass](https://www.lekanger.no/project/del-2-slik-bygget-jeg-sameiets-nye-nettsider-grunnmuren-er-pa-plass)
- [Del 3: Slik bygget jeg sameiets nye nettsider. Autentisering og private ruter i Gatsby](https://www.lekanger.no/project/del-3-slik-bygget-jeg-sameiets-nye-nettsider-autentisering-og-private-ruter-i-gatsby)
- [Del 4: Slik bygget jeg sameiets nye nettsider. Kontinuerlig utrulling til Netlify](https://www.lekanger.no/project/del-4-slik-bygget-jeg-sameiets-nye-nettsider-kontinuerlig-utrulling-til-netlify)
- [Slik bygde jeg brukeradmin-panel til sameiets nettsider med serverless functions og Auth0](https://www.lekanger.no/project/slik-bygde-jeg-brukeradmin-panel-til-sameiets-nettsider-med-serverless-functions-og-auth0)

Du finner de ferdige nettsidene på [https://gartnerihagen-askim.no](https://gartnerihagen-askim.no)

# Teknologivalg

## Backend

- Hostes på: **Netlify**
- Innhold hostes i: **Contentful**
- Gatsby Functions for å lage API-ene som brukes av brukeradmin-grensesnittet

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
