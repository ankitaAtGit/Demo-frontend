import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component, ...rest }) => {
    if (localStorage.getItem('token')) {
        return (
            <Route component={component} {...rest} />
        )
    }
    else {
        return (
            <Redirect to={{ pathname: '/sign-in', state: { from: rest.location } }} />
        )
    }
}

export default PrivateRoute