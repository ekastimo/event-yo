import React, {Fragment} from 'react';
import {WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {IAddress, IContact, IMetaData} from "../types";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import FormHolder from "../../../widgets/FormHolder";
import {remoteRoutes} from "../../../data/constants";
import {contactChcFormDataParser, contactChcSchema} from "../config";
import Grid from '@material-ui/core/Grid';
import XRemoteSelect from "../../../widgets/inputs/XRemoteSelect";
import {MobileDisplayRow} from "../../../widgets/elements";
import {isNullOrEmpty} from "../../../utils/TK";

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

class ChcView extends React.Component<IProps, IState> {
    public state = {
        showDialog: false,
        locationData: undefined,
        isLoading: false,
    }

    public render() {
        const {classes, data} = this.props
        const {id, metaData} = data
        const {cellGroup, churchLocation} = metaData || {} as IMetaData
        const chcData = isNullOrEmpty(churchLocation) ?
            {contactId: id} :
            {
                contactId: id,
                cellGroup: {value: cellGroup, label: cellGroup},
                churchLocation: {value: churchLocation, label: churchLocation}
            }
        return (
            <div className={classes.root}>
                <Card>
                    <CardContent>
                        <Grid container spacing={8}>
                            <Grid item xs={5}>
                                <MobileDisplayRow
                                    label='Location'
                                    value={churchLocation}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <MobileDisplayRow
                                    label='Mc'
                                    value={cellGroup}
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
                    data={chcData}
                    url={`${remoteRoutes.contactsChc}`}
                    isNew={true}
                    schema={contactChcSchema}
                    onAjaxComplete={this.onContactUpdated}
                    dataParser={contactChcFormDataParser}
                >
                    <ChcForm/>
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


export const ChcForm = () => {
    const parser = (it: any) => ({label: it.name, value: it.id})
    return <Fragment>
        <div style={{padding: 12}}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={6}>
                    <XRemoteSelect
                        name='churchLocation' label='Church Location'
                        remote={remoteRoutes.locations}
                        parser={parser}
                        isMulti={false}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <XRemoteSelect
                        name='cellGroup' label='Missional Community'
                        remote={remoteRoutes.cellGroups}
                        parser={parser}
                        isMulti={false}
                    />
                </Grid>
            </Grid>
        </div>
    </Fragment>
}

export default withStyles(styles)(ChcView)
