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
        <a href="{{ url('subscribe/paypal') }}" class="paypal-btn">Abonnement anlegen</a>

        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_xclick-subscriptions"/>
          <input type="hidden" name="business" value="barre@zoestha.de"/>
          <input type="hidden" name="lc" value="US"/>
          <input type="hidden" name="no_note" value="1"/>
          <input type="hidden" name="src" value="1"/>
          <input type="hidden" name="a3" value="2.00"/>
          <input type="hidden" name="p3" value="1"/>
          <input type="hidden" name="t3" value="W"/>
          <input type="hidden" name="currency_code" value="EUR"/>
          <input type="hidden" name="srt" value="2"/>
          <input type="hidden" name="bn" value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHostedGuest"/>
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
          <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
        </form>


        {/* <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" name="frmTransaction" id="frmTransaction">
          <input type="hidden" name="business" value="{{$paypal_id}}">
            <input type="hidden" name="cmd" value="_xclick">
              <input type="hidden" name="item_name" value="{{$product->name}}">
                <input type="hidden" name="item_number" value="{{$product->id}}">
                  <input type="hidden" name="amount" value="{{$product->price}}">
                    <input type="hidden" name="currency_code" value="USD">
                      <input type="hidden" name="cancel_return" value="http://demo.expertphp.in/payment-cancel">
                        <input type="hidden" name="return" value="http://demo.expertphp.in/payment-status">
        </form> */}
 
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


// const mapStateToProps = ({ auth, resultData }) => ({ auth, resultData });


var mapStateToProps = (state) => {
  return {
    auth: state.auth,
    //   placeInfo: state.appReducer.placeInfo,
    resultData: state.appReducer.resultData,
  }
}


export default connect(mapStateToProps)(withStyles(styles)(Profile));
