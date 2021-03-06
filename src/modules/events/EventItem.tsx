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
import {trimSentence} from "../../utils/TK";
import {printDate, printDateTime,printDay,printMonth} from "../../utils/dates";


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

        avatar: {
            backgroundColor: red[500],
        },

        myAvatar: {
            height: 40,
            width: 40
        },
        myAvatarDate: {

        },
    });

interface IProps extends WithStyles<typeof styles> {
    data: IEvent
    handleClick: () => any
}

class EventItem extends React.Component<IProps> {
    public state = {expanded: false};

    public render() {
        const {classes, data} = this.props;
        const subHeaderText = printDateTime(data.startDate)
        const killIt = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault()
            e.stopPropagation()
        }
        return (
            <div>
                <Card className={classes.card} onClick={this.props.handleClick}>
                    <CardHeader
                        avatar={
                            <div className={classes.myAvatar}>
                                <Typography variant="body2" align='center'>{printMonth(data.startDate)}</Typography>
                                <Typography variant="body1" align='center'><b>{printDay(data.startDate)}</b></Typography>
                            </div>
                        }
                        title={<Typography variant="body1">{data.name}</Typography>}
                        subheader={<Typography variant="caption">{subHeaderText}</Typography>}
                    />
                    <CardMedia
                        className={classes.media}
                        image={data.images[0]}
                        title="Event Image"
                    />
                    <CardContent>
                        <Typography component="p">{trimSentence(data.details, 100)}</Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites" onClick={killIt}>
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="Share" onClick={killIt}>
                            <ShareIcon/>
                        </IconButton>
                        <IconButton aria-label="More" onClick={this.props.handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        );
    }

}

export default withStyles(styles)(EventItem);
