import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as serviceWorker from './serviceWorker';

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
      //   fontFamily: ["Open Sans", "sans-serif",
      // ].join(","),
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
    // font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  });

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
    {/* <Route path="/" component={App} /> */}
    <App />
  </MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
