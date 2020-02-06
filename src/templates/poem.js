import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import SEO from "../components/seo"
import { Title, Date, CategoryTitle, Body } from "../components/components"
import { Media } from "../Media"
import StyledImageBlock from "../components/image-block"

const EssayGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const EssayContainer = styled.div`
  @media (min-width: 750px) {
    padding-left: 1vw;
  }
`

const Poem = ({ data, location }) => {
  return (
    <>
      <SEO
        title={data.prismicPoem.data.title.text}
        image={
          data.prismicPoem.data.meta_image.localFile.childImageSharp.fluid.src
        }
        description={data.prismicPoem.data.meta_description.text}
        pathname={location.pathname}
      />
      <EssayGrid>
        <Media lessThan="mobile">
          <StyledImageBlock
            type={data.prismicPoem.type}
            title={data.prismicPoem.data.title.text}
            date={data.prismicPoem.data.date}
          />
        </Media>
        <EssayContainer>
          <Media at="desktop">
            <CategoryTitle>{data.prismicPoem.type}</CategoryTitle>
            <Title>{data.prismicPoem.data.title.text}</Title>
            <Date>{data.prismicPoem.data.date}</Date>
          </Media>
          <Body
            dangerouslySetInnerHTML={{
              __html: data.prismicPoem.data.poem.html,
            }}
          />
        </EssayContainer>
      </EssayGrid>
    </>
  )
}

export default Poem

export const pageQuery = graphql`
  query Poem($uid: String!) {
    prismicPoem(uid: { eq: $uid }) {
      data {
        title {
          text
        }
        poem {
          html
        }
        featured_image {
          localFile {
            childImageSharp {
              fluid {
                src
              }
            }
          }
        }
        meta_image {
          localFile {
            childImageSharp {
              fluid {
                src
              }
            }
          }
        }
        meta_description {
          text
        }
      }
    }
  }
`
