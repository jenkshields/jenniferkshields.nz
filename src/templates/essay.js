import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import {
  Title,
  Date,
  CategoryTitle,
  Body,
  BlockQuote,
} from "../components/components"
import { Media } from "../Media"
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
    width: 50vw;
  }
`

const ImageMedia = styled(Media)`
  grid-column: 1;
`

const Essay = ({ data, location }) => {
  return (
    <>
      <SEO
        title={data.prismicEssay.data.title.text}
        image={data.prismicEssay.data.meta_image.fluid.src}
        pathname={location.pathname}
        description={data.prismicEssay.data.meta_description.text}
      />
      <EssayGrid>
        <Media at="mobile">
          <StyledImageBlock
            type={data.prismicEssay.type}
            title={data.prismicEssay.data.title.text}
            featured_image={data.prismicEssay.data.featured_image.fluid}
            date={data.prismicEssay.data.date}
          />
        </Media>
        <ImageMedia at="desktop">
          <ImageContainer>
            <Img fluid={data.prismicEssay.data.featured_image.fluid} />
          </ImageContainer>
        </ImageMedia>
        <EssayContainer>
          <Media at="desktop">
            <CategoryTitle>{data.prismicEssay.type}</CategoryTitle>
            <Title>{data.prismicEssay.data.title.text}</Title>
            <Date>{data.prismicEssay.data.date}</Date>
          </Media>
          <Body>
            {data.prismicEssay.data.essay_slice.map(slice => {
              switch (slice.slice_type) {
                case "text":
                  return (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: slice.primary.text.html,
                      }}
                    />
                  )
                case "blockquote":
                  return (
                    <BlockQuote
                      dangerouslySetInnerHTML={{
                        __html: slice.primary.quote.html,
                      }}
                    />
                  )
                default:
                  return null
              }
            })}
          </Body>
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
          fluid(maxWidth: 1600) {
            ...GatsbyPrismicImageFluid
          }
        }
        meta_image {
          fluid {
            src
          }
        }
        meta_description {
          text
        }
        essay_slice {
          ... on PrismicEssayEssaySliceText {
            primary {
              text {
                html
              }
            }
            slice_type
          }
          ... on PrismicEssayEssaySliceBlockquote {
            primary {
              quote {
                html
              }
            }
            slice_type
          }
        }
      }
      type
    }
  }
`
