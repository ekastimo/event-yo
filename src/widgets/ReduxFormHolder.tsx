import * as React from 'react'
import {Form, Formik, FormikActions} from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import {WithStyles} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';

import {handleError, post, put} from '../utils/ajax';
import Toast from '../utils/Toast';

const styles = () =>
    createStyles({
        root: {
            width: '100%',
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data: any
    isNew: boolean
    url: string,
    open: boolean
    debug?: boolean
    title: string
    onClose: () => any
    dataParser?: (data: any) => any
    schema: any
    width: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    onPost?: (data: any) => any
    onPut?: (data: any) => any
}

class ReduxFormHolder extends React.Component<IProps> {
    form?: Formik = undefined

    render() {
        const {width, classes, data, title, children, open, onClose, schema, debug} = this.props
        const isMobile = width === 'xs'
        const isSmall = width === 'sm'
        return (
            <Formik
                ref={(node: any) => (this.form = node)}
                initialValues={data || {}}
                validationSchema={schema}
                onSubmit={this.onSubmit}
                enableReinitialize={true}

            >
                {(formState) => (
                    <Form>
                        <div className={classes.root}>
                            <Dialog
                                open={open}
                                onClose={onClose}
                                aria-labelledby='form-dialog-title'
                                fullScreen={isMobile}
                                fullWidth={true}
                                maxWidth={isSmall ? 'sm' : 'md'}
                            >
                                <DialogTitle id='form-dialog-title'>{title}</DialogTitle>

                                <DialogContent>
                                    {children}
                                </DialogContent>

                                {
                                    debug &&
                                    <DialogContent>
                                        <div>{JSON.stringify(formState, null, 2)}</div>
                                    </DialogContent>
                                }
                                <DialogActions>
                                    <Button
                                        onClick={onClose}
                                        color='primary'
                                        disabled={formState.isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type='submit'
                                        aria-label='Save'
                                        disabled={formState.isSubmitting}
                                        onClick={this.submitForm}
                                    >
                                        <SaveIcon/>
                                        &nbsp;Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }

    submitForm = () => {
        if (this.form) {
            this.form.submitForm()
        }
    }

    onSubmit = (rawValues: any, actions: FormikActions<any>) => {
        const data = this.props.dataParser ? this.props.dataParser(rawValues) : rawValues
        //console.log("Submiting>>>>", values)
        const {isNew, url} = this.props
        const payLoad = {
            url, data, actions
        }
        if (isNew && this.props.onPost) {
            this.props.onPost(data);
        } else if (this.props.onPut) {
            this.props.onPut(data);
        }
    }
}

export default withStyles(styles)(withWidth()(ReduxFormHolder));
