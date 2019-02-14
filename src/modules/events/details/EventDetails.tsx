import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
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

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        tabView: {
            padding: 0
        }
    });

function TabContainer(props: any) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

interface IPrams {
    eventId: string
}

interface IProps extends WithStyles<typeof styles> {
    width?: any
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
        const {classes, width} = this.props;
        const {value, data} = this.state;
        const isNotMobile = width !== 'xs'

        if (!data)
            return <Loading/>
        return (
            <div className={classes.root}>
                <AppBar position="fixed" style={{top: 65, width: "100%"}} color="inherit">
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
                {value === 0 && <TabContainer><InfoView data={data}/></TabContainer>}
                {value === 1 && <TabContainer><Agenda data={data} handleClick={this.killEvent}/></TabContainer>}
                {value === 2 && <TabContainer>Someting</TabContainer>}
            </div>
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

export default withWidth()(Styled)
