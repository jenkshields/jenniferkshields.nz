import React, { useState } from "react"
import styled from "styled-components"
import { Modal } from "react-overlays"
import { Link } from "gatsby"
import { Location } from "@reach/router"

import StyledBioBlock from "./bio-block"
import menu from "../images/menu.svg"

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 40px auto;
`

const ButtonContainer = styled.div`
    justify-self: start;
    padding-top: 2vh;
    grid-column: 1;
    grid-row: 1;
`

const CleanButton = styled.button`
    all: unset;
`

const MenuImage = styled.img`
    /* width: 25px;
    height: 25px; */
    padding-left: 2vw;
`

const WhiteImage = styled(MenuImage)`
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1%) hue-rotate(65deg) brightness(105%) contrast(101%);
`

const NavModal = styled(Modal)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1040;
    background-color: purple;
`

const ModalGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    align-items: center;
    justify-items: center;
`

const NavLink = styled(Link)`
    font-family: 'Spectral SC', serif;
    font-weight: 400;
    color: #fff;
    text-decoration: none;
`

const NavLinkButton = styled(CleanButton)`
    font-family: 'Spectral SC', serif;
    font-weight: 400;
    color: #fff;
    text-decoration: none;
`

const BioContainer = styled.div`
    grid-column: 1;
    grid-row: 2;
`

const Nav = ({ siteTitle, bio, location }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const path = location;
    console.log(path);

    return (
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
                    {path === "/" ? <NavLinkButton onClick={() => setShow(false)}>Home</NavLinkButton> : <NavLink to="/">Home</NavLink>}
                    {path === "/about" ? <NavLinkButton onClick={() => setShow(false)}>About</NavLinkButton> : <NavLink to="/about">About</NavLink>}
                    {path === "/galleries" ? <NavLinkButton onClick={() => setShow(false)}>Galleries</NavLinkButton> : <NavLink to="/galleries">Galleries</NavLink>}
                    {path === "/poems" ? <NavLinkButton onClick={() => setShow(false)}>Poems</NavLinkButton> : <NavLink to="/poems">Poems</NavLink>}
                    {path === "/essays" ? <NavLinkButton onClick={() => setShow(false)}>Essays</NavLinkButton> : <NavLink to="/essays">Essays</NavLink>}
                    {path === "/portfolio" ? <NavLinkButton onClick={() => setShow(false)}>Portfolio</NavLinkButton> : <NavLink to="/portfolio">Portfolio</NavLink>}
                    {path === "/blog" ? <NavLinkButton onClick={() => setShow(false)}>Blog</NavLinkButton> : <NavLink to="/blog">Blog</NavLink>}
                </ModalGrid>
            </NavModal>

            <BioContainer>
                <StyledBioBlock siteTitle={siteTitle} bio={bio} />
            </BioContainer>
        </Grid>
    )
}

export default Nav