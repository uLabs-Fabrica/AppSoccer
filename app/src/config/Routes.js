import React from 'react';
import { Route, withRouter} from 'react-router-dom';
import App from "../Theme";
import Login from "../Pages/Login";
import Error from "../Pages/Error";
import NotFound from "../Pages/NotFound";
import Access from "../Pages/Access";
function Routes (props) {
    //alert(props.location.pathname);
    console.log(props.location.pathname);
    switch (props.location.pathname) {
        case "/login":
            return <Route path="/login" component={Login} />
        case "/error":
            return <Route path="/error" component={Error} />
        case "/":
            return <Route path="/" component={Login} />
        case "/access":
            return <Route path="/access" component={Access} />
        case "/dashboard":
            return <Route path="/dashboard" component={App} />
        case "/personal-data":
            return <Route path="/personal-data" component={App} />
        case "/sports-data":
            return <Route path="/sports-data" component={App} />
        case "/schedule":
            return <Route path="/schedule" component={App} />
        default:
            return <NotFound/>;
    }
}

export default withRouter(Routes);