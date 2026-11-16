/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

// El HTML generado está en español; en el navegador se cambia según el idioma elegido.
exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "es" })
}
