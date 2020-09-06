import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/css/style.css';


import OnBoarding from './screens/Onboarding'
import AppContainer from './AppContainer';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {

    constructor() {

        super();

        this.state = {
            username: localStorage.getItem('collUsername') || ''
        }

        this.setUsername = this.setUsername.bind(this)
    }

    setUsername(username) {
        if (username.trim().length !== 0) {
            this.setState({ username });
            localStorage.setItem('collUsername', username);
        }
    }

    render() {
        const { username } = this.state;
        console.log('username: ', username)
        return (
            <Router>

                <Switch>
                    <Route path="/onboarding" 
                        render={(props) => (
                            <OnBoarding setUsername={this.setUsername} {...props} />
                        )} 
                    />
                    <PrivateRoute path="/" component={AppContainer} username={username} />
                </Switch>
            </Router>
        );
    }
}

export default App;