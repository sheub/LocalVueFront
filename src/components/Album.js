import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MarkerIcon from "./../assets/marker.svg"


import Analysis from './Analysis';
import Reason from './Reason';
import Footer from './Footer';
import Slider from './Slider';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    // marginTop: theme.spacing.unit * 4,
    margin: "auto"
  },
  containerLeft: {
    flexGrow: 1,
    padding: '0 32px',
    minHeight: "150px",
    display: "flex",
  },
  containerRight: {
    minHeight: "360px",
    margin: "auto",
    display: "flex",

  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});




class Album extends Component {

  constructor(props) {
    super(props);

    this.myRef = React.createRef() // create a ref object 
  }

scrollToMyRef = () => {
  window.scrollTo({
      top:this.myRef.current.offsetTop, 
      behavior: "smooth"
  })
}
  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <div style={{ maxWidth: "1140px", margin: "auto" }}>
          <CssBaseline />
          <main>
            <div className={classes.heroUnit}>

              <Grid container direction={'row'} align={'center'} style={{ backgroundColor: "#f1f1f1" }}>
                <Grid item xs={12} sm={6}>
                  <div className={classes.containerRight}>
                    <Grid container direction={'row'} style={{ margin: "auto" }} spacing={32}>
                      <Grid item xs={12} sm={2}>
                        <div>
                          <img style={{ maxWidth: "52px", margin: "auto", paddingTop: "18px" }} src={MarkerIcon} alt="MarkerIcon" />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={10}>
                        <Typography component="h1" variant="h2" align="left" color="inherit" gutterBottom>
                          Local Vue
                      </Typography>
                        <Typography variant="h6" align="left" color="textSecondary" paragraph>
                          Gewinnen Sie neue Kunden, indem Sie Ihr Unternehmen überall im Internet bewerben:
                          Google, OpenStreetMap, Bing, Here, TomTom, Yelp und Foursquare.
                      </Typography>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} style={{display: "flex"}}>
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
              <div >
                <Analysis refProp={this.myRef} />
              </div>
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