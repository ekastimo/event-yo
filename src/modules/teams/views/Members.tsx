import * as React from 'react';
import {List, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {remoteRoutes} from "../../../data/constants";
import {search} from "../../../utils/ajax";
import {withStyles} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from 'react-router'

import {ITeam, ITeamMember} from "../types";
import Loading from "../../../widgets/Loading";
import {teamSchema} from "../config";
import FormHolder from "../../contacts/editors/FormHolder";
import NewTeamEditor from "../editors/NewTeamEditor";
import XToolBar from "../../../widgets/XToolBar";
import MemberItem from "./MemberItem";
import MemberEditor from "../editors/MemberEditor";

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
    team: ITeam
}

interface IState {
    isLoading: boolean
    data: ITeamMember[]
    search: ISearch
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
        const {team} = this.props
        const {isLoading, data} = this.state
        return (
            <div>
                <XToolBar
                    handleChange={this.handleChange}
                    title=''
                    handleNew={this.handleNewContact}
                />
                {
                    isLoading ?
                        <Loading/>
                        :
                        <List>
                            {
                                data.map((it: any) => (
                                    <MemberItem
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
                    title='New Member'
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    data={{teamId: team.id, status: 'Active'}}
                    url={remoteRoutes.teams}
                    isNew={true}
                    schema={teamSchema}
                >
                    <MemberEditor/>
                </FormHolder>
            </div>
        )
    }

    public componentDidMount() {
        this.reloadData(this.state.search)
    }

    private reloadData(request: any) {
        const url = `${remoteRoutes.teamsMembers}/${this.props.team.id}`
        console.log("URL",url)
        search(url, request, (data: ITeamMember[]) => {
            this.setState(() => ({data, isLoading: false}))
        }, undefined, () => {
            this.setState(() => ({isLoading: false}))
        })
    }

    private handleEdit = (data: ITeamMember) => {
        // const path = `${localRoutes.teamsMembers}/${data.id}`
        // const {history} = this.props
        // history.push(path)
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
