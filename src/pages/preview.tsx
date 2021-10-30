import * as React from 'react';
import { Router } from '@reach/router';
import PreviewPage from '../components/preview-page';

export default function Preview() {
  return (
    <Router>
      <PreviewPage path='/preview/:id' />
    </Router>
  );
}
