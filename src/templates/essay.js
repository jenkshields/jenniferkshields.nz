import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout.js"
import SEO from "../components/seo"
import { Title, Date, CategoryTitle, Body } from "../components/components"
import { Mobile, Desktop } from "../components/media-queries"
import StyledImageBlock from "../components/image-block"

const EssayGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 750px) {
    grid-template-columns: 15vw 50vw;
  }
`

const ImageContainer = styled.div`
  grid-column: 1;
`

const EssayContainer = styled.div`
  @media (min-width: 750px) {
    grid-column: 2;
    padding-left: 1vw;
  }
`

const Essay = ({ data }) => {
  return (
    <>
      <SEO title={data.prismicEssay.data.title.text} />
      <EssayGrid>
        <Mobile>
          <StyledImageBlock
            type={data.prismicEssay.type}
            title={data.prismicEssay.data.title.text}
            featured_image={
              data.prismicEssay.data.featured_image.localFile.childImageSharp
                .fluid
            }
            date={data.prismicEssay.data.date}
          />
        </Mobile>
        <Desktop>
          <ImageContainer>
            <Img
              fluid={
                data.prismicEssay.data.featured_image.localFile.childImageSharp
                  .fluid
              }
            />
          </ImageContainer>
        </Desktop>
        <EssayContainer>
          <Desktop>
            <CategoryTitle>{data.prismicEssay.type}</CategoryTitle>
            <Title>{data.prismicEssay.data.title.text}</Title>
            <Date>{data.prismicEssay.data.date}</Date>
          </Desktop>
          <Body
            dangerouslySetInnerHTML={{
              __html: data.prismicEssay.data.body.html,
            }}
          />
        </EssayContainer>
      </EssayGrid>
    </>
  )
}

export default Essay

export const pageQuery = graphql`
  query EssayBySlug($uid: String!) {
    prismicEssay(uid: { eq: $uid }) {
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
