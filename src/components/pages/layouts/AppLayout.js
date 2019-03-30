import React from "react";
import AuthNav from "../../AuthNav";

import PropTypes from "prop-types";

const propTypes = {
    children: PropTypes.element.isRequired
};

const AppLayout = ({ children, ...rest }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <AuthNav />
            <div className="flex flex-1">
                {children}
            </div>
        </div>
    );
};

AppLayout.propTypes = propTypes;

export default AppLayout;
