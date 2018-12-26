import React, { Component } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MarkerIcon from "./../assets/marker.svg"

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MapIcon from '@material-ui/icons/Map';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

import Analysis from "./Analysis";
import Reason from "./Reason";
import Footer from "./Footer";
import Slider from "./Slider";

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },

  heroButtons: {
    margin: "auto"
  },
  containerLeft: {
    flexGrow: 1,
    padding: "0 32px",
    minHeight: "150px",
    display: "flex",
  },
  containerRight: {
    minHeight: "360px",
    margin: "auto",
    display: "flex",
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});


class Album extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef() // create a ref object 
  }

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  scrollToMyRef = () => {
    window.scrollTo({
      top: this.myRef.current.offsetTop,
      behavior: "smooth"
    })
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };


  render() {

    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >

        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );


    return (
      <React.Fragment>
        <div style={{ maxWidth: "1140px", margin: "auto" }}>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <MapIcon className={classes.icon} />
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Local Vue
          </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
          {renderMobileMenu}

          <main>
            <div className={classes.heroUnit}>
              <Grid container direction={"row"} align={"center"} style={{ backgroundColor: "#f1f1f1" }}>
                <Grid item xs={12} sm={6}>
                  <div className={classes.containerRight}>
                    <Grid container direction={"row"} style={{ margin: "auto" }} spacing={32}>
                      <Grid item xs={12} sm={2}>
                        <div>
                          <img style={{ maxWidth: "52px", margin: "auto", paddingTop: "18px" }} src={MarkerIcon} alt="MarkerIcon" />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={10}>
                        <Typography component="h1" variant="h2" align="left" color="inherit" gutterBottom>
                          Local Vue
                      </Typography>
                        <Typography variant="h6" align="left" paragraph>
                          Gewinnen Sie neue Kunden, indem Sie Ihr Unternehmen überall im Internet bewerben:
                          Google, OpenStreetMap, Bing, Here, TomTom, Yelp und Foursquare.
                      </Typography>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} style={{ display: "flex" }}>
                  <div className={classes.containerLeft}>
                    <div className={classes.heroButtons}>
                      <Grid container spacing={16}>
                        <Grid item>
                          <Button variant="contained" onClick={this.scrollToMyRef} color="primary">
                            Analysieren Sie Ihre Sichtbarkeit in 2 Minuten.
                        </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Reason />
              <Analysis refProp={this.myRef} />
            </div>
          </main>
        </div>
        <Slider />
        <Footer />
      </React.Fragment>
    );
  }
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);