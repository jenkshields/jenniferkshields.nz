import React, { useState } from "react"
import styled from "styled-components"
import { Modal } from "react-overlays"
import { Link } from "gatsby"
import { Media } from "../Media"

import { SiteTitle, Description } from "../components/components"
import menu from "../images/menu.svg"

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px auto;
`

const ButtonContainer = styled.div`
  justify-self: start;
  align-self: start;
  padding-top: 2vh;
  grid-column: 1;
  grid-row: 1;
`

const CleanButton = styled.button`
  all: unset;
  cursor: pointer;
`

const MenuImage = styled.img`
  padding-left: 2vw;
`

const WhiteImage = styled(MenuImage)`
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1%)
    hue-rotate(65deg) brightness(105%) contrast(101%);
`

const NavModal = styled(Modal)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1040;
  background: rgb(129, 85, 155);
  background: linear-gradient(
    148deg,
    rgba(129, 85, 155, 1) 0%,
    rgba(140, 134, 170, 1) 59%,
    rgba(164, 168, 209, 1) 100%
  );
`

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15vh 1fr;
  align-items: center;
  justify-items: center;
`

const NavLink = styled(Link)`
  background-image: none;
  font-family: "Spectral SC", serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: #fff;
  text-decoration: none;

  &:hover {
    background-image: none;
  }
`

const NavLinkButton = styled(CleanButton)`
  font-family: "Spectral SC", serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
`

const NavColumn = styled.div`
  display: grid;
  align-items: start;
  justify-items: center;
  height: 100vh;
  width: 30vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(129, 85, 155);
  background: linear-gradient(
    148deg,
    rgba(129, 85, 155, 1) 0%,
    rgba(140, 134, 170, 1) 59%,
    rgba(164, 168, 209, 1) 100%
  );
`

const Bio = styled(Description)`
  color: #fff;
`

const Nav = ({ siteTitle, bio, location }) => {
  const [show, setShow] = useState(false)
  const [path, setPath] = useState(location)

  const handleClose = () => setShow(false)

  if (path !== location) {
    handleClose()
    setPath(location)
  }

  console.log(path)

  return (
    <>
      <Media lessThan="mobile">
        <Grid>
          <ButtonContainer>
            <CleanButton type="button" onClick={() => setShow(true)}>
              <MenuImage src={menu} />
            </CleanButton>
          </ButtonContainer>

          <NavModal show={show} onHide={handleClose}>
            <ModalGrid>
              <ButtonContainer>
                <CleanButton type="button" onClick={() => setShow(false)}>
                  <WhiteImage src={menu} />
                </CleanButton>
              </ButtonContainer>
              {path === "/" ? (
                <NavLinkButton onClick={() => setShow(false)}>
                  Home
                </NavLinkButton>
              ) : (
                <NavLink to="/">Home</NavLink>
              )}
              {path === "/about" ? (
                <NavLinkButton onClick={() => setShow(false)}>
                  About
                </NavLinkButton>
              ) : (
                <NavLink to="/about">About</NavLink>
              )}
              {path === "/galleries" ? (
                <NavLinkButton onClick={() => setShow(false)}>
                  Galleries
                </NavLinkButton>
              ) : (
                <NavLink to="/galleries">Galleries</NavLink>
              )}
              {path === "/poems" ? (
                <NavLinkButton onClick={() => setShow(false)}>
                  Poems
                </NavLinkButton>
              ) : (
                <NavLink to="/poems">Poems</NavLink>
              )}
              {path === "/essays" ? (
                <NavLinkButton onClick={() => setShow(false)}>
                  Essays
                </NavLinkButton>
              ) : (
                <NavLink to="/essays">Essays</NavLink>
              )}
              {path === "/portfolio" ? (
                <NavLinkButton onClick={() => setShow(false)}>
                  Portfolio
                </NavLinkButton>
              ) : (
                <NavLink to="/portfolio">Portfolio</NavLink>
              )}
              {path === "/blog" ? (
                <NavLinkButton onClick={() => setShow(false)}>
                  Blog
                </NavLinkButton>
              ) : (
                <NavLink to="/blog">Blog</NavLink>
              )}
            </ModalGrid>
          </NavModal>
        </Grid>
      </Media>

      <Media at="desktop">
        <NavColumn>
          <div>
            <NavLink to="/">
              <SiteTitle>{siteTitle}</SiteTitle>
            </NavLink>
            <Bio>{bio}</Bio>
          </div>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/galleries">Galleries</NavLink>
          <NavLink to="/poems">Poems</NavLink>
          <NavLink to="/essays">Essays</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/blog">Blog</NavLink>
        </NavColumn>
      </Media>
    </>
  )
}

export default Nav
