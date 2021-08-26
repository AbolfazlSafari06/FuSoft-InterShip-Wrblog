import React from 'react'
import { Route, Switch } from "react-router-dom";
import Panellayout from '../components/panells/Layout/layout';
import User from "../components/panells/Users/User";



function PanellRoute() {
    return (
        <Panellayout>
            <Switch>
                <Route path="/panel/users">
                    <User />
                </Route>
            </Switch>
        </Panellayout>
    )
}

export default PanellRoute
