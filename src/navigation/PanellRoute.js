import React from 'react'
import { Switch } from "react-router-dom";
import Categories from '../components/categories/Categories';
import Panellayout from '../components/panells/Layout/layout';
import CreateUser from '../components/panells/Users/CreateUser';
import EditUser from '../components/panells/Users/EditUser';
import User from "../components/panells/Users/User";
import Route from "./Route";



function PanellRoute() {
    return (
        <Panellayout>
            <Switch>
                <Route exact path="/panel/users">
                    <User />
                </Route>
                <Route exact path="/panel/users/create">
                    <CreateUser />
                </Route>
                <Route exact path="/panel/users/:id/edit">
                    <EditUser />
                </Route>
                <Route exact path="panel/categories">
                    <Categories />
                </Route>
            </Switch>
        </Panellayout>
    )
}

export default PanellRoute
