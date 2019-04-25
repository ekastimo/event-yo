import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth/index";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InfoIcon from '@material-ui/icons/Info';
import MapIcon from '@material-ui/icons/Map';
import InfoView from "./InfoView";
import Agenda from "./Agenda";
import * as validate from "validate.js";
import {RouteComponentProps} from "react-router";
import {remoteRoutes} from "../../../data/constants";
import {get} from "../../../utils/ajax";
import {IEvent} from "../types";
import Loading from "../../../widgets/Loading";
import AppBase from "../../../base/AppBase";
import {connect} from "react-redux";
import {IUser} from "../../../data/types";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        tabView: {
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing.unit
            },
            padding: theme.spacing.unit * 3

        }
    });

function TabContainer(props: any) {
    return (
        <div className={props.classes.tabView}>
            {props.children}
        </div>
    );
}

interface IPrams {
    eventId: string
}

interface IProps extends WithStyles<typeof styles> {
    width?: any
    user: IUser
}

interface IState {
    isLoading: boolean
    value: number
    data?: IEvent
    error?: string
}

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<IPrams> {

}


class EventDetails extends React.Component<IProps, IState> {
    public state = {
        isLoading: true,
        value: 0,
        data: undefined,
    };

    componentDidMount() {
        this.reloadData();
    }

    public render() {
        const {classes, width, user} = this.props;
        const {value, data} = this.state;
        const isNotMobile = width !== 'xs'

        if (!data)
            return <Loading/>

        const eventData = data as IEvent

        const handleCompletion = () => {
            this.reloadData();
        };

        return (
            <AppBase
                title={eventData.name}
            >
                <div className={classes.root}>
                    <AppBar position="static" color="inherit">
                        <Tabs
                            variant="fullWidth"
                            value={value}
                            onChange={this.handleChange}
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Info" icon={isNotMobile ? <InfoIcon/> : undefined}/>
                            <Tab label="Agenda" icon={isNotMobile ? <AssignmentIcon/> : undefined}/>
                            <Tab label="Venue" icon={isNotMobile ? <MapIcon/> : undefined}/>
                        </Tabs>
                    </AppBar>
                    {
                        value === 0 &&
                        <TabContainer classes={classes}>
                            <InfoView data={eventData} user={user} handleCompletion={handleCompletion}/>
                        </TabContainer>
                    }
                    {
                        value === 1 &&
                        <TabContainer classes={classes}>
                            <Agenda data={eventData} handleClick={this.killEvent} user={user}/>
                        </TabContainer>
                    }
                    {
                        value === 2 &&
                        <TabContainer classes={classes}>
                            Someting
                        </TabContainer>
                    }
                </div>
            </AppBase>
        );
    }

    private handleChange = (event: any, value: any) => {
        this.setState({value});
    };
    private killEvent = () => null;

    private reloadData = () => {
        const {match} = this.props
        const {params: {eventId}} = match
        if (validate.isDefined(eventId)) {
            const url = `${remoteRoutes.events}/${eventId}`
            get(url, (data: IEvent) => {
                console.log("Fetched event", data)
                this.setState(() => ({data}))
            }, undefined, () => {
                this.setState(() => ({isLoading: false}))
            })
        } else {
            this.setState(() => ({isLoading: false, error: 'Invalid path'}))
        }
    }
}

const Styled = withStyles(styles, {withTheme: true})(EventDetails);
export default connect(
    (store: any) => {
        return {
            user: store.core.user
        }
    }
)(withStyles(styles)(withWidth()(Styled)))
