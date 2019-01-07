import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

import {withStyles} from "@material-ui/core/styles";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        code: {
            width: '70%',
            margin: '0 auto'
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data: any
}

class MyDebug extends React.Component<IProps> {
    public render() {
        const {classes, data} = this.props
        return (
            <div className={classes.root}>
                <pre className={classes.code}>{JSON.stringify(data, null, 2)}</pre>
            </div>
        );
    }
}

export default withStyles(styles)(MyDebug)
