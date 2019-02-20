import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {localRoutes, remoteRoutes} from "../../data/constants";
import {del} from "../../utils/ajax";
import {withStyles} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from 'react-router'
import ContactItem from "./ContactItem";
import {IContact} from "./types";
import {newPersonSchema, renderName} from "./config";
import FormHolder from "../../widgets/FormHolder";
import NewPersonEditor from "./editors/NewPersonEditor";
import ListView from "../../widgets/lists/ListView";
import Toast from "../../utils/Toast";
import uiConfirm from "../../widgets/confirm";
import {connect} from "react-redux";
import {IStore} from "../../data/types";
import {fetchData,createContact,updateContact} from "./redux";

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
    isLoading: boolean,
    data: IContact[],
    loadData: (data: any) => any,
}

interface IState {
    search: ISearch,
    showDialog: boolean,

}

export interface ISearch {
    limit: number,
    skip: number,
    name?: string
}

class Contacts extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            showDialog: false,
            search: {
                limit: 40,
                skip: 0
            }
        }
    }

    public componentDidMount() {
        this.reloadData(this.state.search)
    }

    public render() {
        const {isLoading, data} = this.props
        return (
            <div>
                <ListView
                    isLoading={isLoading}
                    title='Contacts'
                    hasData={data && data.length > 0}
                    handleAdd={this.handleNewContact}
                    handleSearch={this.handleChange}
                >
                    {
                        data.map((contact: any) => (
                            <ContactItem
                                key={contact.id}
                                data={{...contact}}
                                onEdit={this.handleEdit}
                                onDelete={this.handleDelete}
                            />
                        ))
                    }
                </ListView>
                <FormHolder
                    title='New Contact'
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    data={{}}
                    url={remoteRoutes.contactsPerson}
                    isNew={true}
                    schema={newPersonSchema}
                    onAjaxComplete={this.handleCompletion}
                >
                    <NewPersonEditor/>
                </FormHolder>
            </div>
        )
    }

    handleCompletion = () => {
        this.reloadData()
    }

    private reloadData(request: any = {}) {
        this.props.loadData(request)
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
        const {person, id} = data;
        uiConfirm(`Do you really want to delete ${renderName(person)}?`).then(() => {
            const url = `${remoteRoutes.contacts}/${id}`;
            del(url, data => {
                Toast.info(data.message)
                this.handleCompletion()
            });
        }).catch(e => undefined)
    }
}


export default connect(
    ({contacts}: IStore) => {
        return {
            data: contacts.data,
            isLoading:contacts.isFetching
        }
    },
    (dispatch: any) => {
        return {
            loadData: (data: any) => dispatch(fetchData(data)),
            createContact: (data: any) => dispatch(createContact(data)),
            updateContact: (data: any) => dispatch(updateContact(data))
        }
    }
)(withRouter(withStyles(styles)(Contacts)))
