import React from 'react';
import Article from '../components/article';

const Test = () => {
  return (
    <>
      <Article
        title='Testing'
        bodyText='Dette er brødteksten'
        createdAt='18.2.2021'
        updatedAt='19.2.2021'
      />
    </>
  );
};

export default Test;
