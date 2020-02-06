import { createMedia } from "@artsy/fresnel"

const QueryBreakpoints = createMedia({
  breakpoints: {
    mobile: 749,
    desktop: 750,
  },
})

export const mediaStyles = QueryBreakpoints.createMediaStyle()
export const { Media, MediaContextProvider } = QueryBreakpoints
