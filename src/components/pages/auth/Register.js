import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { getIntendedUrl } from "../../helpers/auth";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import PropTypes from "prop-types";
import { registerUser, googleSignIn } from "../../actions/auth";
import { destructServerErrors, hasError, getError } from "../../helpers/error";
import Button from "@material-ui/core/Button";
// const SignIn = React.lazy(() => import("./SignIn"));
// import GoogleSignIn from "../../GoogleSignIn";

const propTypes = {
  registerUser: PropTypes.func.isRequired,
  googleSignIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  firstContainer: {
    marginTop: 48,
    marginBottom: 54,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    maxWidth: 500,
  },
  button: {
    // margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
    float: "right"
  },
  signin: {
    margin: theme.spacing.unit,
    float: "left"
  }
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: "",
      SignInFormVisible: false,

    };
  }

  registerSuccess() {
    this.props.history.push("/");
    getIntendedUrl().then(url => this.props.history.push(url));

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.registerUser(this.state)
      .then(response => this.registerSuccess())
      .catch(error => this.setState({ errors: destructServerErrors(error) }));
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {
        ...this.state.errors,
        ...{ [e.target.name]: "" }
      }
    });
  }

  openSignIn = () => {
    this.setState({ anchorEl: null, SignInFormVisible: true });
    this.handleMobileMenuClose();
  };

  handleClose = () => {
    this.setState({
      SignInFormVisible: false
    });
  }

  handleGoogleSignInSuccess(credentials) {
    this.props.googleSignIn(credentials)
      .then(response => this.registerSuccess())
      .catch(error => this.setState({ errors: destructServerErrors(error) }));
  }

  render() {
    const { classes } = this.props;

    return (
      <DocumentTitle title={`Register `} >
        <div className={classes.firstContainer}>
          <Paper className={classes.paper}>

            <Grid container className={classes.root}
              direction="row"
              justify="center"
              alignItems="center"
              spacing={16}
            >
              <Grid item xs={12}>
                <form onSubmit={e => this.handleSubmit(e)} method="POST" >


                  <h2 className="text-center mt-4 mb-6 text-grey-darker">Register</h2>
                  <div className="mb-4">
                    {/* <label className="block text-grey-darkest text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                
                password_confirmation

                <input
                  value={this.state.name}
                  onChange={e => this.handleInputChange(e)}
                  type="text"
                  id="username"
                  name="name"
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight"
                  placeholder="jane doe"
                  required
                  autoFocus />

                {hasError(this.state.errors, "name") &&
                  <p className="text-red text-xs pt-2">{getError(this.state.errors, "name")}</p>
                } */}
                    <TextField
                      value={this.state.name}
                      onChange={e => this.handleInputChange(e)}
                      id="username"
                      name="name"
                      type="text"
                      margin="dense"
                      label="name"
                      required
                      autoFocus
                      fullWidth

                    />
                  </div>

                  <div className="mb-4">
                    {/* <label className="block text-grey-darkest text-sm font-bold mb-2" htmlFor="email">
                  Email address
                </label> */}
                    <TextField
                      value={this.state.email}
                      onChange={e => this.handleInputChange(e)}
                      id="email"
                      name="email"
                      type="email"
                      // errorText = "Please Enter valid email"
                      required
                      margin="dense"
                      label="Email Address"
                      fullWidth

                    />
                    {/* <input
                  value={this.state.email}
                  onChange={e => this.handleInputChange(e)}
                  id="email"
                  name="email"
                  type="email"
                  className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError(this.state.errors, "name") ? "border-red" : ""}`}
                  placeholder="jane@example.com"
                  required /> */}

                    {/* {hasError(this.state.errors, "email") &&
                  <p className="text-red text-xs pt-2">{getError(this.state.errors, "email")}</p>
                } */}
                  </div>

                  <div className="mb-4">
                    {/* <label className="block text-grey-darkest text-sm font-bold mb-2" htmlFor="password"> Password </label> */}
                    {/* <input
                  value={this.state.password}
                  onChange={e => this.handleInputChange(e)}
                  type="password"
                  id="password"
                  name="password"
                  className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError(this.state.errors, "password") ? "border-red" : ""}`}
                  minLength={6}
                  required /> */}
                    <TextField
                      value={this.state.password}
                      onChange={e => this.handleInputChange(e)}
                      type="password"
                      id="password"
                      name="password"
                      required={true}
                      margin="dense"
                      label="Password"
                      minLength={6}
                      fullWidth

                    />

                    {/* {hasError(this.state.errors, "password") &&
                  <p className="text-red text-xs pt-2">{getError(this.state.errors, "password")}</p>
                } */}
                  </div>

                  <div className="mb-4">
                    <TextField
                      value={this.state.password_confirmation}
                      onChange={e => this.handleInputChange(e)}
                      type="password"
                      id="password_confirmation"
                      name="password_confirmation"
                      required={true}
                      margin="dense"
                      label="password_confirmation"
                      minLength={6}
                      fullWidth

                    />
                    {/* <label className="block text-grey-darkest text-sm font-bold mb-2" htmlFor="password_confirmation"> Password confirmation </label>
                <input
                  value={this.state.password_confirmation}
                  onChange={e => this.handleInputChange(e)}
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker  ${hasError(this.state.errors, "password") ? "border-red" : ""}`}
                  required /> */}

                  </div>
                  <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Register
                  </Button>
                  {/* <div className="mb-2">
                <button className="border rounded-full p-3 text-white bg-indigo w-full font-bold hover:bg-indigo-dark">Register</button>
              </div> */}
                </form>
              </Grid>
              {/* <div className={classes.signin}>
                <div>Already have an account?
                  <Button onClick={this.openSignIn} variant="contained" color="primary" className={classes.button}>
                    Sign In
                  </Button>
                </div>
              </div>
              <div className="border rounded bg-white border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4">
                <GoogleSignIn googleSignInSuccess={(credentials) => this.handleGoogleSignInSuccess(credentials)} />
              </div> */}
            </Grid>
          </Paper>
        </div>
      </DocumentTitle>
    );
  }
}

Register.propTypes = propTypes;

const mapDispatchToProps = { registerUser, googleSignIn };

export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(Register)));
