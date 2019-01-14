import * as React from 'react';
import {Fragment} from 'react';
import Main from "./base/Main";
import withRoot from './withRoot';
import {ToastContainer} from "react-toastify";
import {BrowserRouter as HashRouter} from 'react-router-dom';
import {remoteRoutes} from "./data/constants";
import Loading from "./widgets/Loading";
import {get} from "./utils/ajax";
import {IUser} from "./data/types";
import Loginx from "./base/Loginx";
import {connect} from "react-redux";
import {doLogin, doLogout} from "./data/coreActions";

interface IProps {
    token?: string,
    user?: IUser
    handleLogin: (data: any) => any
    handleLogout: () => any
}


class App extends React.Component<IProps> {
    public state = {
        isLoading: true
    }

    public componentWillMount() {
        const token = this.props.token
        get(remoteRoutes.profile,
            user => {
                console.log("On profile got", {token, user})
                this.props.handleLogin({token, user})
            },
            (error) => {
                console.log("On Error", {error})
                this.props.handleLogout()
            },
            () => {
                this.setState(() => ({isLoading: false}))
            }
        )
    }

    public render() {
        const {isLoading} = this.state
        const {user} = this.props
        if (isLoading) {
            return <Loading/>
        }
        if (user) {
            return (
                <HashRouter>
                    <Fragment>
                        <ToastContainer/>
                        <Main handleLogout={this.props.handleLogout}/>
                    </Fragment>
                </HashRouter>
            );
        } else {
            return <Loginx onLogin={this.props.handleLogin}/>
        }
    }


}

export default connect(
    (store: any) => {
        return {
            token: store.core.token,
            user: store.core.user
        }
    },
    (dispatch: any) => {
        return {
            handleLogin: (data: any) => dispatch(doLogin(data)),
            handleLogout: () => dispatch(doLogout())
        }
    }
)(withRoot(App))

