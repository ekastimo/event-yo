import React, {Fragment} from 'react';
import withRoot from './withRoot';
import {ToastContainer} from "react-toastify";
import {BrowserRouter as HashRouter} from 'react-router-dom';
import {IUser} from "./data/types";
import Login from "./base/Login";
import {connect} from "react-redux";
import Splash from "./base/Splash";
import {ContentSwitch} from "./base/ContentSwitch";

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
                    <ContentSwitch/>
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