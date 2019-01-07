import * as React from 'react';
import {Button, Theme, WithStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import {Form, Formik, FormikActions} from 'formik';
import createStyles from "@material-ui/core/styles/createStyles";
import SaveIcon from '@material-ui/icons/Save';
import {withStyles} from "@material-ui/core/styles";

import {post} from "../utils/ajax";
import {remoteRoutes} from "../data/constants";
import TextInput from "../widgets/inputs/TextInput";
import * as yup from "yup";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        mainForm: {}
    });

interface IProps extends WithStyles<typeof styles> {
    handleLogin: (data: any) => any
}

class Login extends React.Component<IProps> {
    public render() {
        const {classes} = this.props

        return (
            <Grid container spacing={8}>
                <Grid item xs={12} sm={8} md={6}>
                    <Formik
                        initialValues={{
                            "email": "ekastimo@gmail.com",
                            "password": "Xpass@123"
                        }}
                        validationSchema={validationSchema}
                        onSubmit={this.onSubmit}
                    >
                        {({values, touched, errors, isSubmitting}) => (
                            <Form>
                                <div className={classes.mainForm}>
                                    <Grid item xs={12}>
                                        <TextInput type='email' name='email' label='Email'/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextInput type='password' name='password' label='Password'/>
                                    </Grid>
                                    <Grid container spacing={16}>
                                        <Grid item xs={12}>
                                            <Button
                                                type='submit'
                                                aria-label='Login'
                                                disabled={isSubmitting}
                                            >
                                                <SaveIcon/>
                                                &nbsp;Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        );
    }

    private onSubmit = (data: any, actions: FormikActions<any>) => {
        const url = remoteRoutes.login
        post(url, data,
            (resp) => {
                this.props.handleLogin(resp)
            }, undefined, () => {
                actions.setSubmitting(false)
            }
        )
    }
}

const reqMsg = 'Field is required'
export const validationSchema = yup.object().shape(
    {
        email: yup.string().email('Invalid email').required(reqMsg),
        password: yup.string().required(reqMsg)
    }
);

export default withStyles(styles)(Login)
