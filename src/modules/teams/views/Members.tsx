import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {withStyles} from "@material-ui/core/styles";
import {ITeamMember} from "../types";
import {sampleMembers} from "../config";

const styles = (theme: Theme) =>
    createStyles({
        root: {}
    });

interface IProps extends WithStyles<typeof styles> {
}

class Members extends React.Component<IProps> {
    public render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                {
                    sampleMembers.map((it: ITeamMember) => <div key={it.id}>{it.id}</div>)
                }
            </div>
        );
    }
}

export default withStyles(styles)(Members)
