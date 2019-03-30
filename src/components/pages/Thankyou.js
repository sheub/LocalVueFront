import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

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

});

class Thankyou extends Component {


    onLoad() {

        let url = `/paypalstoreuser/${window.resultid}`;

        var query = encodeURI(url);
        axios.get(query, {
            headers: { "Access-Control-Allow-Origin": "*" }
        })
            .then((approvalUrl) => {
                // similar behavior as an HTTP redirect
                // window.location.replace(approvalUrl);
                // console.log(approvalUrl.data);
            })
            .catch((err) => {
                // this.setState({ resultData: err });
                // console.log(err); //<--- Go down one more stream
            });
    }

    render() {
        this.onLoad();
        const { auth, classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="container p-2 mx-auto flex flex-col">
                            <h1>This is Thank you page</h1>
                            <h2>Merci {auth.user.name}</h2>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const propTypes = {
    auth: PropTypes.object.isRequired,
};


Thankyou.propTypes = propTypes;


var mapStateToProps = (state) => {
    return {
        auth: state.auth,
        // resultData: state.appReducer.resultData,
    };
};


export default connect(mapStateToProps)(withStyles(styles)(Thankyou));