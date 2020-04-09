import React, { Component } from 'react';
import { Route, withRouter, useHistory } from 'react-router-dom';
import App from "../Theme";
import Login from "../pages/Login";
import Error from "../pages/Error";
import NotFound from "../pages/NotFound";
import Access from "../pages/Access";
import PersonalData from '../pages/PersonalData';
import FormsDemo from '../components/FormsDemo'
import UserProvider from '../context/User'
import {getSession} from '../service/AuthService';
import firebase from '../config/Firebase';
import { Dashboard } from '../pages/Dashboard';
function Routes (props) {
    switch (props.location.pathname) {
        case "/login":
            return <Route path="/login" component={Login} />
        case "/error":
            return <Route path="/error" component={Error} />
        case "/notfound":
            return <Route path="/notfound" component={NotFound} />
        case "/access":
            return <Route path="/access" component={Access} />
        case "/dashboard":
            return <Route path="/dashboard" component={App} />
        default:
            return <App/>;
    }
}

export default withRouter(Routes);