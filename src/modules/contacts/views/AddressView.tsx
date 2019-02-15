import * as React from 'react';
import {WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import LocationIcon from '@material-ui/icons/LocationCity';
import LocationOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {IAddress, IContact} from "../types";
import FormHolder from "../../../widgets/FormHolder";
import {remoteRoutes} from "../../../data/constants";
import {addressSchema} from "../config";
import AddressEditor from "../editors/AddressEditor";
import ItemEditor from "./ItemEditor";
import Toast from "../../../utils/Toast";
import {del} from "../../../utils/ajax";
import uiConfirm from "../../../widgets/confirm";

const styles = () =>
    createStyles({
        root: {},
        cardHeader: {
            paddingBottom: 0
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data: IContact
    handleReload: () => any
}

interface IState {
    showDialog: boolean
    data?: IAddress
}

class AddressView extends React.Component<IProps, IState> {
    public state = {
        showDialog: false,
        data: undefined,
        isLoading: false,
    }

    public render() {
        const {classes, data} = this.props
        const {isLoading} = this.state
        return (
            <div className={classes.root}>
                <Card>
                    <CardHeader
                        className={classes.cardHeader}
                        action={
                            <Button variant="text" size="small" onClick={this.handleClick}>
                                Add&nbsp;<AddIcon fontSize="small"/>
                            </Button>
                        }
                        title={
                            <Typography variant="button">
                                Addresses
                            </Typography>
                        }
                    />
                    <CardContent>
                        <div>
                            {
                                data.addresses &&
                                data.addresses.map((it: IAddress) => {
                                    return <ItemEditor
                                        key={it.id}
                                        text={it.originalFreeform}
                                        isPrimary={it.isPrimary}
                                        isLoading={isLoading}
                                        primary={<LocationIcon fontSize="inherit"/>}
                                        secondaryIcon={<LocationOutlinedIcon fontSize="inherit"/>}
                                        handleEdit={this.handleEdit.bind(this, {...it})}
                                        handleDelete={this.handleDelete.bind(this, {...it})}
                                    />
                                })
                            }
                        </div>
                    </CardContent>
                    <FormHolder
                        title='Edit Address'
                        open={this.state.showDialog}
                        onClose={this.handleClose}
                        data={this.state.data}
                        url={`${remoteRoutes.contactsAddress}/${data.id}`}
                        isNew={!this.state.data}
                        schema={addressSchema}
                        debug={true}
                        onAjaxComplete={this.props.handleReload}
                    >
                        <AddressEditor/>
                    </FormHolder>
                </Card>
            </div>
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        this.setState(() => ({showDialog: true}))
    }

    private handleEdit = (email: IAddress) => {
        this.setState(() => ({showDialog: true, data: email}))
    }

    private handleClose = () => {
        this.setState(() => ({showDialog: false, data: undefined}))
    }

    private handleDelete = (rec: IAddress) => {
        uiConfirm("Do you really want to delete this?").then(() => {
            const {id} = this.props.data;
            const url = `${remoteRoutes.contactsAddress}/${id}/${rec.id}`;
            del(url, data => {
                Toast.info(data.message)
                this.props.handleReload()
            }, undefined, () => {

            });
        }).catch(e => undefined)
    }
}

export default withStyles(styles)(AddressView)
