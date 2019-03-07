import * as React from 'react';
import {Fragment} from 'react';
import Main from "./base/Main";
import withRoot from './withRoot';
import {ToastContainer} from "react-toastify";
import {BrowserRouter as HashRouter} from 'react-router-dom';
import {IUser} from "./data/types";
import Login from "./base/Login";
import {connect} from "react-redux";
import {doLogin, doLogout} from "./data/coreActions";

interface IProps {
    user?: IUser
    handleLogin: (data: any) => any
    handleLogout: () => any
}


function App(props: IProps) {
    const {user} = props
    if (user) {
        return (
            <HashRouter>
                <Fragment>
                    <ToastContainer/>
                    <Main handleLogout={props.handleLogout}/>
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
            handleLogin: (data: any) => dispatch(doLogin(data)),
            handleLogout: () => dispatch(doLogout())
        }
    }
)(withRoot(App))