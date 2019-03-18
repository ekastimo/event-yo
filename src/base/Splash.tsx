import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridWrapper from "../widgets/GridWrapper";
import {connect} from "react-redux";
import {doLogout, handleLogin, handleFailedProfile} from "../data/coreActions";
import {get, getToken, isAuthError} from "../utils/ajax";
import {remoteRoutes} from "../data/constants";

interface IProps {
    handleLogin: (data: any) => any
    handleFailedProfile: () => any
    doLogout: () => any
}

function Splash(props: IProps) {
    const {handleLogin, doLogout, handleFailedProfile} = props
    useEffect(() => {
        console.log("Attempt get Profile")
        get(remoteRoutes.profile,
            data => {
                handleLogin({user: data, token: getToken()})
            }, (err, res) => {
                console.log("Error callback", err)
                if (isAuthError(err, res)) {
                    doLogout()
                } else {
                    handleFailedProfile()
                }
            }, () => {
                console.log("End callback")
            }
        )
    })

    return <GridWrapper>
        <Grid container spacing={16} justify='center' alignItems="center">
            <Grid item>
                <CircularProgress/>
            </Grid>
        </Grid>
    </GridWrapper>
}


export default connect(
    null,
    (dispatch: any) => {
        return {
            handleLogin: (data: any) => dispatch(handleLogin(data)),
            handleFailedProfile: () => dispatch(handleFailedProfile()),
            doLogout: () => dispatch(doLogout())
        }
    }
)(Splash)