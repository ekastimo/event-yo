import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

import {withStyles} from "@material-ui/core/styles";
import {ITeamMember} from "../types";

const styles = (theme: Theme) =>
    createStyles({
        root: {

        }
    });

interface IProps extends WithStyles<typeof styles>{
    data:ITeamMember
}

class MemberItem extends React.Component<IProps> {
    public render() {
        const {classes,data} = this.props
        return (
            <div className={classes.root}>
                {data.contactId}
            </div>
        );
    }
}

export default withStyles(styles)(MemberItem)
