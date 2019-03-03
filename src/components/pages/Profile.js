import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
const CustomizedTable = React.lazy(() => import("../Table"));


const styles = theme => ({

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
});

class Profile extends Component {
  render () {
    const { classes, auth, resultData } = this.props;
    return (
      <div className="container p-2 mx-auto flex flex-col">
        <h1>This is Profile page</h1>
        <h2>Welcome {auth.user.name}</h2>
        
        <script>document.frmTransaction.submit();</script>
        <div className={classes.table}>
              {auth.authenticated && resultData ?
                  <React.Suspense fallback={<div> </div>}>
                      <CustomizedTable data={resultData} tableActive={auth.authenticated} />
                  </React.Suspense>
                  : null
              }
          </div>
      </div>
    );
  }
}

const propTypes = {
  auth: PropTypes.object.isRequired,
  resultData: PropTypes.array,
  placeInfo: PropTypes.object,
};


Profile.propTypes = propTypes;


var mapStateToProps = (state) => {
  return {
    auth: state.auth,
    resultData: state.appReducer.resultData,
  }
}


export default connect(mapStateToProps)(withStyles(styles)(Profile));
