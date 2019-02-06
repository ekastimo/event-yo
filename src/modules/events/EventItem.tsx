import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import {IEvent} from "./types";


const styles = (theme: Theme) =>
    createStyles({
        card: {
            // maxWidth: 400,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        actions: {
            display: 'flex',
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
    });

interface IProps extends WithStyles<typeof styles> {
    data: IEvent
    handleClick: ()=>any
}

class EventItem extends React.Component<IProps> {
    public state = {expanded: false};

    public render() {
        const {classes, data} = this.props;
        const subHeaderText = data.startDate
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Event" className={classes.avatar}>
                                E
                            </Avatar>
                        }
                        action={
                            <IconButton onClick={this.props.handleClick}>
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title={data.name}
                        subheader={<Typography variant="caption">{subHeaderText}</Typography>}
                    />
                    <CardMedia
                        className={classes.media}
                        image={data.images[0]}
                        title="Event Image"
                    />
                    <CardContent>
                        <Typography component="p">{data.details}</Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon/>
                        </IconButton>
                        <IconButton aria-label="More">
                            <MoreVertIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        );
    }

}

export default withStyles(styles)(EventItem);
