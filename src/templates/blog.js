import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import { Title, Date, CategoryTitle, Body } from "../components/components"
import { Mobile, Desktop } from "../components/media-queries"
import StyledImageBlock from "../components/image-block"

const EssayGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const ImageContainer = styled.div`
  grid-column: 1;
`

const EssayContainer = styled.div`
  @media (min-width: 750px) {
    padding-left: 1vw;
  }
`

const Blog = ({ data }) => {
  return (
    <>
      <SEO title={data.prismicBlog.data.title.text} />
      <EssayGrid>
        <Mobile>
          <StyledImageBlock
            type={data.prismicBlog.type}
            title={data.prismicBlog.data.title.text}
            featured_image={
              data.prismicBlog.data.featured_image.localFile.childImageSharp
                .fluid
            }
            date={data.prismicBlog.data.date}
          />
        </Mobile>
        <EssayContainer>
          <Desktop>
            <CategoryTitle>{data.prismicBlog.type}</CategoryTitle>
            <Title>{data.prismicBlog.data.title.text}</Title>
            <Date>{data.prismicBlog.data.date}</Date>
            <ImageContainer>
              <Img
                fluid={
                  data.prismicBlog.data.featured_image.localFile.childImageSharp
                    .fluid
                }
              />
            </ImageContainer>
          </Desktop>
          <Body
            dangerouslySetInnerHTML={{
              __html: data.prismicBlog.data.body.html,
            }}
          />
        </EssayContainer>
      </EssayGrid>
    </>
  )
}

export default Blog

export const pageQuery = graphql`
  query BlogBySlug($uid: String!) {
    prismicBlog(uid: { eq: $uid }) {
      data {
        title {
          text
        }
        date(formatString: "Do MMM YYYY")
        featured
        featured_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        body {
          html
        }
      }
      type
    }
  }
`