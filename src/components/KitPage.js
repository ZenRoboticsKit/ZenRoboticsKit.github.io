import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby-theme-material-ui";

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Collapse } from "@material-ui/core";

// Credit to Tsubasa Kondo for an awesome example.

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  menuTitle: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  toc: {
    paddingLeft: theme.spacing(1),
    dense: false,
    [theme.breakpoints.up('sm')]: {
      dense: true,
    },
  },
  tocNested: {
    paddingLeft: theme.spacing(4),
    dense: false,
    [theme.breakpoints.up('sm')]: {
      dense: true,
    },
  },
}));
function KitPage({data}) {
  const post = data.markdownRemark
  const links = data.allMarkdownRemark
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
const drawer = (
    <div>
      <List component="nav">


        {links.edges.map( ({node}) => (
          <>
          <ListItem button component={Link} to={node.fields.slug} className={classes.toc}>
            <ListItemText primary={node.frontmatter.name} />


          </ListItem>
          <Collapse in={true}>
            
            {node.headings.map( ({value,id,depth}) => (
                <ListItem button component={Link} to={node.fields.slug+'#'+id} className={classes.tocNested}>
                  <ListItemText primary={value} />
                </ListItem>
              )
            )}
            
            </Collapse> 
        </>
        ))}
      </List>
    </div>
  );
return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>

        <IconButton
            color="inherit"
            aria-label="Go Back"
            edge="start"
            component={Link}
            to='/'
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" noWrap className={classes.menuTitle}> 
          {post.frontmatter.name}
          </Typography>

          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor='right'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon/>
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>  
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <div dangerouslySetInnerHTML={{ __html: post.html }}/>
      </div>
    </div>
  );
}
KitPage.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default KitPage;

export const query = graphql`
query MyQuery($slug: String, $rdir: String) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
  id
  html
  frontmatter {
    name
  }
  fields {
    slug
  }
}
allMarkdownRemark(filter: {fields: {rdir: {eq: $rdir}}}, sort: {fields: frontmatter___order}) {
edges {
  node {
    id
    frontmatter {
      name
      order
    }
    fields {
    slug
    rdir
    }
    headings {
      value
      depth
      id
    }
  }
}
}
}

`