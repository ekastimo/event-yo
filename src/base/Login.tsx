import React from 'react';
import {Button, Theme, WithStyles} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Form, Formik, FormikActions} from 'formik';
import {doLogout, handleLogin as dispatchLogin} from "../data/coreActions";
import TextInput from "../widgets/inputs/TextInput";
import * as yup from "yup";
import {connect} from "react-redux";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import {post} from "../utils/ajax";
import {remoteRoutes} from "../data/constants";
import Toast from "../utils/Toast";

const styles = (theme: Theme) =>
    createStyles({
        main: {
            width: 'auto',
            display: 'block', // Fix IE 11 issue.
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
                width: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        paper: {
            marginTop: theme.spacing.unit * 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        },
        avatar: {
            margin: theme.spacing.unit,
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing.unit,
        },
        submit: {
            marginTop: theme.spacing.unit * 3,
        },
    });


interface IProps extends WithStyles<typeof styles> {
    handleLogin: (data: any) => any
    handleLogout: () => any
}

function Login(props: IProps) {
    const {classes, handleLogin} = props
    const onSubmit = (data: any, actions: FormikActions<any>) => {
        post(remoteRoutes.login, data, resp => {
            handleLogin(resp)
        }, err => {
            Toast.error("Invalid username/password")
        }, () => {
            actions.setSubmitting(false)
        })
    }
    return (
        <main className={classes.main}>
            <CssBaseline/>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon/>
                </Avatar>
                <Typography component="h1">
                    Sign in
                </Typography>
                <Formik
                    initialValues={{
                        "email": "ekastimo@gmail.com",
                        "password": "Xpass@123"
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formState) => (
                        <Form className={classes.form}>
                            <TextInput
                                type='email'
                                name='email'
                                label='Email Address'
                                autoComplete="email"
                                autoFocus
                                margin="normal"
                            />

                            <TextInput
                                type='password'
                                name='password'
                                label='Password'
                                autoComplete="email"
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={formState.isSubmitting}
                            >
                                Sign in
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </main>
    );


}

const reqMsg = 'Field is required'
export const validationSchema = yup.object().shape(
    {
        email: yup.string().email('Invalid email').required(reqMsg),
        password: yup.string().required(reqMsg)
    }
);

export default connect(
    null,
    (dispatch: any) => {
        return {
            handleLogin: (data: any) => dispatch(dispatchLogin(data)),
            handleLogout: () => dispatch(doLogout())
        }
    }
)(withStyles(styles)(Login))


