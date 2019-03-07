import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {localRoutes, remoteRoutes} from "../../data/constants";
import {del, search} from "../../utils/ajax";
import {withStyles} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from 'react-router'
import TeamItem from "./TeamItem";
import {ITeam} from "./types";
import {teamSchema} from "./config";
import FormHolder from "../../widgets/FormHolder";
import NewTeamEditor from "./editors/NewTeamEditor";
import Toast from "../../utils/Toast";
import uiConfirm from "../../widgets/confirm";
import ListView from "../../widgets/lists/ListView";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            [theme.breakpoints.only('xs')]: {
                padding: theme.spacing.unit * 2,
            },
        }
    });

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
}

interface IState {
    isLoading: boolean,
    data: ITeam[],
    search: ISearch,
    showDialog: boolean
}

interface ISearch {
    limit: number,
    skip: number,
    name?: string
}

class Contacts extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            isLoading: true,
            showDialog: false,
            data: [],
            search: {
                limit: 10,
                skip: 0
            }
        }
    }

    public render() {
        const {isLoading, data} = this.state
        return (
            <div>

                <ListView
                    isLoading={isLoading}
                    title='Teams'
                    hasData={data && data.length > 0}
                    handleAdd={this.handleNewContact}
                    handleSearch={this.handleChange}
                >
                    {
                        data.map((it: any) => (
                            <TeamItem
                                key={it.id}
                                data={{...it}}
                                onEdit={this.handleEdit}
                                onDelete={this.handleDelete}
                            />
                        ))
                    }
                </ListView>
                <FormHolder
                    title='New Team'
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    data={{}}
                    url={remoteRoutes.teams}
                    isNew={true}
                    schema={teamSchema}
                    onAjaxComplete={this.handleCompletion}
                >
                    <NewTeamEditor/>
                </FormHolder>
            </div>
        )
    }

    public componentDidMount() {
        this.reloadData(this.state.search)
    }

    private reloadData(request: any = {}) {
        search(remoteRoutes.teams, request, data => {
            this.setState(() => ({data, isLoading: false}))
        }, undefined, () => {
            this.setState(() => ({isLoading: false}))
        })
    }

    handleCompletion = () => {
        this.reloadData()
    }

    private handleEdit = (data: any) => {
        const path = `${localRoutes.teams}/${data.id}`
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
            const searchData: ISearch = {...prevState.search, name: value}
            if (shouldSearch) {
                this.reloadData(searchData)
                return {...prevState, search: searchData, isLoading: true}
            }
            return {search: searchData}
        })
    }

    private handleDelete = (data: any) => {
        const {name, id} = data;
        uiConfirm(`Do you really want to delete ${name}?`).then(
            () => {
                const url = `${remoteRoutes.teams}/${id}`;
                this.setState(() => ({isLoading: true}))
                del(url, data => {
                    Toast.info(data.message)
                    this.handleCompletion()
                }, undefined, () => {
                    this.setState(() => ({isLoading: true}))
                });
            },()=>{})
    }
}

export default withRouter(withStyles(styles)(Contacts))
