import * as React from 'react';
import {WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import PhoneIcon from '@material-ui/icons/Phone';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleOutlinedIcon from '@material-ui/icons/PanoramaFishEyeOutlined';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {IContact, IEmail, IPhone} from "../types";
import FormHolder from "../editors/FormHolder";
import {remoteRoutes} from "../../../data/constants";
import {phoneSchema} from "../config";
import PhoneEditor from "../editors/PhoneEditor";

const styles = () =>
    createStyles({
        root: {},
        cardHeader: {
            paddingBottom: 0
        },
        decoIcon: {
            float: 'left'
        },
        label: {
            float: 'left',
            display: 'inline-block',
            paddingBottom: 5
        },
        labelGrid: {
            padding: 10
        },
        rightFloat: {
            float: 'right'
        },
        categoryIcon: {
            float: 'left',
            marginTop: 10
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
        data: undefined
    }

    public render() {
        const {classes, data} = this.props
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
                        <Grid container>
                            {
                                data.phones.map((it: IPhone) => {
                                    return <React.Fragment key={it.number}>
                                        <Grid item xs={9} sm={9} className={classes.labelGrid}>
                                            <PhoneIcon fontSize="small" className={classes.decoIcon}/>
                                            <Typography className={classes.label}>&nbsp;&nbsp;{it.number}</Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={3}>
                                            {
                                                it.isPrimary ?
                                                    <CheckCircleIcon className={classes.categoryIcon}/>
                                                    : <CheckCircleOutlinedIcon className={classes.categoryIcon}/>
                                            }
                                            <IconButton
                                                aria-label="Edit"
                                                onClick={this.handleEdit.bind(this, {...it})}
                                                className={classes.rightFloat}
                                            >
                                                <EditIcon fontSize="small"/>
                                            </IconButton>
                                        </Grid>
                                    </React.Fragment>
                                })
                            }
                        </Grid>
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
}

export default withStyles(styles)(PhoneView)
