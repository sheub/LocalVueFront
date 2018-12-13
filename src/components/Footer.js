import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from "@material-ui/core/";

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
      },
    });

class Footer extends Component {



    render() {

        const { classes } = this.props;

        return (
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
            </footer>
        );
    }
}
Footer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Footer);