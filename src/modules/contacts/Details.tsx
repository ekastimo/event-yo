import * as React from 'react';
import {WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {IContact} from "./types";
import * as validate from "validate.js";
import {RouteComponentProps} from "react-router";
import Loading from "../../widgets/Loading";
import Error from "../../widgets/Error";
import ImageView from "./views/ImageView";
import PersonView from "./views/PersonView";
import TabbedDetails from "./TabbedDetails";
import GridWrapper from "../../widgets/GridWrapper";
import {fetchContact} from "./contactsRedux";
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
    loadData: (id: string) => any
    data: IContact
    isLoading: boolean
}

class Details extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    public render() {
        const {isLoading, data} = this.props
        if (isLoading) {
            return <Loading/>
        }
        if (!isLoading && !data) {
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
        const {match, loadData} = this.props
        const {params: {contactId}} = match
        if (validate.isDefined(contactId)) {
            loadData(contactId)
        } else {
            Toast.error("Oops Invalid contact ID")
        }
    }
}


export default connect(
    ({contacts: {cache,isFetchingSingle}}: IStore, ownProps: IProps) => {
        const {match} = ownProps
        const {params: {contactId}} = match
        return {
            data: cache[contactId],
            isLoading: isFetchingSingle
        }
    },
    (dispatch: any) => {
        return {
            loadData: (id: string) => dispatch(fetchContact(id))
        }
    }
)(withStyles(styles)(Details))
