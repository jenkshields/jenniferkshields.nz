import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import BackgroundImage from "gatsby-background-image"
import { Media } from "../Media"

const OuterWrapper = styled.div`
  width: 100%;
  height: 100%;

  ${HoverWrapper}:hover & {
    opacity: 1;
  }
`

const HoverWrapper = styled(OuterWrapper)`
  opacity: 0;
  background: rgb(129, 85, 155);
  background: linear-gradient(
    148deg,
    rgba(129, 85, 155, 0.8) 0%,
    rgba(140, 134, 170, 0.8) 59%,
    rgba(164, 168, 209, 0.8) 100%
  );
  transition: opacity 400ms ease;
`

const TitleLink = styled(Link)`
  padding-top: 1vh;
  background-image: none;

  &:hover {
    background-image: none;
  }
`

const Title = styled.h2`
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
`

const MobileTitleLink = styled(TitleLink)`
  color: #000;
  text-decoration: none;
`

const MobileTitle = styled(Title)`
  color: #000;
`

const Type = styled(Link)`
  color: #fff;
  text-align: center;
  font-family: "Spectral SC", serif;
  align-self: center;
  text-decoration: none;
  background-image: none;

  &:hover {
    background-image: none;
  }
`

const StyledInnerWrapper = styled.div`
  display: grid;
  margin: auto;
  padding-left: 5vw;
  padding-right: 5vw;
`

const PostBlock = ({ uid, featured_image, type, title }) => {
  const ImageData = featured_image.localFile.childImageSharp.fluid
  const computedHeightDesktop = {
    height: `calc(33vw / ${featured_image.localFile.childImageSharp.fluid.aspectRatio})`,
  }
  const computedHeightMobile = {
    height: `calc(85vw / ${featured_image.localFile.childImageSharp.fluid.aspectRatio})`,
  }
  return (
    <>
      <Media at="mobile">
        <Link to={`${uid}`}>
          <BackgroundImage
            fluid={ImageData}
            style={computedHeightMobile}
          ></BackgroundImage>
        </Link>
        <MobileTitleLink to={`${uid}`}>
          <MobileTitle>{title}</MobileTitle>
        </MobileTitleLink>
      </Media>
      <Media at="desktop">
        <BackgroundImage fluid={ImageData} style={computedHeightDesktop}>
          <OuterWrapper>
            <HoverWrapper>
              <StyledInnerWrapper style={computedHeightDesktop}>
                <Type to={`${uid}`}>{type}</Type>
                <TitleLink to={`${uid}`}>
                  <Title>{title}</Title>
                </TitleLink>
              </StyledInnerWrapper>
            </HoverWrapper>
          </OuterWrapper>
        </BackgroundImage>
      </Media>
    </>
  )
}

const StyledPostBlock = styled(PostBlock)`
  display: grid;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export default StyledPostBlock
