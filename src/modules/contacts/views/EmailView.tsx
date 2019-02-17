import * as React from 'react';
import {List, Theme, WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import EmailIcon from '@material-ui/icons/Email';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {IContact, IEmail} from "../types";
import FormHolder from "../../../widgets/FormHolder";
import {remoteRoutes} from "../../../data/constants";
import {emailSchema} from "../config";
import EmailEditor from "../editors/EmailEditor";
import uiConfirm from "../../../widgets/confirm";
import {del} from "../../../utils/ajax";
import Toast from "../../../utils/Toast";
import ItemEditor from "./ItemEditor";

const styles = () =>
    createStyles({
        root: {},
        cardHeader: {
            paddingBottom: 0
        },
    });

interface IProps extends WithStyles<typeof styles> {
    data: IContact
    handleReload: () => any
}

interface IState {
    showDialog: boolean
    data?: IEmail
}

class EmailView extends React.Component<IProps, IState> {
    public state = {
        showDialog: false,
        isLoading: false,
        data: undefined
    }

    public render() {
        const {classes, data} = this.props
        const {isLoading} = this.state
        return (
            <div className={classes.root}>
                <Card elevation={1}>
                    <CardHeader
                        className={classes.cardHeader}
                        action={
                            <Button variant="text" size="small" onClick={this.handleClick}>
                                Add&nbsp;<AddIcon fontSize="small"/>
                            </Button>
                        }
                        title={
                            <Typography variant="button">
                                Emails
                            </Typography>
                        }
                    />
                    <CardContent>
                        <List>
                            {
                                data.emails&&
                                data.emails.map((it: IEmail) => {
                                    return <ItemEditor
                                        key={it.id}
                                        text={it.address}
                                        isPrimary={it.isPrimary}
                                        isLoading={isLoading}
                                        primary={<EmailIcon fontSize="inherit"/>}
                                        secondaryIcon={<EmailOutlinedIcon fontSize="inherit"/>}
                                        data={it}
                                        handleEdit={this.handleEdit}
                                        handleDelete={this.handleDelete}
                                    />
                                })
                            }
                        </List>
                    </CardContent>
                    <FormHolder
                        title='Edit Email'
                        open={this.state.showDialog}
                        onClose={this.handleClose}
                        data={this.state.data}
                        url={`${remoteRoutes.contactsEmail}/${data.id}`}
                        isNew={!this.state.data}
                        schema={emailSchema}
                        onAjaxComplete={this.props.handleReload}
                    >
                        <EmailEditor/>
                    </FormHolder>
                </Card>
            </div>
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        this.setState(() => ({showDialog: true}))
    }

    private handleEdit = (email: IEmail) => {
        this.setState(() => ({showDialog: true, data: email}))
    }

    private handleClose = () => {
        this.setState(() => ({showDialog: false, data: undefined}))
    }
    private handleDelete = (rec: IEmail) => {
        uiConfirm("Do you really want to delete this?").then(() => {
            const {id} = this.props.data;
            const url = `${remoteRoutes.contactsEmail}/${id}/${rec.id}`;
            del(url, data => {
                Toast.info(data.message)
                this.props.handleReload()
            }, undefined, () => {

            });
        }).catch(e => undefined)
    }
}

export default withStyles(styles)(EmailView)
