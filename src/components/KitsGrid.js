import React from 'react'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link } from "gatsby-theme-material-ui";
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import useStyles from '../components/theme'
  

const KitsGrid = () => {
    const classes = useStyles();
    const data = useStaticQuery(graphql`
    query KitsQuery  {
      allMarkdownRemark(filter: {frontmatter: {type: {eq: "index"}}}) {
        edges {
          node {
            id
            frontmatter {
              title
              type
              path
              name
              blurb
              image {
                childImageSharp{
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
    
      
  `)
    return (
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {data.allMarkdownRemark.edges.map((card) => {
              return (
              <Grid item key={card} xs={12} sm={6} md={4} >
                <Card className={classes.card} elevation={3}>
                    <Img fluid={card.node.frontmatter.image.childImageSharp.fluid} />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.node.frontmatter.name}
                    </Typography>
                    <Typography>
                      {card.node.frontmatter.blurb}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={card.node.fields.slug}>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </Link>

                  </CardActions>
                </Card>
              </Grid>
            )})}
          </Grid>
        </Container>
    )
}

export default KitsGrid