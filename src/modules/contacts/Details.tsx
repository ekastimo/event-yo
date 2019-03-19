import * as React from 'react';
import {WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {IContact} from "./types";
import {get} from "../../utils/ajax";
import {remoteRoutes} from "../../data/constants";
import * as validate from "validate.js";
import {RouteComponentProps} from "react-router";
import Loading from "../../widgets/Loading";
import Error from "../../widgets/Error";
import ImageView from "./views/ImageView";
import PersonView from "./views/PersonView";
import TabbedDetails from "./TabbedDetails";
import GridWrapper from "../../widgets/GridWrapper";
import {fetchContact} from "./redux";
import {connect} from "react-redux";
import {IStore} from "../../data/types";
import Toast from "../../utils/Toast";
import LocationView from "./views/ChcView";
import AppBase from "../../base/AppBase";

const styles = () =>
    createStyles({
        root: {flexGrow: 1}
    });

interface IPrams {
    contactId: string
}

interface IState {
    isLoading: boolean
    data?: IContact
    error?: string
}

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<IPrams> {

}

class Details extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    public render() {
        const {isLoading, data, error} = this.state
        if (isLoading) {
            return <Loading/>
        }
        if (error || !data) {
            return <Error message='Failed to load contact!'/>
        }
        return (
            <AppBase
                title={data.person.firstName}
            >
                <GridWrapper>
                    <Grid container spacing={16}>
                        <Grid item xs={12} md={4}>
                            <ImageView data={data}/>
                            <LocationView data={data}/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <PersonView data={data} handleReload={this.reloadData}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TabbedDetails data={data} handleReload={this.reloadData}/>
                        </Grid>
                    </Grid>
                </GridWrapper>
            </AppBase>

        );
    }

    public componentWillMount() {
        this.reloadData()
    }

    private reloadData = () => {
        const {match} = this.props
        const {params: {contactId}} = match
        if (validate.isDefined(contactId)) {
            const url = `${remoteRoutes.contactById}/${contactId}`
            get(url, (data: IContact) => {
                console.log("Fetched contact", data)
                this.setState(() => ({data}))
            }, undefined, () => {
                this.setState(() => ({isLoading: false}))
            })
        } else {
            Toast.error("Oops Invalid contact data")
        }
    }
}


export default connect(
    ({contacts:{contact}}: IStore) => {
        return {
            data: contact.data,
            isLoading:contact.isLoading
        }
    },
    (dispatch: any) => {
        return {
            loadData: (data: string) => dispatch(fetchContact(data))
        }
    }
)(withStyles(styles)(Details))
