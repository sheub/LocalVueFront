import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Button from "@material-ui/core/Button";




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

    formContent: {
        maxWidth: 600,
        margin: "0 auto",
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },

    table: {
        maxWidth: 800,
        margin: "0 auto",
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
});

class Checkout extends Component {
    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {


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
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="container p-2 mx-auto flex flex-col">
                            <h1>This is checkout page</h1>
                            {/* <h2>Welcome {auth.user.name}</h2> */}
                            {/* <a href="{{ /paypalredirect }}" >Abonnement anlegen</a> */}
                            <Grid container direction={"row"} justify={"space-between"} align={"flex-start"} spacing={32}>
                                <Grid item>
                                    <Button onClick={this._onClick} variant="contained" color="primary">
                                        Pay with PayPal
                                    </Button>
                                </Grid>
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
    // placeInfo: PropTypes.object,
};


Checkout.propTypes = propTypes;


var mapStateToProps = (state) => {
    return {
        auth: state.auth,
        // resultData: state.appReducer.resultData,
    }
};


export default connect(mapStateToProps)(withStyles(styles)(Checkout));