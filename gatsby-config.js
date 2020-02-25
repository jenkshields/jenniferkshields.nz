require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Jennifer K. Shields`,
    description: `Photographer, organiser, web developer.`,
    author: `Jennifer K. Shields`,
    image: "/images/bio-bg.jpg",
    url: "https://jenniferkshields.nz",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `jenniferkshieldsnz`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
        schemas: {
          about: require("./src/schemas/about.json"),
          blog: require("./src/schemas/blog.json"),
          essay: require("./src/schemas/essay.json"),
          gallery: require("./src/schemas/gallery.json"),
          homepage: require("./src/schemas/homepage.json"),
          poem: require("./src/schemas/poem.json"),
          portfolio: require("./src/schemas/portfolio.json"),
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-fathom`,
      options: {
        trackingUrl: `fathom.jenniferkshields.nz`,
        siteId: `WTGEJ`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
