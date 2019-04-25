import React from 'react'
import {Form, Formik, FormikActions} from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withWidth from '@material-ui/core/withWidth';

import {handleError, post, put} from '../utils/ajax';
import Toast from '../utils/Toast';


interface IProps {
    data: any
    isNew: boolean
    url: string,
    open: boolean
    debug?: boolean
    handleSubmit?: (data: any) => any
    title: string
    onClose: () => any
    dataParser?: (data: any) => any
    dataParserReverse?: (data: any) => any
    schema?: any
    width: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    onAjaxComplete?: (data: any) => any
}

class FormHolder extends React.Component<IProps> {
    form?: Formik = undefined

    render() {
        const {width, data, title, children, open, onClose, schema, debug, dataParserReverse} = this.props
        const isMobile = width === 'xs'
        const isSmall = width === 'sm'
        let initialData = {};
        if (dataParserReverse && data) {
            initialData = dataParserReverse(data)
        } else {
            initialData = data || {}
        }
        return (
            <Formik
                ref={(node: any) => (this.form = node)}
                initialValues={{...initialData}}
                validationSchema={schema}
                onSubmit={this.onSubmit}
                enableReinitialize={true}
            >
                {({isSubmitting,values,initialValues,errors}) => (
                    <Form>
                        <div>
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
                                        <pre style={{height: 200}}>{JSON.stringify({values,errors,initialValues}, null, 2)}</pre>
                                    </DialogContent>
                                }
                                <DialogActions>
                                    <Button
                                        onClick={onClose}
                                        color='default'
                                        disabled={isSubmitting}
                                        variant='contained'
                                        size='small'
                                    >Cancel</Button>
                                    <Button
                                        color='primary'
                                        type='submit'
                                        aria-label='Save'
                                        disabled={isSubmitting}
                                        onClick={this.submitForm}
                                        variant='contained'
                                        size='small'
                                    >Submit</Button>
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

        const {isNew, url, dataParser, onAjaxComplete, onClose, handleSubmit} = this.props
        const values = dataParser ? dataParser(rawValues) : rawValues
        if (handleSubmit) {
            // Custom submission
            handleSubmit(values)
            actions.setSubmitting(false)
            onClose()
            return// stop processing
        }
        if (isNew) {
            post(url, values,
                (data) => {
                    Toast.info('Operation successful')
                    actions.resetForm()
                    onAjaxComplete && onAjaxComplete(data)
                    onClose()

                },
                (err, resp) => {
                    handleError(err, resp)
                }, () => {
                    actions.setSubmitting(false);
                }
            )
        } else {
            put(url, values,
                (data) => {
                    Toast.info('Update successful')
                    actions.resetForm()
                    onAjaxComplete && onAjaxComplete(data)
                    onClose()
                },
                (err, resp) => {
                    handleError(err, resp)
                }, () => {
                    actions.setSubmitting(false);
                }
            )
        }
    }
}

export default withWidth()(FormHolder)
