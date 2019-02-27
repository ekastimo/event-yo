import * as React from 'react';
import {List, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {localRoutes, remoteRoutes} from "../../data/constants";
import {del, search} from "../../utils/ajax";
import {withStyles} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from 'react-router'
import LocationItem from "./LocationItem";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {ILocation} from "./types";
import Loading from "../../widgets/Loading";
import {locationSchema} from "./config";
import FormHolder from "../../widgets/FormHolder";
import LocationEditor from "./editors/LocationEditor";
import XToolBar from "../../widgets/XToolBar";
import Toast from "../../utils/Toast";
import uiConfirm from "../../widgets/confirm";
import {renderName} from "../contacts/config";
import ListView from "../../widgets/lists/ListView";

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
    toEdit?: ILocation
    data: ILocation[],
    search: ISearch,
    showDialog: boolean
}

interface ISearch {
    limit: number,
    skip: number,
    name?: string
}

class Locations extends React.Component<IProps, IState> {
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
        const {isLoading, data, toEdit, showDialog} = this.state
        return (
            <div>

                <ListView
                    isLoading={isLoading}
                    title='Church Locations'
                    hasData={data && data.length > 0}
                    handleAdd={this.handleNewContact}
                    handleSearch={this.handleChange}
                >
                    {
                        data.map((it: any) => (
                            <LocationItem
                                key={it.id}
                                data={{...it}}
                                onEdit={this.handleEdit}
                                onDelete={this.handleDelete}
                            />
                        ))
                    }
                </ListView>
                {showDialog &&
                <FormHolder
                    title='New Location'
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    data={toEdit ? {...toEdit} : {}}
                    url={remoteRoutes.locations}
                    isNew={!toEdit}
                    schema={locationSchema}
                    onAjaxComplete={this.handleCompletion}
                >
                    <LocationEditor/>
                </FormHolder>
                }

            </div>
        )
    }

    public componentDidMount() {
        this.reloadData(this.state.search)
    }

    private reloadData(request: any = {}) {
        search(remoteRoutes.locations, request, data => {
            this.setState(() => ({data, isLoading: false}))
        }, undefined, () => {
            this.setState(() => ({isLoading: false}))
        })
    }

    handleCompletion = () => {
        this.reloadData()
    }

    private handleEdit = (toEdit: any) => {
        this.setState(() => ({showDialog: true, toEdit}))
    }

    private handleNewContact = () => {
        this.setState(() => ({showDialog: true}))
    }

    private handleClose = () => {
        this.setState(() => ({showDialog: false, toEdit: undefined}))
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
        uiConfirm(`Do you really want to delete ${name}?`).then(() => {
            const url = `${remoteRoutes.locations}/${id}`;
            this.setState(() => ({isLoading: true}))
            del(url, data => {
                Toast.info(data.message)
                this.handleCompletion()
            }, undefined, () => {
                this.setState(() => ({isLoading: true}))
            });
        }).catch(e => undefined)
    }
}

export default withRouter(withStyles(styles)(Locations))
