import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import { PostGrid, PostItem } from "../components/components"
import StyledPostBlock from "../components/post-block"

const Galleries = ({ data, location }) => {
  return (
    <>
      <SEO title="Galleries" />
      <PostGrid>
        {data.allPrismicGallery.edges.map(({ node }) => (
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

export default Galleries

export const pageQuery = graphql`
  query {
    allPrismicGallery(sort: { fields: data___date, order: DESC }) {
      edges {
        node {
          uid
          type
          data {
            title {
              text
            }
            featured_image {
              fluid(maxWidth: 1000) {
                ...GatsbyPrismicImageFluid
              }
            }
          }
        }
      }
    }
  }
`
