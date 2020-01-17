/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"

import Nav from "./nav.js"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Spectral, serif;
    margin: 0;
    font-weight: 300;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Spectral SC', serif;
    font-weight: 500;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
`

const NavContainer = styled.div`
  grid-column: 1;
  grid-row: 1;
`

const ContentContainer = styled.div`
  grid-column: 1;
  grid-row: 2;
`

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      prismicHomepage {
        data {
          title {
            text
          }
          bio {
            text
          }
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      <Grid>
        <NavContainer>
          <Nav siteTitle={data.prismicHomepage.data.title.text} bio={data.prismicHomepage.data.bio.text} location={location} />
        </NavContainer>
        <ContentContainer>
          {children}
        </ContentContainer>
      </Grid>
        <footer>
          © {new Date().getFullYear()}, Built by
          {` `}
          <a href="https://glitterbox.nz">Glitterbox Pursuits</a>
        </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
