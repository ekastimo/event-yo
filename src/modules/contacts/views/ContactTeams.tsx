import React, {Fragment} from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {remoteRoutes} from "../../../data/constants";
import {del, get} from "../../../utils/ajax";
import {withStyles} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from 'react-router'
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {ITeam} from "../../teams/types";
import Grid from '@material-ui/core/Grid';
import ListView from "../../../widgets/lists/ListView";
import {parseAvatar, toOptions} from "../../../utils/TK";
import {teamMemberCategory, teamMemberSimpleSchema} from "../../teams/config";
import SelectInput from "../../../widgets/inputs/SelectInput";
import XRemoteSelect from "../../../widgets/inputs/XRemoteSelect";
import {IOption} from "../../../data/types";
import FormHolder from "../../../widgets/FormHolder";
import XListItem from "../../../widgets/lists/XListItem";
import Toast from "../../../utils/Toast";
import uiConfirm from "../../../widgets/confirm";

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
    contactId: string
}

interface IState {
    isLoading: boolean,
    data: ITeam[],
    toEdit?: ITeam,
    search: ISearch,
    showDialog: boolean
}

interface ISearch {
    limit: number,
    skip: number,
    name?: string
}

class ContactTeams extends React.Component<IProps, IState> {
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
        const {isLoading, data, showDialog, toEdit} = this.state
        console.log("Rendering", toEdit)
        return (
            <div>
                <ListView
                    isLoading={isLoading}
                    handleAdd={this.handleAdd}
                    hasData={data && data.length > 0}
                >
                    {
                        data.map((it: any) => (

                            <XListItem
                                key={it.name}
                                data={it}
                                onDelete={this.handleDelete}
                                onEdit={this.handleEdit}
                            >
                                <Avatar>{parseAvatar(it.name)}</Avatar>
                                <ListItemText
                                    primary={it.name}
                                    secondary={it.description}
                                />
                            </XListItem>
                        ))
                    }
                </ListView>

                <FormHolder
                    title='Add to Team'
                    open={showDialog}
                    onClose={this.handleClose}
                    data={toEdit}
                    url={remoteRoutes.teamsMembersByContact}
                    isNew={!toEdit}
                    schema={teamMemberSimpleSchema}
                    onAjaxComplete={this.reloadData}
                    dataParser={this.dataParser}
                >
                    <TeamForm/>
                </FormHolder>
            </div>
        )
    }

    /*
    Clean up data from the form
    {
        role: "Leader",
        teamId: {label: "Sample team", value: "d84d0a8c-6cb5-485d-b487-80359350fef5"
    }
    */
    private dataParser = (data: any) => {
        const {contactId} = this.props
        const {teamId} = data;
        if (typeof teamId === 'string') {
            return {...data, contactId}
        }
        return {...data, contactId, teamId: teamId.value}
    }

    public componentDidMount() {
        this.reloadData()
    }

    private reloadData = () => {
        const url = `${remoteRoutes.teamsMembersByContact}/${this.props.contactId}`
        get(url, data => {
            this.setState(() => ({data, isLoading: false}))
        }, undefined, () => {
            this.setState(() => ({isLoading: false}))
        })
    }

    private handleSearch = (query: string) => {
        console.log("Search Item ", query)
    }

    private handleAdd = () => {
        this.setState(() => ({showDialog: true}))
    }

    private handleClose = () => {
        console.log("Closing dialog")
        this.setState(() => ({showDialog: false, toEdit: undefined}))
    }

    private handleEdit = (selected: any) => {
        const {teamId: value, name: label} = selected
        const toEdit = {...selected, teamId: {value, label}}
        this.setState(() => ({showDialog: true, toEdit}))
    }

    private handleDelete = (selected: any) => {
        uiConfirm("Please confirm that you want to delete this member").then(() => {
            const url = `${remoteRoutes.teamsMembers}/${selected.id}`
            del(url, (resp: any) => {
                Toast.info(resp.message)
                this.reloadData()
            })
        }, () => {
        });
    }
}


const TeamForm = (props: any) => {
    const ids: any[] = []
    const filter = (it: IOption) => ids.indexOf(it.value) === -1
    const parser = (it: any) => ({label: it.name, value: it.id})
    return <Fragment>
        <div style={{padding: 12}}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                    <XRemoteSelect
                        name='teamId' label='Team'
                        remote={remoteRoutes.teams}
                        parser={parser}
                        filter={filter}
                        isMulti={false}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SelectInput name='role' label='Type' options={toOptions(teamMemberCategory)}/>
                </Grid>
            </Grid>
        </div>
    </Fragment>
}


export default withRouter(withStyles(styles)(ContactTeams))
