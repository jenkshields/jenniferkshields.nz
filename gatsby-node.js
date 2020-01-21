/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const galleryPage = await graphql(`
    {
      allPrismicGallery {
        edges {
          node {
            uid
          }
        }
      }
    }
  `)

  const essayPage = await graphql(`
    {
      allPrismicEssay {
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
  galleryPage.data.allPrismicGallery.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: galleryTemplate,
      context: {
        uid: edge.node.uid,
      },
    })
  })

  essayPage.data.allPrismicEssay.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: essayTemplate,
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
    `
  createTypes(typeDefs)
}
