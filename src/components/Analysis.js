import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core";
import { Input, Grid, Typography, Button } from "@material-ui/core";

import BackgroundImage from "./../assets/SEO_Background_petit.jpg";

import axios from "axios";
import { setStateValue } from "./actions/index";  
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";
import { withTranslation } from "react-i18next";

const CustomizedTable = React.lazy(() => import("./Table"));


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const initialState = {
    place: {
        name: "",
        address: "",
        city: "",
        postcode: "",
    },
    isLoading: false,
};

const styles = (theme) => ({
    root: {
        margin: 0,
        backgroundImage: `url("${BackgroundImage}")`,
        minHeight: "354px",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "repeat-y",
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
    button: {
        marginTop: "48px"
    },

    input: {
        margin: theme.spacing.unit,
        color: "white",
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
            main: "#fff",
        }
    },

    overrides: {

        MuiInputBase: {
            input: {
                background: "inherit",
                backgroundColor: "rgba(255, 255, 255, 0.19)",
                padding: "7px",
            }
        },

        MuiPickersCalendar: {
            transitionContainer: {
                minHeight: 180,
            },
        },
        MuiPickersModal: {
            dialog: {
                width: "310px",
                minHeight: 355,
            },
        }
    },
});

class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.state.tableActive = false;
        // this._onClick = this._onClick.bind(this);
        // this._handleChange = this._handleChange.bind(this);
    }

    _onClick = (e) => {

        this.setState({ isLoading: true });
        this.props.setStateValue("placeInfo", this.state.place);
        
        let url = "";
        if (process.env.NODE_ENV === "production") {
            url = `/analysedata/${this.state.place["name"]}/address/${this.state.place["city"]} + " " + ${this.state.place["postcode"]}`;
          } else { // Dev server runs on port 3000
            url = `http://localhost:5000/analysedata/${this.state.place["name"]}/address/${this.state.place["city"]} + " " + ${this.state.place["postcode"]}`;
          }
        

        var query = encodeURI(url);
        axios.get(query, {
            headers: { "Access-Control-Allow-Origin": "*" }
        })
            .then((response) => {
                this.setState({
                    resultData: response.data,
                    isLoading: false,
                    tableActive: true,
                });
                // store resultData
                this.props.setStateValue("resultData", this.state.resultData);
                // console.log(response.data);
            })
            .catch((err) => {
                this.setState({ resultData: err, isLoading: false });
                console.log(err); //<--- Go down one more stream
            });
    }

    _handleChange = (value, event) => {

        const { place } = this.state;
        let newPlace = place;
        newPlace[value] = event.currentTarget.value;

        this.setState({
            place: newPlace
        });
    }

    render() {
        const { t, classes, resultData } = this.props;
        if(!(!resultData || typeof(resultData) == "undefined") && (typeof(this.state.resultData) == "undefined")){
            this.setState({
                resultData: resultData,
                isLoading: false,
                tableActive: true,
            });
        }

        return (

            <div className={classes.root} ref={this.props.refProp}>
                <div className={classes.formContent}>
                    <Grid container>
                        <MuiThemeProvider theme={materialTheme}>
                            <div style={{ marginBottom: "24px" }}>
                                <Typography component="h2" variant="h6" align="center" color="secondary" gutterBottom>
                                {t("home.analysisTitle")}
                            </Typography>
                            </div>

                            <Input
                                id="name"
                                fullWidth
                                placeholder={t("home.inputName")}
                                required
                                className={classes.input}
                                inputProps={{ "aria-label": "Name", }}
                                disableUnderline
                                onChange={this._handleChange.bind(this, "name")}
                            />
                            <Input
                                id="address"
                                fullWidth
                                placeholder={t("home.inputAddress")}
                                required
                                className={classes.input}
                                inputProps={{ "aria-label": "Address", }}
                                disableUnderline
                                onChange={this._handleChange.bind(this, "address")}
                            />
                            <Grid item xs={6}>
                                <Input
                                    id="city"
                                    placeholder={t("home.city")}
                                    required
                                    className={classes.input}
                                    inputProps={{ "aria-label": "city", }}
                                    disableUnderline
                                    onChange={this._handleChange.bind(this, "city")}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Input
                                    id="postcode"
                                    placeholder={t("home.postcode")}
                                    className={classes.input}
                                    inputProps={{ "aria-label": "postcode", }}
                                    disableUnderline
                                    onChange={this._handleChange.bind(this, "postcode")}
                                />
                            </Grid>
                        </MuiThemeProvider>
                        <div className={classes.button} style={{ margin: 6 }}>
                            <Grid container direction={"row"} justify={"space-between"} align={"flex-start"} spacing={32}>
                                <Grid item>
                                    <Button onClick={this._onClick} disabled={this.state.isLoading} variant="contained" color="primary">
                                    {t("home.buttonStartAnalysysis")}
                                    </Button>
                                </Grid>
                                <div className="sweet-loading" style={{ verticalAlign: "bottom" }}>
                                    <ClipLoader
                                        className={override}
                                        sizeUnit={"px"}
                                        size={32}
                                        color={"#123abc"}
                                        loading={this.state.isLoading}
                                    />
                                </div>
                            </Grid>
                        </div>
                    </Grid>
                </div>
                <div className={classes.table}>
                    {(this.state.tableActive) ?
                        <React.Suspense fallback={<div> </div>}>
                            <CustomizedTable data={this.state.resultData} tableActive={this.state.tableActive} />
                        </React.Suspense>
                        : null
                    }
                </div>

            </div>
        );
    }
}

Analysis.propTypes = {
    classes: PropTypes.object.isRequired,
    placeInfo: PropTypes.object,
    resultData: PropTypes.object,
    setStateValue: PropTypes.func,
    // languageSet: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
      setStateValue: (key, value) => dispatch(setStateValue(key, value)),
    };
  };

var mapStateToProps = (state) => {
    return {
        placeInfo: state.appReducer.placeInfo,
        resultData: state.appReducer.resultData,
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTranslation()(Analysis)));