import './style/Style.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './App.js';
//import 'bootstrap/dist/js/bootstrap.js'
import 'semantic-ui-css/semantic.min.css';


//ReactDOM.render(<App />, document.getElementById("root"))

function renderApp() {
    render(
        <App />,
        document.getElementById("root")
    );
}
renderApp();

