import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import AuthLauout from '../components/auth/Layout/Layout'; 


function PanellRoute() {
    return (
        <AuthLauout> 
            <Switch>
                <Route exact path="/auth/login">
                    <Login />
                </Route>
                <Route exact path="/auth/register">
                    <Register />
                </Route>
                <Route path="/auth/">
                    <Redirect to="/auth/login" />
                </Route>
            </Switch>
        </AuthLauout>

    )
}

export default PanellRoute
