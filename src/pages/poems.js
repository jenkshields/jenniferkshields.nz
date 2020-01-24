import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import { PostGrid, PostItem } from "../components/components"
import StyledPostBlock from "../components/post-block"

const Poems = ({ data, location }) => {
  return (
    <>
      <SEO title="Poems" />
      <PostGrid>
        {data.allPrismicPoem.edges.map(({ node }) => (
          <PostItem>
            <StyledPostBlock
              uid={node.uid}
              featured_image={node.data.featured_image}
              type={node.type}
              title={node.data.title.text}
            />
          </PostItem>
        ))}
      </PostGrid>
    </>
  )
}

export default Poems

export const pageQuery = graphql`
  query {
    allPrismicPoem(sort: { fields: data___date, order: DESC }) {
      edges {
        node {
          uid
          type
          data {
            title {
              text
            }
            featured_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
