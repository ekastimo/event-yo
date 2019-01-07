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
import {agenda} from '../fakeData'
import {RouteComponentProps} from "react-router";
import {IContact} from "../../contacts/types";

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
    data: any
    width?: any
}

interface IState {
    isLoading: boolean
    value: number
    data?: IContact
    error?: string
}

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<IPrams> {

}


class EventDetails extends React.Component<IProps,IState> {
    public state = {
        isLoading: true,
        value: 1,
    };


    public render() {
        const {classes, width} = this.props;
        const {value} = this.state;
        const isNotMobile = width !== 'xs'
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
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
                {value === 0 && <InfoView/>}
                {value === 1 && <Agenda data={agenda} handleClick={this.killEvent}/>}
                {value === 2 && <TabContainer>Someting</TabContainer>}
            </div>
        );
    }

    private handleChange = (event: any, value: any) => {
        this.setState({value});
    };
    private killEvent = () => null;
}


const Styled = withStyles(styles, {withTheme: true})(EventDetails);

export default withWidth()(Styled)
