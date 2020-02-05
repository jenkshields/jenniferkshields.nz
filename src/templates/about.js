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

const About = ({ data }) => {
  return (
    <>
      <SEO
        title={data.prismicAbout.data.title.text}
        image={
          data.prismicAbout.data.profile.localFile.childImageSharp.fluid.src
        }
      />
      <EssayGrid>
        <Mobile>
          <StyledImageBlock
            type={data.prismicAbout.type}
            title={data.prismicAbout.data.title.text}
            featured_image={
              data.prismicAbout.data.profile.localFile.childImageSharp.fluid
            }
            date={data.prismicAbout.data.date}
          />
        </Mobile>
        <Desktop>
          <ImageContainer>
            <Img
              fluid={
                data.prismicAbout.data.profile.localFile.childImageSharp.fluid
              }
            />
          </ImageContainer>
        </Desktop>
        <EssayContainer>
          <Desktop>
            <CategoryTitle>{data.prismicAbout.type}</CategoryTitle>
            <Title>{data.prismicAbout.data.title.text}</Title>
            <Date>{data.prismicAbout.data.date}</Date>
          </Desktop>
          <Body
            dangerouslySetInnerHTML={{
              __html: data.prismicAbout.data.body.html,
            }}
          />
        </EssayContainer>
      </EssayGrid>
    </>
  )
}

export default About

export const pageQuery = graphql`
  query About {
    prismicAbout {
      data {
        title {
          text
        }
        profile {
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
    }
  }
`
