import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import DoneIcon from '@material-ui/icons/Done';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
import {printDate} from "../../../utils/TK";


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
        chip:{
            margin: theme.spacing.unit
        }
        ,
        actions: {
            display: 'flex',
            backgroundColor: ''
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
        tags:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center'
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data?: IEvent
}

interface IState {
    expanded: boolean
    data?: IEvent
}

class InfoView extends React.Component<IProps, IState> {
    public state = {
        open: {},
        expanded: false,
        data: undefined
    };


    public render() {
        const {classes, data} = this.props;
        const shortDate = (dt: any) => moment(dt).format('MMM Do');
        const shortTime = (dt: any) => moment(dt).format('LT');
        if (!data) {
            return (
                <div>
                    Loading data
                </div>
            );
        }
        const event: IEvent = data;
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
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    {event.name}
                                </Typography>
                                <div className={classes.tags}>
                                    {event.tags.map(it=><Chip key={it} label={`#${it}`} className={classes.chip} clickable />)}
                                </div>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <Grid container justify='center' spacing={8}>
                                    <Grid item xs={4} sm={3}>
                                        <Button fullWidth size='small' className={classes.button}>
                                            <ThumbUpIcon className={classes.extendedIcon}/>
                                            Like
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={3}>
                                        <Button fullWidth size='small' className={classes.button}>
                                            <DoneIcon className={classes.extendedIcon}/>
                                            Going
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} sm={3}>
                                        <Button fullWidth size='small' className={classes.button}>
                                            <MoreVertIcon className={classes.extendedIcon}/>
                                            More
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <CardContent>
                                <Grid container justify='center' spacing={8}>
                                    <Grid item xs={12} sm={6}>
                                        <div style={{display: 'inline-block'}}>
                                            <EventIcon/>
                                        </div>                                         &nbsp;&nbsp;
                                        <div style={{display: 'inline-block'}}>
                                            <Typography variant='subtitle2'>
                                                {shortDate(event.startDate)} - {shortDate(event.endDate)}
                                            </Typography>
                                            <Typography variant='caption'>
                                                {shortDate(event.startDate)} at {shortTime(event.startDate)} - {shortDate(event.endDate)} at {shortTime(event.endDate)}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div style={{display: 'inline-block'}}>
                                            <MyLocationIcon/>
                                        </div>                                        &nbsp;&nbsp;
                                        <div style={{display: 'inline-block'}}>
                                            <Typography variant='subtitle2'>
                                                {event.venue}
                                            </Typography>
                                            <Typography variant='caption'>
                                                {event.freeFormAddress}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardContent>
                                <Typography variant='body1'>{event.details}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(InfoView);



