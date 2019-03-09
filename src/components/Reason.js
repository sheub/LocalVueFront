import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import BackgroundImage from "./../assets/GPS_Smartphone_570x381.jpg";
import { withTranslation } from "react-i18next";


const styles = () => ({
    containerLeft: {
        flexGrow: 1,
        padding: "0 32px",
        minHeight: "360px",
        marginTop: "12px"
    },

    button: {
        marginTop: "48px"
    },

});

function Reason(props) {
    const { t, classes } = props;
    return (
        <Grid container direction={"row"} align={"flex-start"} spacing={0}>
            <Grid item xs={12} sm={6}>
                <picture>
                    <source srcSet={BackgroundImage} type="image/webp" />
                    <source srcSet={BackgroundImage} type="image/jpeg" />
                    <img style={{ margin: "auto", maxWidth: "100%", marginBottom: "-4px" }} src={BackgroundImage} alt="Orientierung" />
                </picture>
            </Grid>
            <Grid item xs={12} sm={6}>
                <div className={classes.containerLeft}>
                    <Typography component="h2" variant="h4" align="left" color="textPrimary" gutterBottom>
                        {t("home.reasonTitle")}

                    </Typography>

                    <Typography variant="body1" align="left" gutterBottom>
                        {t("home.reasonText")}
                    </Typography>

                </div>
            </Grid>
        </Grid>
    );
}
Reason.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withTranslation("translations")(Reason));