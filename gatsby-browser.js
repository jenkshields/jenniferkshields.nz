/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import Layout from "./src/components/layout"
import { Boot } from "./src/Boot"

require("typeface-spectral-sc")
require("typeface-spectral")

const transitionDelay = 500

export const wrapRootElement = Boot

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

// export const shouldUpdateScroll = ({
//   routerProps: { location },
//   getSavedScrollPosition,
// }) => {
//   if (location.action === "PUSH") {
//     window.setTimeout(() => window.scrollTo(0, 0), transitionDelay)
//   } else {
//     const savedPosition = getSavedScrollPosition(location)
//     window.setTimeout(
//       () => window.scrollTo(...(savedPosition || [0, 0])),
//       transitionDelay
//     )
//   }
//   return false
// }
