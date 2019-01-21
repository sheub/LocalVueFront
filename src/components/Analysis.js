import React, { Component } from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core";
import { Input, Grid, Typography, Button } from "@material-ui/core";

import BackgroundImage from "./../assets/SEO_Background.jpeg";
// import BackgroundImage from "./../assets/stars-1458847827jJb.jpg";

import axios from "axios";
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";

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

const styles = theme => ({
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
        this._onClick = this._onClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    _onClick() {

        this.setState({ isLoading: true });

        let url = "";

        if(process.env.NODE_ENV ==="development"){
            url = `http://localhost:8000/analysedata/${this.state.place["name"]}/address/${this.state.place["city"]} + " " + ${this.state.place["postcode"]}`;
        }
        else{
            url = `https://localvue.de/analysedata/${this.state.place["name"]}/address/${this.state.place["city"]} + " " + ${this.state.place["postcode"]}`;
        }
        var query = encodeURI(url);
        axios.get(query, {
            headers: { "Access-Control-Allow-Origin": "*" }
        })
            .then((response) => {
                this.setState({
                    data: response.data,
                    isLoading: false,
                    tableActive: true
                });
                console.log(response.data);
            })
            .catch((err) => {
                this.setState({ data: err, isLoading: false });
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
        const { classes } = this.props;

        return (

            <div className={classes.root} ref={this.props.refProp}>
                <div className={classes.formContent}>
                    <Grid container>
                        <MuiThemeProvider theme={materialTheme}>
                            <div style={{ marginBottom: "24px" }}>
                                <Typography component="h2" variant="h6" align="center" color="secondary" gutterBottom>
                                    Analysieren Sie die Sichtbarkeit Ihres Unternehmens in 2 Minuten.
                            </Typography>
                            </div>

                            <Input
                                id="name"
                                fullWidth
                                placeholder="Name Ihres Unternehmens"
                                required
                                className={classes.input}
                                inputProps={{ "aria-label": "Name", }}
                                disableUnderline
                                onChange={this._handleChange.bind(this, "name")}
                            />
                            <Input
                                id="address"
                                fullWidth
                                placeholder="Addresse Ihres Unternehmens"
                                required
                                className={classes.input}
                                inputProps={{ "aria-label": "Address", }}
                                disableUnderline
                                onChange={this._handleChange.bind(this, "address")}
                            />
                            <Grid item xs={6}>
                                <Input
                                    id="city"
                                    placeholder="Stadt"
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
                                    placeholder="Postleitzahl"
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
                                        Analyse Starten
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
                            <CustomizedTable data={this.state.data} tableActive={this.state.tableActive} />
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
};

export default withStyles(styles)(Analysis);