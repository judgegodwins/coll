import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/css/style.css';

import Home from './screens/Home';
import CallScreen from './screens/CallScreen';

class App extends Component {

    render() {

        return (
            <Router>

                <Switch>
                    <Route path="/call" exact component={CallScreen}/>
                    <Route path="/" exact component={Home}/>
                </Switch>
            </Router>
        );
    }
}

export default App;