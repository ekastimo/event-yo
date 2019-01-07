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
        const contactInfo = <Grid container spacing={8} className={classes.tabContent}>
            <Grid item xs={12} sm={6} lg={4}>
                <EmailView data={data}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <PhoneView data={data}/>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <AddressView data={data}/>
            </Grid>
        </Grid>
        return (
            <div className={classes.root}>
                <TabbedView
                    data={[
                        {
                            id:'0',
                            title:"Details",
                            icon:<ContactsIcon/>,
                            component: contactInfo
                        },
                        {
                            id:'1',
                            title:"Teams",
                            icon:<PeopleIcon/>,
                            component: <TabContainer>Item Two</TabContainer>
                        },
                        {
                            id:'2',
                            title:"More",
                            icon:<DomainIcon/>,
                            component: <TabContainer>Item Three</TabContainer>
                        }

                    ]}
                />
            </div>
        );
    }
}

export default withStyles(styles)(TabbedDetails)
