import * as React from 'react';
import { Router } from '@reach/router';
import PreviewBlog from '../components/preview-blog';
import PreviewPage from '../components/preview-page';

export default function Preview() {
  return (
    <Router>
      <PreviewBlog path='/preview/blog/:id' />
      <PreviewPage path='/preview/page/:id' />
    </Router>
  );
}
