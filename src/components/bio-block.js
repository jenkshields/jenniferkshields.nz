import React from "react"
import { graphql, StaticQuery } from 'gatsby'
import styled from "styled-components"

import BackgroundImage from "gatsby-background-image"

const Title = styled.h1`
    color: #fff;
    text-align: center;
    font-size: 2rem;
`

const Bio = styled.p`
    color: #fff;
    text-align: center;
`

const StyledInnerWrapper = styled.div`
    /* margin-top: 10%; */
    align-items: center;
    padding-left: 5vw;
    padding-right: 5vw;
`

const BioBlock = ({ className, siteTitle, bio }) => (
    <StaticQuery
        query={graphql`
            query {
                file(relativePath: {eq: "bio-bg.jpg"}) {
                    childImageSharp {
                        fluid(maxWidth: 1000) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        `}
    render = {data => {
        const ImageData = data.file.childImageSharp.fluid
        const backgroundStack = [
            `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
            ImageData,
        ]
        return (
            <BackgroundImage 
                className = {className}
                fluid = {backgroundStack}
            >
                <StyledInnerWrapper>
                    <Title>{siteTitle}</Title>
                    <Bio>{bio}</Bio>
                </StyledInnerWrapper>
            </BackgroundImage>
        )
    }}
    />
)

const StyledBioBlock = styled(BioBlock)`
    width: 100vw;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

export default StyledBioBlock;