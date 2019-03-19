import * as React from 'react';
import {localRoutes, remoteRoutes} from "../../data/constants";
import {RouteComponentProps, withRouter} from 'react-router'
import TeamItem from "./TeamItem";
import {teamSchema} from "./config";
import FormHolder from "../../widgets/FormHolder";
import NewTeamEditor from "./editors/NewTeamEditor";
import ListView from "../../widgets/lists/ListView";
import AppBase from "../../base/AppBase";
import {useDataManipulator} from "../../data/hooks";
import {connect} from "react-redux";
import {IStore} from "../../data/types";
import {fetchData} from "./redux";


interface IProps extends RouteComponentProps<any> {
    loadData: (req: any) => any
    data: any[]
    isLoading: boolean
}

function Teams(props: IProps) {
    const {
        isNew,toEdit, showDialog,
        handleSearch, handleClose, handleDelete,
        handleNew, handleCompletion
    } = useDataManipulator({deleteUrl: remoteRoutes.locations, loadData: props.loadData})
    const {data, isLoading} = props
    const handleEdit = (data: any) => {
        const path = `${localRoutes.teams}/${data.id}`
        const {history} = props
        history.push(path)
    }

    return (
        <AppBase
            handleSearch={handleSearch}
            title='Teams'
        >
            <ListView
                isLoading={isLoading}
                hasData={data && data.length > 0}
                handleAdd={handleNew}
            >
                {
                    data.map((it: any) => (
                        <TeamItem
                            key={it.id}
                            data={{...it}}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                }
            </ListView>
            <FormHolder
                open={showDialog}
                onClose={handleClose}
                url={remoteRoutes.teams}
                onAjaxComplete={handleCompletion}
                title='New Team'
                data={{}}
                isNew={true}
                schema={teamSchema}
            >
                <NewTeamEditor/>
            </FormHolder>

        </AppBase>
    )
}

export default connect(
    ({teams}: IStore) => {
        return {
            data: teams.data,
            isLoading: teams.isFetching
        }
    },
    (dispatch: any) => {
        return {
            loadData: (data: any) => dispatch(fetchData(data))
        }
    }
)(withRouter(Teams))





/*


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
            <AppBase
                handleSearch={handleSearch}
                title='Church Locations'
            >

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
            </AppBase>
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


*/