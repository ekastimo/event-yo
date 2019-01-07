import * as React from 'react';
import {Theme, WithStyles} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import DomainIcon from '@material-ui/icons/Domain';
import {ITeam} from './types';

import TabbedView from "../../widgets/TabbedView";
import Members from "./views/Members";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        tabContent: {
            paddingTop: theme.spacing.unit,
            minHeight: 200,
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing.unit,
            },
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data: ITeam
}

function TabContainer(props: any) {
    return (
        <Typography component='div' style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}


class TabbedDetails extends React.Component<IProps> {
    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <TabbedView
                    data={[
                        {
                            id: '2',
                            title: "Members",
                            icon: <PeopleIcon/>,
                            component: <Members/>
                        },
                        {
                            id: '3',
                            title: "Tasks",
                            icon: <DomainIcon/>,
                            component: <TabContainer>Item Two</TabContainer>
                        },
                        {
                            id: '4',
                            title: "More",
                            icon: <DomainIcon/>,
                            component: <TabContainer>Item Three</TabContainer>
                        }

                    ]}
                />
            </div>
        );
    }
}

export default withStyles(styles)(TabbedDetails)
