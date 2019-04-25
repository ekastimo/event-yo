import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import DoneIcon from '@material-ui/icons/Done';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EventIcon from '@material-ui/icons/Event';
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import {Theme, withStyles} from '@material-ui/core/styles';
import moment from 'moment';
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import {IEvent} from "../types";
import {printDayOfMonth, printShortDate} from "../../../utils/dates";
import Loading from "../../../widgets/Loading";
import {IUser} from "../../../data/types";
import {remoteRoutes} from "../../../data/constants";
import {eventSchema} from "../config";
import EventForm from "../editors/EventForm";
import FormHolder from "../../../widgets/FormHolder";


const styles = (theme: Theme) =>
    createStyles({
        card: {
            // maxWidth: 400,
        },
        media: {
            objectFit: 'cover',
            height: 150,
            [theme.breakpoints.up('md')]: {
                height: 350
            }
        },
        chip: {
            margin: theme.spacing.unit
        },
        actions: {
            display: 'flex',
            paddingBottom: 0
        },
        expand: {
            transform: 'rotate(0deg)',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
            marginLeft: 'auto',
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
        root: {
            flexGrow: 1,
        },
        button: {
            fontSize: 12,
        },
        extendedIcon: {
            fontSize: 16,
        },
        tags: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        noBottomPadding: {
            paddingBottom: 0
        },
        noPadding: {
            padding: 0
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data?: IEvent
    user: IUser
    handleCompletion: (data: any) => any
}

interface IState {
    showDialog: boolean
    data?: IEvent
}

function Location(props: { event: IEvent }) {
    return <Grid item xs={12} sm={6}>
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{display: "inline-block"}}>
                <MyLocationIcon/>
                &nbsp;&nbsp;
            </div>
            <div style={{flexGrow: 1}}>
                <Typography variant='subtitle2'>
                    {props.event.venue}
                </Typography>
                <Typography variant='caption'>
                    {props.event.freeFormAddress}
                </Typography>
            </div>
        </div>
    </Grid>;
}

function DateComponent(props: { event: IEvent }) {
    const shortTime = (dt: any) => moment(dt).format('LT');
    return <Grid item xs={12} sm={6}>
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{display: "inline-block"}}>
                <EventIcon/>
                &nbsp;&nbsp;
            </div>
            <div style={{flexGrow: 1}}>
                <Typography variant='subtitle2'>
                    {printShortDate(props.event.startDate)} - {printShortDate(props.event.endDate)}
                </Typography>
                <Typography variant='caption'>
                    {printDayOfMonth(props.event.startDate)} at {shortTime(props.event.startDate)} - {printDayOfMonth(props.event.endDate)} at {shortTime(props.event.endDate)}
                </Typography>
            </div>
        </div>
    </Grid>;
}

class InfoView extends React.Component<IProps, IState> {
    public state = {
        showDialog: false,
        data: undefined
    };


    public render() {
        const {classes, data, handleCompletion} = this.props;
        const toEdit: any = {...data}
        delete toEdit['items']
        if (!data) {
            return (
                <Loading/>
            );
        }
        const event: IEvent = data;

        const renderChip = (it: string) => <Chip
            key={it}
            label={`#${it}`}
            className={classes.chip}
            clickable
        />;

        const handleEdit = (e: any) => {
            this.setState(() => ({showDialog: true}))
        };

        const handleClose = () => {
            this.setState(() => ({showDialog: false}))
        }
        return (
            <div style={{paddingTop: 4}}>
                <Grid container justify='center' spacing={8}>
                    <Grid item sm={8} xs={12}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image={event.images[0]}
                                title='Event Image'
                                component="img"
                            />
                            <CardContent className={classes.noBottomPadding}>
                                <Typography gutterBottom variant="h6">
                                    {event.name}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <Grid container justify='space-evenly' direction="row" spacing={8} alignItems="center">
                                    <Grid item>
                                        <Button fullWidth size='small' className={classes.button}>
                                            <ThumbUpIcon className={classes.extendedIcon}/>
                                            Like
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button fullWidth size='small' className={classes.button}>
                                            <DoneIcon className={classes.extendedIcon}/>
                                            Going
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button fullWidth size='small' className={classes.button}
                                                onClick={handleEdit}>
                                            <EditIcon className={classes.extendedIcon}/>
                                            Edit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <CardContent className={classes.noBottomPadding}>
                                <Grid container justify='center' spacing={8}>
                                    <DateComponent event={event}/>
                                    <Location event={event}/>
                                </Grid>
                            </CardContent>
                            <CardContent className={classes.noPadding}>
                                <div className={classes.tags}>
                                    {event.tags.map(renderChip)}
                                </div>
                            </CardContent>
                            <CardContent>
                                <Typography variant='body1'>{event.details}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <FormHolder
                    title='Edit Event'
                    open={this.state.showDialog}
                    onClose={handleClose}
                    data={toEdit}
                    url={remoteRoutes.events}
                    isNew={false}
                    schema={eventSchema}
                    onAjaxComplete={handleCompletion}
                    debug
                >
                    <EventForm/>
                </FormHolder>
            </div>
        );


    }
}


export default withStyles(styles)(InfoView);



