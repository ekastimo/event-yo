import React, {useState, useEffect} from 'react';
import {Fragment} from 'react';
import Main from "./base/Main";
import withRoot from './withRoot';
import {ToastContainer} from "react-toastify";
import {BrowserRouter as HashRouter} from 'react-router-dom';
import {IUser} from "./data/types";
import Login from "./base/Login";
import {connect} from "react-redux";
import {doLogin, doLogout} from "./data/coreActions";
import Loading from "./widgets/Loading";

interface IProps {
    user?: IUser
    handleLogin: (data: any) => any
}


function App(props: IProps) {
    const [slash, setSplash] = useState(true)
    const {user} = props
    useEffect(() => {
        setTimeout(() => {
            setSplash(false)
        }, 1000)
    })

    if (slash) {
        return <Loading/>
    } else if (user) {
        return (
            <HashRouter>
                <Fragment>
                    <ToastContainer/>
                    <Main />
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
            isLoading: store.core.isLoading
        }
    },
    (dispatch: any) => {
        return {
            handleLogin: (data: any) => dispatch(doLogin(data))
        }
    }
)(withRoot(App))