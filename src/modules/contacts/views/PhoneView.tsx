import * as React from 'react';
import {WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {IContact, IPhone} from "../types";
import FormHolder from "../../../widgets/FormHolder";
import {remoteRoutes} from "../../../data/constants";
import {phoneSchema} from "../config";
import PhoneEditor from "../editors/PhoneEditor";
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
    data?: IPhone
}

class PhoneView extends React.Component<IProps, IState> {
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
                                Phones
                            </Typography>
                        }
                    />
                    <CardContent>
                        <div>
                            {
                                data.phones&&
                                data.phones.map((it: IPhone) => {
                                    return <ItemEditor
                                        key={it.id}
                                        text={it.number}
                                        isPrimary={it.isPrimary}
                                        isLoading={isLoading}
                                        primary={<PhoneIcon fontSize="inherit"/>}
                                        secondaryIcon={<PhoneOutlinedIcon fontSize="inherit"/>}
                                        handleEdit={this.handleEdit.bind(this, {...it})}
                                        handleDelete={this.handleDelete.bind(this, {...it})}
                                    />
                                })
                            }
                        </div>
                    </CardContent>
                    <FormHolder
                        title='Edit Phone'
                        open={this.state.showDialog}
                        onClose={this.handleClose}
                        data={this.state.data}
                        url={`${remoteRoutes.contactsPhone}/${data.id}`}
                        isNew={!this.state.data}
                        schema={phoneSchema}
                        onAjaxComplete={this.props.handleReload}
                    >
                        <PhoneEditor/>
                    </FormHolder>
                </Card>
            </div>
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        this.setState(() => ({showDialog: true}))
    }

    private handleEdit = (data: IPhone) => {
        this.setState(() => ({showDialog: true, data}))
    }

    private handleClose = () => {
        this.setState(() => ({showDialog: false, data: undefined}))
    }

    private handleDelete = (rec: IPhone) => {
        uiConfirm("Do you really want to delete this?").then(() => {
            const {id} = this.props.data;
            const url = `${remoteRoutes.contactsPhone}/${id}/${rec.id}`;
            del(url, data => {
                Toast.info(data.message)
                this.props.handleReload()
            }, undefined, () => {

            });
        }).catch(e => undefined)
    }
}

export default withStyles(styles)(PhoneView)
