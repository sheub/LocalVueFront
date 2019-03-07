import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Button from '@material-ui/core/Button';




const styles = theme => ({
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

        // this.props.setStateValue("placeInfo", this.state.place);
        
        let url = "";
        url = `https://localvue.de/paypalredirect/`;

        var query = encodeURI(url);
        axios.get(query, {
            headers: { "Access-Control-Allow-Origin": "*" }
        })
            .then((approvalUrl) => {
                // similar behavior as an HTTP redirect
                window.location.replace(approvalUrl.data);
                // this.setState({
                //     user: response.data,
                //     tableActive: true,
                // });
                // // store resultData
                // this.props.setStateValue("resultData", this.state.resultData);
                console.log(approvalUrl.data);
            })
            .catch((err) => {
                this.setState({ resultData: err});
                console.log(err); //<--- Go down one more stream
            });
    }

    render() {
        const { classes} = this.props;
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

                {/* <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                    <input type="hidden" name="business" value="barre@zoestha.de" />
                    <input type="hidden" name="lc" value="US" />
                    <input type="hidden" name="no_note" value="1" />
                    <input type="hidden" name="src" value="1" />
                    <input type="hidden" name="a3" value="2.00" />
                    <input type="hidden" name="p3" value="1" />
                    <input type="hidden" name="t3" value="W" />
                    <input type="hidden" name="currency_code" value="EUR" />
                    <input type="hidden" name="srt" value="2" />
                    <input type="hidden" name="bn" value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHostedGuest" />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                </form> */}

            </div>

                </Grid>
            </Grid>
        </div>
        );
    }
}

const propTypes = {
    auth: PropTypes.object.isRequired,
    resultData: PropTypes.array,
    // placeInfo: PropTypes.object,
};


Checkout.propTypes = propTypes;


var mapStateToProps = (state) => {
    return {
        auth: state.auth,
        resultData: state.appReducer.resultData,
    }
}


export default connect(mapStateToProps)(withStyles(styles)(Checkout));