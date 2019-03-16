import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";


import { Link } from "react-router-dom";
const MyLinkToRegister = (props) => <Link to="/register" {...props} />;
// const MyLinkToCheckout = (props) => <Link to="/checkout" {...props} />;


const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },

  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto",
    },
    marginBottom: theme.spacing.unit * 8,

  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
});

const tiers = [
  {
    title: "Free",
    price: "0",
    description: ["Check your online presence", "Limited number of places", "Email support"],
    buttonText: "Sign up for free",
    component: MyLinkToRegister,
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "2",
    description: [
      "Correct your online presence",
      "Two weeks Unlimited usage",
      "Priority email support",
    ],
    buttonText: "Get started",
    // component: (props) => <Link to="/checkout" {...props}  tier={tiers[1]}/>,
    buttonVariant: "contained",
  },
  {
    title: "Enterprise",
    price: "30",
    description: [
      "Correct your online presence",
      "Unlimited usage",
      "Priority email support",
    ],
    buttonText: "Contact us",
    component: MyLinkToRegister,
    buttonVariant: "outlined",
  },
];

function Pricing(props) {
  const { t, classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {t("Pricing.title")}
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" component="p">
          {t("Pricing.titleText")}
          {/* Quickly correct you Digital visibility with LocalVue.
            The additional links to the partners allow to add new features or correct their entires if they are inexact. */}
          </Typography>
        </div>
        {/* End hero unit */}
        <Grid container spacing={40} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === "Enterprise" ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {tier.price}€
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      {tier.title === "Pro" ? "for 2 Weeks" : "/mo"}
                    </Typography>
                  </div>
                  {tier.description.map(line => (
                    <Typography variant="subtitle1" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button 
                    fullWidth
                    variant={tier.buttonVariant}
                    component = { (props) => <Link to={{pathname: "/checkout", state: {tier: tiers[1]}}} {...props}/> }
                    color="primary"
                    >
                      {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>

    </React.Fragment>
  );
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withTranslation()(Pricing));