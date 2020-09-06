import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, path, exact, ...rest }) => (
    <Route path={path} exact={exact} render={(props) => (
        rest.username
            ? <Component 
                {...props} 
                {...rest} 
            />
            : <Redirect to="/onboarding" />
    )} />
)

export default PrivateRoute