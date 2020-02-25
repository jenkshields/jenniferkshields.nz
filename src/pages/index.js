import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import { Media } from "../Media"
import { PostGrid, PostItem } from "../components/components"
import StyledPostBlock from "../components/post-block"
import StyledImageBlock from "../components/image-block"
import { render } from "react-dom"

const IndexGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1vh;
`

const ImageBlockContainer = styled.div`
  width: 100vw;
`

const IndexPage = ({ data }) => {
  let indexPosts = [
    ...data.allPrismicBlog.edges,
    ...data.allPrismicEssay.edges,
    ...data.allPrismicPoem.edges,
    ...data.allPrismicPortfolio.edges,
    ...data.allPrismicGallery.edges,
  ]
  console.log(indexPosts)
  indexPosts.sort((a, b) =>
    a.node.data.sortable_date > b.node.data.sortable_date ? -1 : 1
  )
  console.log(indexPosts)
  return (
    <>
      <SEO
        title="Jennifer K. Shields"
        image={data.prismicHomepage.data.meta_image.fluid.src}
      />
      <IndexGrid>
        <Media at="mobile">
          <ImageBlockContainer>
            <StyledImageBlock
              title={data.prismicHomepage.data.title.text}
              bio={data.prismicHomepage.data.bio.text}
            />
          </ImageBlockContainer>
        </Media>
        <PostGrid>
          {indexPosts.map(({ node }) => (
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
}

export default IndexPage

export const PageQuery = graphql`
  query {
    allPrismicBlog(
      filter: { data: { featured: { eq: "Featured" } } }
      sort: { fields: data___date, order: DESC }
    ) {
      edges {
        node {
          uid
          data {
            sortable_date: date
            date(formatString: "Do MMM YYYY")

            featured
            featured_image {
              fluid(maxWidth: 1000) {
                ...GatsbyPrismicImageFluid
              }
            }
            title {
              text
            }
          }
          type
          first_publication_date
        }
      }
    }
    allPrismicPortfolio(
      filter: { data: { featured: { eq: "Featured" } } }
      sort: { fields: data___date, order: DESC }
    ) {
      edges {
        node {
          uid
          data {
            date(formatString: "Do MMM YYYY")
            sortable_date: date
            featured
            featured_image {
              fluid(maxWidth: 1000) {
                ...GatsbyPrismicImageFluid
              }
            }
            title {
              text
            }
          }
          type
          first_publication_date
        }
      }
    }
    allPrismicPoem(
      filter: { data: { featured: { eq: "Featured" } } }
      sort: { fields: data___date, order: DESC }
    ) {
      edges {
        node {
          uid
          data {
            date(formatString: "Do MMM YYYY")
            sortable_date: date
            featured
            featured_image {
              fluid(maxWidth: 1000) {
                ...GatsbyPrismicImageFluid
              }
            }
            title {
              text
            }
          }
          type
          first_publication_date
        }
      }
    }
    allPrismicEssay(
      filter: { data: { featured: { eq: "Featured" } } }
      sort: { fields: data___date, order: DESC }
    ) {
      edges {
        node {
          uid
          data {
            date(formatString: "Do MMM YYYY")
            sortable_date: date
            featured
            featured_image {
              fluid(maxWidth: 1000) {
                ...GatsbyPrismicImageFluid
              }
            }
            title {
              text
            }
          }
          type
          first_publication_date
        }
      }
    }
    allPrismicGallery(
      filter: { data: { featured: { eq: "Featured" } } }
      sort: { fields: data___date, order: DESC }
    ) {
      edges {
        node {
          uid
          data {
            date(formatString: "Do MMM YYYY")
            sortable_date: date
            featured
            featured_image {
              fluid(maxWidth: 1000) {
                ...GatsbyPrismicImageFluid
              }
            }
            title {
              text
            }
          }
          type
          first_publication_date
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
        meta_image {
          fluid {
            src
          }
        }
      }
    }
  }
`
