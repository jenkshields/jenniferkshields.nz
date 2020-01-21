import React from "react"
import styled from "styled-components"

export const CategoryTitle = styled.h3`
  text-align: center;
`

export const Title = styled.h2`
  text-align: center;
`

export const Date = styled.p`
  text-align: center;
  font-size: 0.8rem;
`

export const UnstyledButton = styled.button`
  all: unset;
`
export const Body = styled.p`
  padding-left: 1vw;
  padding-right: 1vw;

  @media (min-width: 750) {
    padding: inherit;
  }
`

export const Description = styled.p`
  text-align: center;
  padding-left: 1vw;
  padding-right: 1vw;

  @media (min-width: 750) {
    padding: inherit;
  }
`

export const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;

  @media (min-width: 750px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`

export const PostItem = styled.div`
  width: 85vw;
  justify-self: center;

  @media (min-width: 750px) {
    width: 33vw;
    justify-self: start;
  }
`
