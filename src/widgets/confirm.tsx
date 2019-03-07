import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {confirmable, createConfirmation, ReactConfirmProps} from 'react-confirm';

class ConfirmDialog extends React.Component<ReactConfirmProps> {
    render() {
        return (
            <Dialog
                open={this.props.show}
                onClose={this.props.dismiss}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.confirmation}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.cancel()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.proceed()} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const defaultConfirmation = createConfirmation(confirmable(ConfirmDialog));

export default function uiConfirm(confirmation: string, options = {}) {
    return defaultConfirmation({confirmation, ...options});
}


