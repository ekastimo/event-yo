import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {remoteRoutes} from "../../../data/constants";
import {del, search} from "../../../utils/ajax";
import {withStyles} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from 'react-router'

import {ITeam, ITeamMember} from "../types";
import {teamMemberEditSchema, teamMembersSchema} from "../config";
import FormHolder from "../../../widgets/FormHolder";
import MemberItem from "./MemberItem";
import {default as EditMember} from "../editors/EditMember";
import AddMember from "../editors/AddMember";
import uiConfirm from "../../../widgets/confirm";
import Toast from "../../../utils/Toast";
import ListView from "../../../widgets/lists/ListView";

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
    isNew: boolean
    confirmingDelete: boolean
    selected: any
}

interface ISearch {
    limit: number,
    skip: number,
    name?: string
}

const defaultData = {status: 'Active'}

class Contacts extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            isLoading: true,
            showDialog: false,
            confirmingDelete: false,
            isNew: true,
            data: [],
            selected: {...defaultData},
            search: {
                limit: 10,
                skip: 0
            }
        }
    }

    public render() {
        const {team} = this.props
        const {isLoading, data, isNew} = this.state
        return (
            <div>

                <ListView
                    title=''
                    handleAdd={this.handleNewContact}
                    isLoading={isLoading}
                    hasData={data && data.length > 0}
                    handleSearch={this.handleSearch}
                >
                    {
                        data.map((it: any) => (
                            <MemberItem
                                key={it.id}
                                data={{...it}}
                                onEdit={this.handleEdit}
                                onDelete={this.handleDelete}
                            />
                        ))
                    }
                </ListView>
                <FormHolder
                    title='New Member'
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    data={{...this.state.selected, teamId: team.id}}
                    url={remoteRoutes.teamsMembers}
                    isNew={isNew}
                    schema={isNew ? teamMembersSchema : teamMemberEditSchema}
                    dataParser={isNew ? this.parseData : undefined}
                    onAjaxComplete={this.handleCompletion}
                >
                    {isNew ? <AddMember members={data}/> : <EditMember/>}
                </FormHolder>
            </div>
        )
    }


    private handleCompletion = () => {
        this.reloadData()
    }

    private parseData = (data: any): any => {
        const contactIds = data.contactIds.map((it: any) => it.value)
        return {
            ...data, contactIds
        }
    }

    public componentDidMount() {
        this.reloadData(this.state.search)
    }

    private reloadData(request: any = {}) {
        const url = `${remoteRoutes.teamsMembersByTeam}/${this.props.team.id}`
        console.log("URL", url)
        search(url, request, (data: ITeamMember[]) => {
            this.setState(() => ({data, isLoading: false}))
        }, undefined, () => {
            this.setState(() => ({isLoading: false}))
        })
    }

    private handleEdit = (selected: ITeamMember) => {
        this.setState(() => ({showDialog: true, isNew: false, selected}))
    }

    private handleSearch = (query: string) => {
        console.log("Searching for data")
    }

    private handleDelete = (selected: ITeamMember) => {
        uiConfirm("Please confirm that you want to delete this member").then(() => {
            const url = `${remoteRoutes.teamsMembers}/${selected.id}`
            del(url, (resp: any) => {
                Toast.info(resp.message)
                this.reloadData()
            })
        });
    }

    private handleNewContact = () => {
        this.setState(() => ({showDialog: true, isNew: true, selected: defaultData}))
    }

    private handleClose = () => {
        this.setState(() => ({showDialog: false, isNew: true, selected: defaultData}))
    }

}

export default withRouter(withStyles(styles)(Contacts))
