import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";


import './components/bootstrap';
import store from './components/store';
import App from './components/router';
import { Provider } from 'react-redux';


const theme = createMuiTheme({

    palette:
    {
      primary: {
        main: "#0047ab",
      },
      secondary: {
        main: "#9CB2C0",
      }
    },

    typography: {
      useNextVariants: true,

      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });



ReactDOM.render(
  <Provider store={store}>
      <MuiThemeProvider theme={theme}>
          <App />
      </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
  );





// ReactDOM.render(
//   <MuiThemeProvider theme={theme}>
//     <App />
//   </MuiThemeProvider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
