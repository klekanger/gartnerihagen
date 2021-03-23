import * as React from 'react';
import { Link } from 'gatsby';

// styles
const pageStyles = {
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};

// markup
const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <title>Not found</title>
      <h1 style={headingStyles}>404 - siden eksisterer ikke</h1>
      <p style={paragraphStyles}>
        Beklager... Vi fant ikke det du lette etter. Det er antagelig vår skyld,
        ikke din.{' '}
        <span role='img' aria-label='Pensive emoji'>
          😔
        </span>{' '}
        <br />
        <br />
        <Link to='/'>
          <b>Gå tilbake til forsiden </b>
        </Link>
      </p>
    </main>
  );
};

export default NotFoundPage;
