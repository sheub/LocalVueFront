import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const propTypes = {
  component: PropTypes.func.isRequired,
  rest: PropTypes.object
};

const AppLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
        <Component {...props} />
    )} />
  );
};

AppLayoutRoute.propTypes = propTypes;

export default AppLayoutRoute;
