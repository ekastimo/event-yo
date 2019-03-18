import React, {Fragment} from 'react';
import Main from "./base/Main";
import withRoot from './withRoot';
import {ToastContainer} from "react-toastify";
import {BrowserRouter as HashRouter} from 'react-router-dom';
import {IUser} from "./data/types";
import Login from "./base/Login";
import {connect} from "react-redux";
import Splash from "./base/Splash";

interface IProps {
    user?: IUser
    splash: boolean
}


function App(props: IProps) {
    const {user, splash} = props

    if (splash) {
        return <Splash/>
    } else if (user) {
        return (
            <HashRouter>
                <Fragment>
                    <ToastContainer/>
                    <Main/>
                </Fragment>
            </HashRouter>
        );
    } else {
        return <Fragment>
            <ToastContainer/>
            <Login/>
        </Fragment>
    }
}

export default connect(
    (store: any) => {
        return {
            user: store.core.user,
            splash: store.core.splash
        }
    }
)(withRoot(App))