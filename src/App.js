import React, { Component } from "react";
import Album from "./components/Album";
import "./App.css";

window.App.name = process.env.REACT_APP_NAME;
window.App.google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;


class App extends Component {
  componentDidMount() {
    window.App.name = process.env.REACT_APP_NAME;
    window.App.google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
   }
  render() {

    return (

      <div className="App">
        <Album />
      </div>
    );
  }
}

export default App;
