import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import IconButton from "@material-ui/core/IconButton";
import MapIcon from "@material-ui/icons/Map";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";

const SignIn = React.lazy(() => import("./pages/auth/SignIn"));
const MyLinkToRegister = props => <Link to="/register" {...props} />
const MyLinkToUserPage = props => <Link to="/profile/${this.state.user.id" {...props} />
const MyLinkToLogout = props => <Link to="/logout" {...props} />



const styles = (theme) => ({

    appBar: {
        position: "relative",
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    grow: {
        flexGrow: 1,
    },

    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
});

// const propTypes = {
//     authenticated: PropTypes.bool.isRequired
//   };

class MyAppBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            SignInFormVisible: false,
            user: this.props.auth.user,
        };
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    // OpenClose Menu
    handleProfileMenuOpen = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };


    openSignIn = () => {
        this.setState({ anchorEl: null, SignInFormVisible: true });
        this.handleMobileMenuClose();
    };

    handleClose = () => {
        this.setState({
            SignInFormVisible: false
        });
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    // OpenClose mobile menu
    handleMobileMenuOpen = (event) => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };


    render() {

        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes, auth } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (

            <Menu 
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                {auth.authenticated ?
                    // <Link to={`/profile/${this.state.user.id}`}
                    //     className="text-2xl font-bold lg:text-sm lg:font-light capitalize text-sm text-grey-darker underline lg:no-underline">
                    //     {this.state.user.name}
                    // </Link>
                    <div>
                    <MenuItem className="menuButton" component={MyLinkToUserPage} onClick={this.handleMenuClose}>
                        My Profile
                    </MenuItem>
                    <MenuItem className="menuButton" component={MyLinkToLogout} onClick={this.handleMenuClose}>
                        Logout
                    </MenuItem>
                    </div>

                    // <Link onClick={this.handleMenuClose}>Profile</Link>

                    : <div >
                        <MenuItem className="menuButton" onClick={this.openSignIn}>Sign In</MenuItem>

                        {/* <Link to="/signin" onClick={this.handleMenuClose}>Sign In</Link> */}
                        {/* <Link to="/register" onClick={this.handleMenuClose}>Register</Link> */}
                        <MenuItem className="menuButton" component={MyLinkToRegister} onClick={this.handleMenuClose}>
                            Register
                        </MenuItem>
                    </div>
                }
            </Menu>

        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >

                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <div>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <MenuItem className="menuButton" component={MyLinkToUserPage} onClick={this.handleMenuClose}>
                        My Profile
                    </MenuItem>
                    <MenuItem className="menuButton" component={MyLinkToLogout} onClick={this.handleMenuClose}>
                        Logout
                    </MenuItem>
                    </div>
                    {/* <p>Profile</p> */}
                </MenuItem>
            </Menu>
        );

        return (
            <React.Fragment>
                <div style={{ maxWidth: "1140px", margin: "auto" }}>
                    <AppBar position="static">
                        <Toolbar>
                            <MapIcon className={classes.icon} />
                            <Link to="/" style={{ textDecoration: "none", color: "white" }}>

                                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                    Local Vue
                            </Typography>
                            </Link>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <IconButton
                                    aria-owns={isMenuOpen ? "material-appbar" : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {renderMenu}
                    {renderMobileMenu}
                    {this.state.SignInFormVisible ?
                        <React.Suspense fallback={<div> </div>}>
                            <SignIn handleClose={this.handleClose} />
                        </React.Suspense>
                        : null
                    }
                </div>
            </React.Fragment>
        );
    }
}

MyAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = ({ auth }) => ({ auth });
// const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated });
export default connect(mapStateToProps)(withStyles(styles)(MyAppBar));
