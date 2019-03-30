import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter} from "react-router-dom";
import { withTranslation } from "react-i18next";


import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import MapIcon from "@material-ui/icons/Map";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LanguageIcon from "@material-ui/icons/Language";
import MoreIcon from "@material-ui/icons/MoreVert";
import { logoutUser } from "./actions/auth";
import {  setStateValues } from "./actions/index";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

const SignIn = React.lazy(() => import("./pages/auth/SignIn"));
const MyLinkToRegister = (props) => <Link to="/register" {...props} />;
// const MyLinkToUserPage = (props) => <Link to="/profile/${this.state.user.id" {...props} />;
const MyLinkToUserPage = (props) => <Link to="/profile/" {...props} />;
const MyLinkToLogout = (props) => <Link to="/" {...props} />;
const MyLinkToPricing = (props) => <Link to="/pricing" {...props} />;




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
    button: {
        float: "right",
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


class MyAppBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            anchorElanguage: null,
            languageSet: "en",
            mobileMoreAnchorEl: null,
            SignInFormVisible: false,
            // user: this.props.auth.user,
        };
        // this.handleMenuClose = this.handleMenuClose.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        // this.handleLogout = this.handleLogout.bind(this);
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

    handleLogout() {
        this.props.logoutUser(() => this.props.history.push("/"));
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMenuLanguage = event => {
        this.setState({ anchorElanguage: event.currentTarget });
    };

    handleCloseLanguage = () => {
        this.setState({ anchorElanguage: null });
    };



    render() {

        const { open, classes, auth, t, i18n } = this.props;
        const { anchorEl, mobileMoreAnchorEl, anchorElanguage } = this.state;
        const isMenuOpen = Boolean(anchorEl);
        const openMenuLanguage = Boolean(anchorElanguage);
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
                    <div>
                        <MenuItem className="menuButton" component={MyLinkToUserPage} onClick={this.handleMenuClose}>
                            My Profile
                        </MenuItem>
                        <MenuItem className="menuButton" component={MyLinkToLogout} onClick={this.handleLogout}>
                            Logout
                        </MenuItem>
                    </div>
                    : <div >
                        <MenuItem className="menuButton" onClick={this.openSignIn}>Sign In</MenuItem>

                        {/* <Link to="/signin" onClick={this.handleMenuClose}>Sign In</Link> */}
                        {/* <Link to="/register" onClick={this.handleMenuClose}>Register</Link> */}
                        <MenuItem className="menuButton" component={MyLinkToRegister} onClick={this.handleMenuClose}>
                            {t("appbar.register")}
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
                            {t("appbar.myProfile")}
                        </MenuItem>
                        <MenuItem className="menuButton" onClick={() => this.handleLogout()}>
                            {t("appbar.logout")}
                        </MenuItem>
                    </div>
                    {/* <p>Profile</p> */}
                </MenuItem>
            </Menu>
        );

        const changeLanguage = (lng) => {
            this.setState({ anchorElanguage: null, languageSet: lng });

            this.props.setStateValues({
                languageSet: lng
            });
            i18n.changeLanguage(lng);
        };

        return (
            <React.Fragment>
                <div className = {classes.appBar} >
                    <AppBar position="static">
                        <Toolbar>
                            <MapIcon className={classes.icon} />

                            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                    {/* {t("title")} */} Local Vue
                                </Typography>
                            </Link>
                            <div className={classes.grow} />
                            <Button className={classes.title} variant="text" color="inherit" component={MyLinkToPricing}>Pricing</Button>

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
                            <div>
                                <IconButton
                                    buttonRef={node => {
                                        this.anchorEl = node;
                                    }}
                                    aria-owns={open ? "menu-list-grow" : undefined}
                                
                                    // aria-owns={open ? "menu-appbar" : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenuLanguage}
                                    color="inherit"
                                    aria-label="Select Language"
                                >
                                    <LanguageIcon />
                                </IconButton>
                                {/* <Menu
                                id="menu-appbar"
                                anchorEl={anchorElanguage}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={openMenuLanguage}
                                onClose={this.handleCloseLanguage}
                            > */}
                                <Popper open={openMenuLanguage} anchorEl={this.anchorEl} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            id="menu-list-grow"
                                            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={this.handleCloseLanguage}>
                                                    <MenuList>
                                                        <MenuItem onClick={() => changeLanguage("en")}>en</MenuItem>
                                                        <MenuItem onClick={() => changeLanguage("de")}>de</MenuItem>
                                                        <MenuItem onClick={() => changeLanguage("fr")}>fr</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                                {/* </Menu> */}
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

const propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    languageSet: PropTypes.string,
    setStateValues: PropTypes.func,

};
  
MyAppBar.propTypes = propTypes;

// const mapDispatchToProps = { logoutUser };
const mapDispatchToProps = (dispatch) => {
    return {
        setStateValues: (obj) => dispatch(setStateValues(obj)),
        logoutUser: dispatch(logoutUser)
    };
};

// const mapStateToProps = ({ auth, languageSet }) => ({ auth, languageSet });
const mapStateToProps = (state) => {
    return {
        languageSet: state.appReducer.languageSet,
        auth: state.auth
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, 
    { pure: false })(withRouter(withStyles(styles)(withTranslation()(MyAppBar))));
