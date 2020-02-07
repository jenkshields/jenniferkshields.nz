import React, { useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { Modal } from "react-overlays"
import styled from "styled-components"
import SEO from "../components/seo"
import StyledImageBlock from "../components/image-block"
import { Media } from "../Media"
import x from "../images/x.svg"
import {
  CategoryTitle,
  Title,
  Date,
  UnstyledButton,
  Description,
} from "../components/components"

// const GalleryGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;

//   @media (min-width: 405px) {
//     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//     grid-template-rows: repeat(auto);
//     grid-gap: 5px;
//     grid-auto-flow: dense;
//   }
// `

const GalleryItem = styled(Img)`
  object-fit: cover;
  height: 100%;
  width: 100%;
`

const ImageButtonBig = styled(UnstyledButton)`
  @media (min-width: 405px) {
    grid-column: span 2;
    grid-row: span 2;
  }
`

const ImageButtonPortrait = styled(UnstyledButton)`
  @media (min-width: 405px) {
    grid-row: span 2;
  }
`

const LightboxModal = styled(Modal)`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1050;
`

const LightboxBackdrop = styled.div`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`

const LightboxContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 75vw 1fr;
  grid-template-rows: 5vh 80vh;
  align-items: center;
  justify-items: center;
`

const LightboxImageContainer = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
`

const LightboxImage = styled(Img)`
  object-fit: cover;
`

const LightboxCaption = styled.p`
  color: #fff;
  margin-top: 0px;
`

const LightboxButton = styled(UnstyledButton)`
  grid-row: 1;
  grid-column: 3/4;
  padding-top: 2vh;
  padding-right: 2vw;
  margin-bottom: -2vh;
  cursor: pointer;
`

const CloseImg = styled.img``

const Gallery = ({ data, location }) => {
  const [show, setShow] = useState(false)
  const [selectedImage, setImage] = useState(null)
  const [caption, setCaption] = useState("")

  const title = data.prismicGallery.data.title.text
  const type = data.prismicGallery.type
  const date = data.prismicGallery.data.date
  //   const [imageIndex, setImageIndex] = useState(0)

  //   const lightboxImages = data.prismicGallery.data.images.map(
  //     ({ image }) => image.localFile.childImageSharp.fluid
  //   )

  //   console.log(lightboxImages)

  const handleClose = () => setShow(false)

  //   const openLightbox = imageIndex => {
  //     setImageIndex(imageIndex + 1)
  //     setShow(true)
  //   }

  function imageClicked(image, caption) {
    setCaption(caption.text)
    setImage(image)
    setShow(true)
    // openLightbox(i)
  }

  const renderBackdrop = props => (
    <LightboxBackdrop onClick={() => setShow(false)} {...props} />
  )

  return (
    <>
      {data.prismicGallery.data.meta_description ? (
        <SEO
          title={title}
          description={data.prismicGallery.data.meta_description.text}
          image={
            data.prismicGallery.data.meta_image.localFile.childImageSharp.fluid
              .src
          }
          pathname={location.pathname}
        />
      ) : (
        <SEO
          title={title}
          description={data.prismicGallery.data.description.text}
          image={
            data.prismicGallery.data.meta_image.localFile.childImageSharp.fluid
              .src
          }
          pathname={location.pathname}
        />
      )}
      <SEO
        title={title}
        description={data.prismicGallery.data.description.text}
        image={
          data.prismicGallery.data.meta_image.localFile.childImageSharp.fluid
            .src
        }
        pathname={location.pathname}
      />
      <Media at="mobile">
        <StyledImageBlock
          type={type}
          title={title}
          date={date}
          featured_image={
            data.prismicGallery.data.featured_image.localFile.childImageSharp
              .fluid
          }
        />
      </Media>
      <Media at="desktop">
        <CategoryTitle>{type}</CategoryTitle>
        <Title>{title}</Title>
        <Date>{date}</Date>
        {show && (
          <LightboxModal
            show={show}
            onHide={handleClose}
            renderBackdrop={renderBackdrop}
          >
            <LightboxContentContainer>
              <LightboxButton type="button" onClick={() => setShow(false)}>
                <CloseImg src={x} />
              </LightboxButton>
              <LightboxImageContainer>
                <LightboxImage
                  fluid={selectedImage.localFile.childImageSharp.fluid}
                  style={{
                    width: `calc(80vh * ${selectedImage.localFile.childImageSharp.fluid.aspectRatio})`,
                  }}
                />
                {caption && <LightboxCaption>{caption}</LightboxCaption>}
              </LightboxImageContainer>
            </LightboxContentContainer>
          </LightboxModal>
        )}
      </Media>

      {data.prismicGallery.data.description.html && (
        <Description>
          <div
            dangerouslySetInnerHTML={{
              __html: data.prismicGallery.data.description.html,
            }}
          />
        </Description>
      )}

      <div className="gallery-grid">
        {data.prismicGallery.data.images.map(({ image, size, caption }) => {
          if (size === "Big") {
            return (
              <ImageButtonBig onClick={() => imageClicked(image, caption)}>
                <GalleryItem
                  fluid={image.localFile.childImageSharp.fluid}
                  key={image.localFile.id}
                  alt={image.alt}
                />
              </ImageButtonBig>
            )
          } else if (size === "Portrait") {
            return (
              <ImageButtonPortrait onClick={() => imageClicked(image, caption)}>
                <GalleryItem
                  fluid={image.localFile.childImageSharp.fluid}
                  key={image.localFile.id}
                  alt={image.alt}
                />
              </ImageButtonPortrait>
            )
          }
          return (
            <UnstyledButton onClick={() => imageClicked(image, caption)}>
              <GalleryItem
                fluid={image.localFile.childImageSharp.fluid}
                key={image.localFile.id}
                alt={image.alt}
              />
            </UnstyledButton>
          )
        })}
      </div>
    </>
  )
}

export default Gallery

export const pageQuery = graphql`
  query GalleryBySlug($uid: String!) {
    prismicGallery(uid: { eq: $uid }) {
      uid
      data {
        featured
        date(formatString: "Do MMM YYYY")
        description {
          html
          text
        }
        featured_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        meta_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        meta_description {
          text
        }
        images {
          image {
            alt
            localFile {
              childImageSharp {
                fluid(maxWidth: 1600) {
                  aspectRatio
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
              id
            }
          }
          caption {
            text
          }
          size
        }
        title {
          text
        }
      }
      type
    }
  }
`
