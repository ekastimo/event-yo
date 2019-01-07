import * as React from 'react';
import {List, TextField, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {localRoutes, remoteRoutes} from "../../data/constants";
import {search} from "../../utils/ajax";
import {withStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {RouteComponentProps, withRouter} from 'react-router'
import ContactItem from "./ContactItem";
import Grid from '@material-ui/core/Grid';

import {IContact} from "./types";
import Loading from "../../widgets/Loading";
import {newPersonSchema} from "./config";
import FormHolder from "./editors/FormHolder";
import NewPersonEditor from "./editors/NewPersonEditor";

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
    data: IContact[],
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

    public componentDidMount() {
        this.reloadData(this.state.search)
    }

    public render() {
        const {isLoading, data} = this.state
        return (
            <div>
                <div style={{padding: 16}}>
                    <Grid container spacing={16}>
                        <Grid item xs>
                            <TextField
                                id="outlined-search"
                                label="Search field"
                                type="search"
                                margin="none"
                                variant="outlined"
                                fullWidth
                                onChange={this.onQuery}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant="outlined" onClick={this.handleNewContact}>
                                Add New
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                {
                    isLoading ?
                        <Loading/>
                        :
                        <List>
                            {
                                data.map((contact: any) => (
                                    <ContactItem
                                        key={contact.id}
                                        data={{...contact}}
                                        onView={this.handleEdit}
                                        onEdit={this.handleEdit}
                                        onDelete={this.handleEdit}
                                    />
                                ))
                            }
                        </List>
                }
                <FormHolder
                    title='New Contact'
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    data={{}}
                    url={remoteRoutes.contactsPerson}
                    isNew={true}
                    schema={newPersonSchema}
                    debug={true}
                >
                    <NewPersonEditor/>
                </FormHolder>
            </div>
        )
    }

    private reloadData(request: any) {
        search(remoteRoutes.contacts, request, data => {
            this.setState(() => ({data, isLoading: false}))
        }, undefined, () => {
            this.setState(() => ({isLoading: false}))
        })
    }

    private handleEdit = (data: any) => {
        const path = `${localRoutes.contacts}/${data.id}`
        const {history} = this.props
        history.push(path)
    }

    private handleNewContact = () => {
        this.setState(() => ({showDialog: true}))
    }

    private handleClose = () => {
        this.setState(() => ({showDialog: false}))
    }

    private onQuery = (e: any) => {
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
