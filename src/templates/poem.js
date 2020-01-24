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

const EssayContainer = styled.div`
  @media (min-width: 750px) {
    padding-left: 1vw;
  }
`

const Poem = ({ data }) => {
  return (
    <>
      <SEO title={data.prismicPoem.data.title.text} />
      <EssayGrid>
        <Mobile>
          <StyledImageBlock
            type={data.prismicPoem.type}
            title={data.prismicPoem.data.title.text}
            date={data.prismicPoem.data.date}
          />
        </Mobile>
        <EssayContainer>
          <Desktop>
            <CategoryTitle>{data.prismicPoem.type}</CategoryTitle>
            <Title>{data.prismicPoem.data.title.text}</Title>
            <Date>{data.prismicPoem.data.date}</Date>
          </Desktop>
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
      }
    }
  }
`
