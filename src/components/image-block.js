import React from "react"
import { graphql, StaticQuery } from "gatsby"
import styled from "styled-components"

import BackgroundImage from "gatsby-background-image"
import { CategoryTitle, Date } from "./components"

const Title = styled.h2`
  color: #fff;
  text-align: center;
  /* font-size: 1.5rem; */
  /* padding-top: 1vh; */
`
const CategoryTitleWhite = styled(CategoryTitle)`
  color: #fff;
`

const Bio = styled.p`
  color: #fff;
  text-align: center;
`

const StyledInnerWrapper = styled.div`
  margin: auto;
  width: 60vw;
  padding-left: 5vw;
  padding-right: 5vw;
`

const ImageBlock = ({ className, title, bio, type, featured_image, date }) => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "bio-bg.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      const ImageData = featured_image
        ? featured_image
        : data.file.childImageSharp.fluid
      const backgroundStack = [
        `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
        ImageData,
      ]
      return (
        <BackgroundImage className={className} fluid={backgroundStack}>
          <StyledInnerWrapper>
            {{ type } && <CategoryTitleWhite>{type}</CategoryTitleWhite>}
            <Title>{title}</Title>
            {{ date } && <Date style={{ color: `#fff` }}>{date}</Date>}
            {{ bio } && <Bio>{bio}</Bio>}
          </StyledInnerWrapper>
        </BackgroundImage>
      )
    }}
  />
)

const StyledImageBlock = styled(ImageBlock)`
  display: grid;
  width: 100vw;
  height: 35vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &:before {
    height: 35vh;
  }
`

export default StyledImageBlock
