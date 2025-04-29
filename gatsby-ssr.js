/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require('react');
const { CookiesProvider } = require('react-cookie');

exports.wrapRootElement = ({ element }) => {
  return <CookiesProvider>{element}</CookiesProvider>;
};

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' });
};
