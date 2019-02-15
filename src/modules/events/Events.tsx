import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventItem from "./EventItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import {localRoutes, remoteRoutes} from "../../data/constants";
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import {RouteComponentProps, withRouter} from 'react-router'
import {IEvent} from "./types";
import {search} from "../../utils/ajax";
import {ISearch} from "../contacts/Contacts";
import {newPersonSchema} from "../contacts/config";
import NewPersonEditor from "../contacts/editors/NewPersonEditor";
import FormHolder from "../../widgets/FormHolder";
import XToolBar from "../../widgets/XToolBar";
import EventForm from "./EventForm";
import {eventSchema} from "./config";

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

interface IState {
    isLoading: boolean,
    data: IEvent[],
    search: ISearch,
    showDialog: boolean
}


class Events extends React.Component<IProps, IState> {
    public state = {
        isLoading: true,
        showDialog: false,
        data: [],
        search: {
            limit: 10,
            skip: 0
        }
    }

    public componentDidMount() {
        this.reloadData()
    }

    public render() {
        const {classes} = this.props;
        const {data, isLoading} = this.state;

        return (
            <div className={classes.root}>
                <XToolBar
                    handleChange={this.handleChange}
                    title='Events'
                    handleNew={this.handleNewContact}
                />
                {
                    isLoading ?
                        <CircularProgress size={50}/> :
                        <Grid container spacing={24}>
                            {
                                data.map((it: IEvent) => {
                                    return (
                                        <Grid item xs={12} sm={6} lg={4} xl={3} key={it.id}>
                                            <EventItem
                                                data={it}
                                                handleClick={this.showDetails.bind(this, it.id)}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                }
                <FormHolder
                    title='New Event'
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    data={{}}
                    url={remoteRoutes.events}
                    isNew={true}
                    schema={eventSchema}
                    onAjaxComplete={this.handleCompletion}
                    debug
                >
                    <EventForm/>
                </FormHolder>
            </div>
        );
    }

    private showDetails = (id: string) => {
        const {history} = this.props
        history.push(`${localRoutes.events}/${id}`)
    }

    handleCompletion = () => {
        this.reloadData()
    }

    private reloadData(request: any = {}) {
        search(remoteRoutes.events, request, data => {
            this.setState(() => ({data, isLoading: false}))
        }, undefined, () => {
            this.setState(() => ({isLoading: false}))
        })
    }

    private handleEdit = (data: any) => {
        const path = `${localRoutes.events}/${data.id}`
        const {history} = this.props
        history.push(path)
    }

    private handleNewContact = () => {
        this.setState(() => ({showDialog: true}))
    }

    private handleClose = () => {
        this.setState(() => ({showDialog: false}))
    }

    private handleChange = (e: any) => {
        const value = e.target.value
        const shouldSearch = !value || value.length > 2
        this.setState((prevState: any) => {
            const searchData: ISearch = {...prevState.search, query: value}
            if (shouldSearch) {
                this.reloadData(searchData)
                return {...prevState, search: searchData, isLoading: true}
            }
            return {search: searchData}
        })
    }
}

export default withRouter(withStyles(styles)(Events))


