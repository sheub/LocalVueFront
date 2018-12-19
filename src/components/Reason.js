import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BackgroundImage from "./../assets/AdobeStock_196152738_Preview.jpeg"



const styles = theme => ({
    containerLeft: {
        flexGrow: 1,
        padding: '0 32px',
        minHeight: "360px",
        marginTop: "12px"

    },
    containerRight:{
        margin: 0,
        backgroundImage: `url("${BackgroundImage}")`,
        minHeight: "366px",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',

    },
    button: {
        marginTop: '48px'
    },
    input: {
        margin: theme.spacing.unit,
    },
});

function Reason(props) {
    const { classes } = props;
    return (
        <Grid container direction={'row'} justify={'space-between'} align={'flex-start'} spacing={0}>
            <Grid item xs={12} sm={6}>
                <div className={classes.containerRight}>
                </div>
            </Grid>
            <Grid item xs={12} sm={6}>
                <div className={classes.containerLeft}>
                    <Typography component="h2" variant="h4" align="left" color="textPrimary" gutterBottom>
                        Warum sollten Sie Ihr Unternehmen lokal weiterempfehlen?
                    </Typography>

                    <Typography variant="body1" align="left" gutterBottom>
                        Heute ist jede dritte Internetsuche mit einer lokalen Aktivität verknüpft, z.B. wenn Sie nach Ihrer Aktivität bei Google suchen (z.B. "Friseur Leipzig").
                        Internetnutzer, die nach Einrichtungen wie Ihrer suchen, besuchen nicht unbedingt Ihre Website und verwenden häufig Informationen, die von Websites Dritter wie Google,
                        OpenStreetMap, Bing, Here, TomTom, Yelp, Foursquare veröffentlicht werden. Es ist daher unbedingt erforderlich, Sie auf diese Seiten zu verweisen!
                    </Typography>

                </div>
            </Grid>
        </Grid>
    );
}
Reason.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Reason);