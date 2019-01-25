import * as React from 'react';
import {List, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {localRoutes, remoteRoutes} from "../../data/constants";
import {search} from "../../utils/ajax";
import {withStyles} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from 'react-router'
import TeamItem from "./TeamItem";

import {ITeam} from "./types";
import Loading from "../../widgets/Loading";
import {teamSchema} from "./config";
import FormHolder from "../contacts/editors/FormHolder";
import NewTeamEditor from "./editors/NewTeamEditor";
import XToolBar from "../../widgets/XToolBar";

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
                <XToolBar
                    handleChange={this.handleChange}
                    title='Teams'
                    handleNew={this.handleNewContact}
                />
                {
                    isLoading ?
                        <Loading/>
                        :
                        <List>
                            {
                                data.map((it: any) => (
                                    <TeamItem
                                        key={it.id}
                                        data={{...it}}
                                        onView={this.handleEdit}
                                        onEdit={this.handleEdit}
                                        onDelete={this.handleEdit}
                                    />
                                ))
                            }
                        </List>
                }
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

    private reloadData(request: any={}) {
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
}

export default withRouter(withStyles(styles)(Contacts))
