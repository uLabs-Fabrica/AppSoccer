import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import App from "../Theme";
import Login from "../../Pages/Login";
import Error from "../../Pages/Error";
import NotFound from "../../Pages/NotFound";
import Access from "../../Pages/Access";

class Routes extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        switch (this.props.location.pathname) {
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
                return <Login />;
        }
    }
}

export default withRouter(Routes);