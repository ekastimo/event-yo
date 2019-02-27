import React, {Fragment} from 'react';
import {WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {IAddress, IContact} from "../types";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import FormHolder from "../../../widgets/FormHolder";
import {remoteRoutes} from "../../../data/constants";
import {addressSchema} from "../config";
import {IOption} from "../../../data/types";
import Grid from '@material-ui/core/Grid';
import XRemoteSelect from "../../../widgets/inputs/XRemoteSelect";
import {MobileDisplayRow} from "../../../widgets/elements";

const styles = () =>
    createStyles({
        root: {},
        cardHeader: {
            paddingBottom: 0
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data: IContact
}

interface IState {
    showDialog: boolean
    locationData?: any
}

class LocationView extends React.Component<IProps, IState> {
    public state = {
        showDialog: false,
        locationData: undefined,
        isLoading: false,
    }

    public render() {
        const {classes, data} = this.props
        const {isLoading} = this.state
        return (
            <div className={classes.root}>
                <Card>
                    <CardContent>
                        <Grid container spacing={8}>
                            <Grid item xs={5}>
                                <MobileDisplayRow
                                    label='Location'
                                    value={data.churchLocationName}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MobileDisplayRow
                                    label='Mc'
                                    value={data.cellGroupName}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={this.handleClick}>
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <FormHolder
                    title='Edit Church details'
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    data={this.state.locationData}
                    url={`${remoteRoutes.contactsAddress}/${data.id}`}
                    isNew={false}
                    schema={addressSchema}
                    debug={true}
                    onAjaxComplete={this.onContactUpdated}
                >
                    <LocationForm/>
                </FormHolder>
            </div>
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        this.setState(() => ({showDialog: true}))
    }

    private handleEdit = (email: IAddress) => {
        this.setState(() => ({showDialog: true, locationData: email}))
    }

    private handleClose = () => {
        this.setState(() => ({showDialog: false, locationData: undefined}))
    }

    private onContactUpdated = (data: any) => {
        console.log("Contact Updated")
    }

}


const LocationForm = (props: any) => {
    const ids: any[] = []
    const filter = (it: IOption) => ids.indexOf(it.value) === -1
    const parser = (it: any) => ({label: it.name, value: it.id})
    return <Fragment>
        <div style={{padding: 12}}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                    <XRemoteSelect
                        name='churchLocation' label='Church Location'
                        remote={remoteRoutes.locations}
                        parser={parser}
                        filter={filter}
                        isMulti={false}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <XRemoteSelect
                        name='cellGroup' label='Missional Community'
                        remote={remoteRoutes.cellGroups}
                        parser={parser}
                        filter={filter}
                        isMulti={false}
                    />
                </Grid>
            </Grid>
        </div>
    </Fragment>
}

export default withStyles(styles)(LocationView)
