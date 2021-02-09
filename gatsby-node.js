
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions  }) => {
  console.log("aaaagh")
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
      let rdir = getNode(node.parent).relativeDirectory
      console.log("p: ",rdir)
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        console.log(slug)
        createNodeField({
            node,
            name: `slug`,
            value: slug,
      })
      createNodeField({
        node,
        name: `rdir`,
        value: rdir,
  })
    }
  }

  exports.createPages = async ({ graphql, actions }) => {
    const { createPage, createNodeField } = actions

    const result = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              parent {
                ... on File {
                  relativeDirectory
                }
              }
            }
          }
        }
      }
      
    `)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      //console.log(node)
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/components/KitPage.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
          rdir: node.parent.relativeDirectory,
        },
      })
    })
  }