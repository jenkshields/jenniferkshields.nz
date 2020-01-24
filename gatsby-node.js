/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = await graphql(`
    {
      allPrismicAbout {
        edges {
          node {
            uid
          }
        }
      }
      allPrismicEssay {
        edges {
          node {
            uid
          }
        }
      }
      allPrismicGallery {
        edges {
          node {
            uid
          }
        }
      }
      allPrismicPoem {
        edges {
          node {
            uid
          }
        }
      }
      allPrismicBlog {
        edges {
          node {
            uid
          }
        }
      }
      allPrismicPortfolio {
        edges {
          node {
            uid
          }
        }
      }
    }
  `)

  const galleryTemplate = path.resolve("src/templates/gallery.js")
  const essayTemplate = path.resolve("src/templates/essay.js")
  const aboutTemplate = path.resolve("src/templates/about.js")
  const poemTemplate = path.resolve("src/templates/poem.js")
  const blogTemplate = path.resolve("src/templates/blog.js")
  const portfolioTemplate = path.resolve("src/templates/portfolio.js")
  pages.data.allPrismicGallery.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: galleryTemplate,
      context: {
        uid: edge.node.uid,
      },
    })
  })

  pages.data.allPrismicEssay.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: essayTemplate,
      context: {
        uid: edge.node.uid,
      },
    })
  })

  pages.data.allPrismicAbout.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: aboutTemplate,
      context: {
        uid: edge.node.uid,
      },
    })
  })

  pages.data.allPrismicPoem.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: poemTemplate,
      context: {
        uid: edge.node.uid,
      },
    })
  })

  pages.data.allPrismicBlog.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: blogTemplate,
      context: {
        uid: edge.node.uid,
      },
    })
  })

  pages.data.allPrismicPortfolio.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: portfolioTemplate,
      context: {
        uid: edge.node.uid,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
        interface indexPosts @nodeInterface {
            id: ID!
            uid: String!
            data: Data!
            type: String!
        }

        type Data {
            title: Title!
            date: Date! @dateformat
            featured: String!
            featured_image: Featured_image!
            body: Body!
        }

        type Title {
            text: String!
        }

        type Featured_image {
            localFile: File
        }
        

        type Body {
            html: String!
        }

        type PrismicGallery implements Node & indexPosts {
            uid: String!
            data: Data!
            type: String!
        }

        type PrismicEssay implements Node & indexPosts {
            uid: String!
            data: Data!
            type: String!
        }

        type PrismicPoem implements Node & indexPosts {
          uid: String!
          data: Data!
          type: String!
      }

      type PrismicPortfolio implements Node & indexPosts {
        uid: String!
        data: Data!
        type: String!
    }

    type PrismicBlog implements Node & indexPosts {
      uid: String!
      data: Data!
      type: String!
  }
    `
  createTypes(typeDefs)
}
