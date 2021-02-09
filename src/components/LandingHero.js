import React from 'react'

import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';

import useStyles from '../components/theme'

const LandingHero = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {props.h_title}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {props.h_paragraph}
            </Typography>
          </Container>
        </div>
    )
}
export default LandingHero
