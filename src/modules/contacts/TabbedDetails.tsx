import * as React from 'react';
import {Theme, WithStyles} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import ContactsIcon from '@material-ui/icons/Contacts';
import PeopleIcon from '@material-ui/icons/People';
import DomainIcon from '@material-ui/icons/Domain';
import {IContact} from './types';
import EmailView from "./views/EmailView";
import PhoneView from "./views/PhoneView";
import AddressView from "./views/AddressView";
import TabbedView from "../../widgets/TabbedView";
import ContactTeams from "./views/ContactTeams";
import GridWrapper from "../../widgets/GridWrapper";

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
    data: IContact
    handleReload: () => any
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
        const {classes, data} = this.props;
        const sizes: any = {xs: 12, sm: 12, md: 6, lg: 4}
        const contactInfo = <GridWrapper>
            <Grid container spacing={16} className={classes.tabContent}>
                <Grid item {...sizes}>
                    <EmailView data={data} handleReload={this.props.handleReload}/>
                </Grid>
                <Grid item {...sizes}>
                    <PhoneView data={data} handleReload={this.props.handleReload}/>
                </Grid>
                <Grid item {...sizes}>
                    <AddressView data={data} handleReload={this.props.handleReload}/>
                </Grid>
            </Grid>
        </GridWrapper>
        return (
            <div className={classes.root}>
                <TabbedView
                    data={[
                        {
                            id: '0',
                            title: "Details",
                            icon: <ContactsIcon/>,
                            component: contactInfo

                        },
                        {
                            id: '1',
                            title: "Teams",
                            icon: <PeopleIcon/>,
                            component: <ContactTeams key='2' contactId={data.id}/>
                        },
                        {
                            id: '2',
                            title: "More",
                            icon: <DomainIcon/>,
                            component: <TabContainer key='3'>Item Three</TabContainer>
                        }

                    ]}
                />
            </div>
        );
    }
}

export default withStyles(styles)(TabbedDetails)
