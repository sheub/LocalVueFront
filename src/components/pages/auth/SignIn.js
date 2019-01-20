import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { signInUser, googleSignIn } from "../../actions/auth";
import { getIntendedUrl } from "../../helpers/auth";
import { destructServerErrors, hasError, getError } from "../../helpers/error";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

const propTypes = {
  signInUser: PropTypes.func.isRequired,
  googleSignIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: "",
      open: true
    };
  }

  handleClose = () => {
    this.props.handleClose();
  };


  signInSuccess() {
    getIntendedUrl().then(url => this.props.history.push(url));
    this.setState({ open: false });
    this.handleClose();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props
      .signInUser(this.state)
      .then(response => this.signInSuccess())
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

  handleGoogleSignInSuccess(credentials) {
    this.props
      .googleSignIn(credentials)
      .then(response => this.signInSuccess())
      .catch(error => this.setState({ errors: destructServerErrors(error) }));
    this.setState({ open: false });
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >

        <form onSubmit={e => this.handleSubmit(e)} method="POST">
          <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
          <DialogContent>
            {/* E-mail textfield */}
            <TextField
              value={this.state.email}
              onChange={e => this.handleInputChange(e)}
              id="email"
              type="email"
              name="email"
              errorText = "Please Enter valid email"
              required = {true}
              autoFocus
              margin="dense"
              label="Email Address"
              fullWidth
            />
            {hasError(this.state.errors, "email") && (
              <p className="text-red text-xs pt-2">
                {getError(this.state.errors, "email")}
              </p>
            )}

            {/* Password textfield */}
            <TextField
              value={this.state.password}
              onChange={e => this.handleInputChange(e)}
              type="password"
              id="password"
              name="password"
              required = {true}
              margin="dense"
              label="Password"
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button type="submit" color="primary">
              Sign In
            </Button>
          </DialogActions>
        </form>


        {/* <div className="p-4 text-grey-dark text-sm flex flex-col items-center">
            <div>
              <span>Create a New Account? </span>
              <Link to="/register" className="no-underline text-grey-darker font-bold">Register</Link>
            </div>

            <div className="mt-2">
              <strong>Help:</strong>{" "}
              <Link
                to="/forgot-password"
                className="no-underline text-grey-dark text-xs"
              >
                Reset Password
              </Link>
            </div>
          </div>

          <div className="border rounded bg-white border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4">
            <GoogleSignIn
              googleSignInSuccess={credentials =>
                this.handleGoogleSignInSuccess(credentials)
              }
            />
          </div> */}

      </Dialog>
    );
  }
}

SignIn.propTypes = propTypes;

SignIn.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};
const mapDispatchToProps = {
  signInUser,
  googleSignIn
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withMobileDialog({ breakpoint: "xs" })(SignIn)));