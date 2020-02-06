/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from "react"
import Layout from "./src/components/layout"
import { Boot } from "./src/Boot"

const transitionDelay = 500

export const wrapRootElement = Boot

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
