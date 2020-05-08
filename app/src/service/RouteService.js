import { Route, useLocation, useHistory } from 'react-router-dom';
import React from 'react';
const PermissionRoute = (props) =>{
    let location = useLocation();
    let permission = false;
    let history = useHistory();
    if(props.userRules){
        let userRules = props.userRules;
        console.log(userRules);
        const routePermission = (rules) => {
            if (rules == "all") {
                permission = true;
            }
            for (var i in userRules) {
                if (rules.indexOf(userRules[i]) > -1) {
                    permission = true;
                }
            }
            if(!permission){
                alert("sem permissão");
                history.push("/notfound")
            }
        }
        
        //alert("location"+location.pathname);
        console.log(location);
        switch (location.pathname) {
            case "/login":
                routePermission("all");
            case "/error":
                routePermission("all");
            case "/":
                routePermission("all");
            case "/access":
                routePermission("all");
            case "/dashboard":
                routePermission("all");
            case "/personal-data":
                routePermission(["play"]);
            case "/sports-data":
                routePermission(["play"]);
            case "/schedule":
                routePermission(["adm"]);
            case "/frequency":
                routePermission(["play"]);
            case "/organization":
                routePermission(["adm"])
            case "/teams":
                routePermission(["adm"])
            case "/championship":
                routePermission(["play"]);
            case "/games":
                routePermission(["play"]);
            case "/competitions":
                routePermission(["play"]);
            default:
        }
    }
    return(<div></div>)
}
export default PermissionRoute;