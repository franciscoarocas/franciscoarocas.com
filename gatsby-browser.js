// custom typefaces
import "@fontsource/montserrat/variable.css"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

import React from 'react';
import { CookiesProvider } from 'react-cookie';

export const wrapRootElement = ({ element }) => (
  <CookiesProvider>
    {element}
  </CookiesProvider>
);