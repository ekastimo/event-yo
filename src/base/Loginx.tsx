import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {Theme, WithStyles} from "@material-ui/core";

import {Form, Formik, FormikActions} from 'formik';
import createStyles from "@material-ui/core/styles/createStyles";
import {validationSchema} from "./Login";
import {remoteRoutes} from "../data/constants";
import {post} from "../utils/ajax";
import TextInput from "../widgets/inputs/TextInput";

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
    onLogin: (data: any) => any
}


function Loginx(props: IProps) {
    const {classes} = props;

    const onSubmit = (data: any, actions: FormikActions<any>) => {
        const url = remoteRoutes.login
        post(url, data,
            (resp) => {
                props.onLogin(resp)
            }, undefined, () => {
                actions.setSubmitting(false)
            }
        )
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
                    {({values, touched, errors, isSubmitting}) => (
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
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isSubmitting}
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

export default withStyles(styles)(Loginx);
