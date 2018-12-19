import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, Typography, createMuiTheme, withStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    footer: {
        backgroundColor: "#343a40",
        padding: theme.spacing.unit * 6,
    },
});

const materialTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },

    palette:
    {
        primary: {
            main: "#14222D",
        },
        secondary: {
            // main: "#5d6678",
            main: "#fff",
        }
    },

});

class Footer extends Component {

    render() {
        const { classes } = this.props;
        return (

            <footer className={classes.footer}>
                <MuiThemeProvider theme={materialTheme}>
                    <div style={{ maxWidth: "1140px", margin: "auto" }}>
                        <Grid container direction={'row'} justify={'space-between'} align={'flex-start'} spacing={32}>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="overline" align="left" color="secondary" component="p" gutterBottom>
                                    Zoestha UG (haftungsbeschränkt)
                                </Typography>
                                <Typography variant="body2" align="left" color="secondary" component="p">
                                    Fockestr. 23, 04275 Leipzig.
                                </Typography>
                                <Typography variant="body2" align="left" color="secondary" component="p">
                                    Amtsgericht Leipzig
                                </Typography>
                                <Typography variant="body2" align="left" color="secondary" component="p">
                                    Handelsregisternummer hrb 32943.
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </MuiThemeProvider>
                <Grid container direction={'row'} justify={'space-between'} align={'flex-start'} spacing={32}>
                    <Grid item xs={6} sm={3}>
                    </Grid>
                        <Grid item xs={6} sm={3}>
                        <Typography variant="subtitle1" align="right" color="secondary" component="p">
                                Impressum
                            </Typography>

                        {/* <Typography variant="subtitle1" align="right" color="secondary" component="p">
                        About
                            </Typography>                             */}

                    </Grid>
                </Grid>

                {/* <Typography variant="subtitle1" align="right" color="textSecondary" component="p">
                    Copyright © 2018. Zoestha. All rights reserved.
                </Typography> */}
            </footer>
        );
    }
}
Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);