import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import PlaceIcon from '@material-ui/icons/Place';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// import { Link } from 'react-router'
// import SvgIcon from '@material-ui/core/SvgIcon';
// import MarkerIcon from "./../assets/marker.svg"

import Analysis from './Analysis';
import Reason from './Reason';
import Footer from './Footer';

// function HomeIcon(props) {
//   return (
//     <SvgIcon {...props}>
//       <img src={MarkerIcon} alt="" width="300" height="200" />
//     </SvgIcon>
//   );
// }


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
    marginTop: theme.spacing.unit * 4,
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


function Album(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <PlaceIcon className={classes.icon} />
          {/* <img src={MarkerIcon}/> */}
          <Typography variant="h6" color="inherit" noWrap>
            Local Vue
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
            Local Vue
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Gewinnen Sie neue Kunden, indem Sie Ihr Unternehmen überall im Internet bewerben: 
            Google, OpenStreetMap, Bing, Here, TomTom, Yelp, Foursquare und viele andere Plattformen.....
            </Typography>
            <div className={classes.heroButtons}>
            
              <Grid container spacing={16} justify="center">
                <Grid item>
                {/* <Link to="Analysis">
                  <Button variant="contained" color="primary">
                  Analysieren Sie Ihre Sichtbarkeit in 2 Minuten.
                  </Button>
                  </Link> */}
                </Grid>
              </Grid>
            </div>
          </div>
          <Reason />
          <div >
            <Analysis key="Analysis"/>
            </div>
        </div>
        
      </main>
    <Footer />
    </React.Fragment>
  );
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);