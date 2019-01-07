import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import createStyles from "@material-ui/core/styles/createStyles";

import {withStyles} from "@material-ui/core/styles";

const styles = (theme: Theme) =>
    createStyles({
        root: {}
    });

interface IProps extends WithStyles<typeof styles> {
    open: boolean
    title: string
    onClose: () => any
    submitButton?: React.ReactNode
}

class XDialog extends React.Component<IProps> {
    public render() {
        const {title, children, open, onClose, submitButton} = this.props
        return (
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    {submitButton}
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(XDialog)
