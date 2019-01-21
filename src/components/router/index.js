import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// import SignIn from '../pages/auth/SignIn';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';


// import NotFound from '../pages/404';
import PropTypes from 'prop-types';
// import Welcome from '../pages/Welcome';
// import Home from '../pages/Home';
import Profile from '../pages/Profile';
import AuthRoute from './AuthRoute';
import {connect} from 'react-redux';
import {setLoading} from '../actions/loading';
import {initAuthFromExistingToken} from '../actions/auth';
import GuestRoute from './GuestRoute';

import MyAppBar from "./../MyAppBar";
import Album from "./../Album";
import Footer from "./../Footer";
import Slider from "./../Slider";

import "../../App.css";



const propTypes = {
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  initAuthFromExistingToken: PropTypes.func.isRequired
};
class App extends Component {
  componentDidMount () {
    this.props.initAuthFromExistingToken(() => this.props.setLoading(false));
    window.App = {"name": "LocalVue",
                  "google_client_id": "abcd"}; // process.env.REACT_APP_GOOGLE_CLIENT_ID};
  }

  render () {
    if (this.props.loading) {
      return (
        <div className="p-2">loading...</div>
      );
    }

    return (

      <Router>
       <div className="App">
        <div style={{ maxWidth: "1140px", margin: "auto" }}>
        <MyAppBar />
        
          <Switch>
            <GuestRoute exact path="/" component={Album} />            
            <GuestRoute path="/register" component={Register} />
            {/* <GuestRoute path="/signin" component={SignIn} /> */}
            <GuestRoute path="/forgot-password" component={ForgotPassword} />
            <GuestRoute path="/password/reset/:token" component={ResetPassword} />
            <AuthRoute path="/home" component={Album} />              
            <AuthRoute path="/profile/:id" component={Profile} />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
        <Slider />
        <Footer />
        </div>
      </Router>
    );
  }
}

App.propTypes = propTypes;

const mapDispatchToProps = {
  setLoading,
  initAuthFromExistingToken
};

const mapStateToProps = ({ loading }) => ({ loading });

export default connect(mapStateToProps, mapDispatchToProps)(App);
