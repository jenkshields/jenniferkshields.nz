import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import { Mobile } from "../components/media-queries"
import { PostGrid, PostItem } from "../components/components"
import StyledPostBlock from "../components/post-block"
import StyledImageBlock from "../components/image-block"

const IndexGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1vh;
`

const ImageBlockContainer = styled.div`
  width: 100vw;
`

const IndexPage = ({ data }) => (
  <>
    <SEO title="Jennifer K. Shields" />
    <IndexGrid>
      <Mobile>
        <ImageBlockContainer>
          <StyledImageBlock
            title={data.prismicHomepage.data.title.text}
            bio={data.prismicHomepage.data.bio.text}
          />
        </ImageBlockContainer>
      </Mobile>
      <PostGrid>
        {data.allIndexPosts.edges.map(({ node }) => (
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
    </IndexGrid>
  </>
)

export default IndexPage

export const PageQuery = graphql`
  query {
    allIndexPosts(
      filter: { data: { featured: { eq: "Featured" } } }
      sort: { fields: data___date, order: DESC }
    ) {
      edges {
        node {
          uid
          data {
            date(formatString: "Do MMM YYYY")
            featured
            featured_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            title {
              text
            }
          }
          type
        }
      }
    }
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
`
