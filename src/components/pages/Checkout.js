import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import Button from "@material-ui/core/Button";

import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";


import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const initialState = {
    isLoading: false,
};

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        minWidth: "100vh",
        minHeight: "100%",
        marginTop: "24px",
        marginBottom: "36px",
    },

    container: {
        flexGrow: 1,
        margin: "48px",
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

});

class Checkout extends Component {
    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);
        this.state = initialState;
    }

    _onClick() {

        this.setState({ isLoading: true });
        let url = "https://localvue.de/paypalredirect/";

        var query = encodeURI(url);
        axios.get(query, {
            headers: { "Access-Control-Allow-Origin": "*" }
        })
            .then((approvalUrl) => {
                // similar behavior as an HTTP redirect
                window.location.replace(approvalUrl.data);
                // console.log(approvalUrl.data);
            })
            .catch((err) => {
                // this.setState({ resultData: err });
                // console.log(err); //<--- Go down one more stream
            });
    }

    render() {
        const { classes, location } = this.props;
        const tier = location.state ? location.state.tier : null;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="container p-2 mx-auto flex flex-col">
                            <h1>Your plan</h1>
                            {/* <h2>Welcome {auth.user.name}</h2> */}
                            {/* <a href="{{ /paypalredirect }}" >Abonnement anlegen</a> */}
                            {tier ? <Grid container spacing={40} alignItems="flex-end">
                                <Grid item key={tier.title} >
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
                                    </Card>
                                </Grid>
                            </Grid> : null}

                            <Grid container direction={"row"} justify={"space-between"} align={"flex-start"} spacing={32}>
                                <Grid item xs={6} sm={3}>
                                    <Button onClick={this._onClick} variant="contained" color="primary">
                                        Pay with PayPal
                                    </Button>
                                </Grid>
                                {this.state.isLoading ?
                                <Grid item xs={12} sm={6}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>
                                            Please be patient, you will be redirected to Paypal.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div className="sweet-loading" style={{ verticalAlign: "bottom" }}>
                                            <ClipLoader
                                                className={override}
                                                sizeUnit={"px"}
                                                size={24}
                                                color={"#123abc"}
                                                loading={this.state.isLoading}
                                            />
                                        </div>
                                    </Grid>
                                </Grid> : null}
  
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const propTypes = {
    auth: PropTypes.object.isRequired,
    // resultData: PropTypes.array,
    tier: PropTypes.object.isRequired,
};


Checkout.propTypes = propTypes;


var mapStateToProps = (state) => {
    return {
        auth: state.auth,
        // resultData: state.appReducer.resultData,
    }
};


export default connect(mapStateToProps)(withStyles(styles)(Checkout));