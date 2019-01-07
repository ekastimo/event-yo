import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventItem from "./EventItem";
import {events as fakeData} from "./fakeData";
import CircularProgress from '@material-ui/core/CircularProgress';
import {localRoutes} from "../../data/constants";
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import {RouteComponentProps, withRouter} from 'react-router'
import {IEvent} from "./types";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            [theme.breakpoints.only('xs')]: {
                padding: theme.spacing.unit * 2,
            },
        },
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary,
        }
    });

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
    data: any
}

class Events extends React.Component<IProps> {
    public state = {
        isLoading: true,
        data: [],
    }

    public componentDidMount() {
        this._fetchData()
    }

    public render() {
        const {classes} = this.props;
        const {data, isLoading} = this.state;

        return (
            <div className={classes.root}>
                {
                    isLoading ?
                        <CircularProgress size={50}/> :
                        <Grid container spacing={24}>
                            {
                                data.map((it: IEvent) => {
                                    return (
                                        <Grid item xs={12} sm={6} lg={4} xl={3} key={it.id}>
                                            <EventItem data={it} handleClick={this.showDetails.bind(this, it.id)}/>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                }
            </div>
        );
    }

    private _fetchData(searchQuery = '') {
        this.setState(() => ({isLoading: true}))
        setTimeout(() => {
            this.setState(() => ({isLoading: false, data: [...fakeData]}))
        }, 300)
    }

    private showDetails = (id: string) => {
        const {history} = this.props
        history.push(`${localRoutes.events}/${id}`)
    }
}

export default withRouter(withStyles(styles)(Events))


