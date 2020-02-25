import { useStaticQuery, graphql } from "gatsby"

export const usePrismicHomepage = () => {
  const { prismicHomepage } = useStaticQuery(
    graphql`
      query HomepageQuery {
        prismicHomepage {
          data {
            title {
              text
            }
            bio {
              text
            }
            meta_image {
              fluid(maxWidth: 1000) {
                ...GatsbyPrismicImageFluid
              }
            }
          }
        }
      }
    `
  )
  return prismicHomepage.data
}
