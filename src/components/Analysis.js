import  React, { Component } from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core";

import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BackgroundImage from "./../assets/planet-blue.png"
import axios from "axios";

import { css } from 'react-emotion';
// First way to import
import { ClipLoader } from 'react-spinners';

import CustomizedTable from "./Table"


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const initialState = {
    error: null, // you could put error messages here if you wanted
    place: {
        name: "",
        address: "",
        city:"",
        postcode:"",
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
        backgroundRepeat: "no-repeat",
    },
    container: {
        flexGrow: 1,
        margin: "48px",

    },
    heroContent: {
        maxWidth: 600,
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

        let url = `http://localhost/LocalVue/analysedata/${this.state.place["name"]}/address/${this.state.place["city"]}`;
        var res = encodeURI(url);
        axios.get(res, {
            headers: {"Access-Control-Allow-Origin": "*"}
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
        let newPlace  = place;        
        newPlace[value] = event.currentTarget.value;

        this.setState({
            place: newPlace
        });
    }

    render() {
        const { classes } = this.props;

        return (

            <div className={classes.root}>
                <div className={classes.heroContent}>

                    <Grid container spacing={8}>
                        <MuiThemeProvider theme={materialTheme}>
                        <div style={{marginBottom: "24px"}}>
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
                        <div className={classes.button}>
                            <Grid container justify="center">
                                <Grid item>
                                    <Button onClick={this._onClick} disabled={this.state.isLoading} variant="contained" color="primary">
                                        Analyse Starten
                                    </Button>
                                    <div className='sweet-loading'>
                                        <ClipLoader
                                            className={override}
                                            sizeUnit={"px"}
                                            size={150}
                                            color={'#123abc'}
                                            loading={this.state.isLoading}
                                        />
                                    </div> 
                                </Grid>
                            </Grid>
                        </div >

                        <CustomizedTable data={this.state.data} tableActive={this.state.tableActive}/>

                    </Grid>
                </div >
            </div>
        );
    }
}

Analysis.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Analysis);