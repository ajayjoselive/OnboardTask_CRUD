// ./src/common/main.component.jsx
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header'

import CustomerDisplay from './components/CustomerDisplay' // Display files
import ProductDisplay from './components/ProductDisplay' // Display files
import StoreDisplay from './components/StoreDisplay' // Display files
import SalesDisplay from './components/SalesDisplay' // Display files

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div >
                <Router>
                    <div className="App">

                        <div>
                            <Route path="/" component={Header} />
                        </div>

                        <div>
                            <Route path="/customer" component={CustomerDisplay} />
                        </div>
                        <div>
                            <Route path="/products" component={ProductDisplay} />
                        </div>
                        <div>
                            <Route path="/store" component={StoreDisplay} />
                        </div>
                        <div>
                            <Route path="/sale" component={SalesDisplay} />
                        </div>


                       
                    </div>
                </Router>
              
            </div>);
    }
}



export default App;