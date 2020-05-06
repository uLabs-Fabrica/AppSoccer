import React,{useContext} from 'react';
import { Route, withRouter} from 'react-router-dom';
import App from "../Theme";
import Login from "../Pages/Login";
import Error from "../Pages/Error";
import NotFound from "../Pages/NotFound";
import Access from "../Pages/Access";
import { UserContext } from '../context/User'
function Routes (props) {
    const context = useContext(UserContext);
    const userRules = context.user.rules
    const routePermission = (rules,url,component) =>{
        if (rules == "all") {
            return <Route path= {url} component={component} />;
        }
        for (var i in userRules) {
            if (rules.indexOf(userRules[i]) > -1) {
                return <Route path={url} component={component} /> ;
            }
        }
        return <NotFound />;
    }
    switch (props.location.pathname) {
        case "/login":
            return routePermission("all", "/login", Login);
        case "/error":
            return routePermission("all", "/error", Error);
        case "/":
            return routePermission("all", "/", Login);
        case "/access":
            return routePermission("all", "/access", Access);
        case "/dashboard":
            return routePermission("all", "/dashboard", App);
        case "/personal-data":
            return routePermission(["play"], "/personal-data", App);
        case "/sports-data":
            return routePermission(["play"], "/sports-data", App);
        case "/schedule":
            return routePermission(["adm"], "/schedule", App);
        case "/frequency":
            return routePermission(["play"], "/frequency", App);
        case "/organization":
            return routePermission(["adm"], "/organization", App)
        case "/teams":
            return routePermission(["adm"], "/teams", App)
        case "/championship":
            return routePermission(["play"], "/championship", App);
        case "/games":
            return routePermission(["play"], "/games", App);
        case "/competitions":
            return routePermission(["play"], "/competitions", App);
        default:
            return <NotFound/>;
    }
}

export default withRouter(Routes);