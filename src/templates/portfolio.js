import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import { Title, Date, CategoryTitle, Body } from "../components/components"
import { Media } from "../Media"
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

const PortfolioLink = styled.div`
  text-align: center;
  font-size: 1.1rem;
`

const Portfolio = ({ data, location }) => {
  return (
    <>
      <SEO
        title={data.prismicPortfolio.data.title.text}
        description={data.prismicPortfolio.data.meta_description.text}
        image={data.prismicPortfolio.data.meta_image.fluid.src}
        pathname={location.pathname}
      />
      <EssayGrid>
        <Media at="mobile">
          <StyledImageBlock
            type={data.prismicPortfolio.type}
            title={data.prismicPortfolio.data.title.text}
            featured_image={data.prismicPortfolio.data.featured_image.fluid}
            date={data.prismicPortfolio.data.date}
          />
        </Media>
        <EssayContainer>
          <Media at="desktop">
            <CategoryTitle>{data.prismicPortfolio.type}</CategoryTitle>
            <Title>{data.prismicPortfolio.data.title.text}</Title>
            <Date>{data.prismicPortfolio.data.date}</Date>
            <ImageContainer>
              <Img fluid={data.prismicPortfolio.data.featured_image.fluid} />
            </ImageContainer>
          </Media>
          {data.prismicPortfolio.data.link && (
            <PortfolioLink>
              <a href={data.prismicPortfolio.data.link.url}>
                &#8620; See the work.
              </a>
            </PortfolioLink>
          )}
          <Body>
            <div
              dangerouslySetInnerHTML={{
                __html: data.prismicPortfolio.data.body.html,
              }}
            />
          </Body>
        </EssayContainer>
      </EssayGrid>
    </>
  )
}

export default Portfolio

export const pageQuery = graphql`
  query PortfolioBySlug($uid: String!) {
    prismicPortfolio(uid: { eq: $uid }) {
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
        body {
          html
        }
        link {
          url
        }
      }
      type
    }
  }
`
