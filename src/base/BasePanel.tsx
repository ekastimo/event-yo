import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";


const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
            height: '100%',
            padding: theme.spacing.unit
        },
    });

interface IProps extends WithStyles<typeof styles> {
    classes: any
}

class BasePanel extends React.Component<IProps> {
    public render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(BasePanel);
