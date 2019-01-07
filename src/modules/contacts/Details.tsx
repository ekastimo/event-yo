import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
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
import BasePanel from "../../base/BasePanel";
import ImageView from "./views/ImageView";
import PersonView from "./views/PersonView";
import TabbedDetails from "./TabbedDetails";

const styles = (theme: Theme) =>
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
            <BasePanel>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={4}>
                        <ImageView data={data}/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <PersonView data={data}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TabbedDetails data={data}/>
                    </Grid>
                </Grid>
            </BasePanel>
        );
    }

    public componentWillMount() {
        const {match} = this.props
        const {params: {contactId}} = match
        if (validate.isDefined(contactId)) {
            const url = `${remoteRoutes.contacts}/${contactId}`
            get(url, (data: IContact) => {
                console.log("Fetched contact", data)
                this.setState(() => ({data}))
            }, undefined, () => {
                this.setState(() => ({isLoading: false}))
            })
        } else {
            this.setState(() => ({isLoading: false, error: 'Invalid path'}))
        }
    }
}

export default withStyles(styles)(Details)
