import React from "react"
import { useMediaQuery } from "react-responsive"

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 749 })
  return isMobile ? children : null
}

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 750 })
  return isDesktop ? children : null
}
