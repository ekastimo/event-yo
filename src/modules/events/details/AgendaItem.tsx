import * as React from 'react';
import moment from 'moment';
import {Theme, withStyles} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import withWidth from "@material-ui/core/withWidth/index";
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {IAgendaItem} from "../types";

const height = 150
const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            // backgroundColor: '#eeeeee',
        },
        profileImage: {
            [theme.breakpoints.up('xs')]: {
                backgroundColor: '#f6f6f6'
            },
            height: 90,
            width: 90,
            borderRadius: 8
        },
        timeView: {
            [theme.breakpoints.down('xs')]: {
                backgroundColor: '#f6f6f6'
            },
            [theme.breakpoints.up('sm')]: {
                height,
            },
        },
        contentView: {
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 10,
            },
            [theme.breakpoints.up('sm')]: {
                height,
            }
        },
        contentGrid: {
            flexGrow: 1,
            height: '100%'
        },
        imageView: {
            [theme.breakpoints.up('sm')]: {
                height,
            }

        },
        itemControls: {
            width: '100%'
        },
        button: {
            margin: 0,
            fontSize: 12,
        },
        iconSmall: {
            fontSize: 18,
        },
        itemDetails: {
            paddingLeft: 10
        },
        titleStyle: {
            [theme.breakpoints.down('sm')]: {
                fontSize: 18,
            }
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data: IAgendaItem
    width?: any
    handleClick: () => any
}

class AgendaItem extends React.Component<IProps> {
    public state = {
        open: {}
    };

    public render() {
        const {classes, data, width} = this.props;
        return (
            <React.Fragment>
                <ListItem disableGutters divider>
                    <Grid container justify="center" className={classes.root} spacing={16}>
                        <Hidden xsDown>
                            <Grid item xs={12} sm={4} className={classes.timeView}>
                                <Grid container
                                      justify={width === 'xs' ? 'flex-end' : 'center'}
                                      alignItems='center' className={classes.imageView}>
                                    <Typography variant="subheading">{this.parseItemTime(data)}</Typography>
                                </Grid>
                            </Grid>
                        </Hidden>

                        <Grid item xs={12} sm={8} className={classes.contentView}>
                            <Grid container spacing={8} className={classes.contentGrid} alignItems='center'>
                                <Grid item xs={3} sm={2}>
                                    <Grid container justify="center" alignItems='center' className={classes.imageView}>
                                        <img src={data.avatar} alt={data.title} className={classes.profileImage}/>
                                    </Grid>
                                </Grid>
                                <Grid item xs={9} sm={10}>
                                    <Grid container alignItems='flex-end' className={classes.itemDetails}>
                                        <Hidden smUp>
                                            <Grid xs={12} item className={classes.timeView}>
                                                <Typography variant="body2"
                                                            align="right">{this.parseItemTime(data)}</Typography>
                                            </Grid>
                                        </Hidden>
                                        <Grid xs={12} item>
                                            <Typography variant="title" component='h1'
                                                        className={classes.titleStyle}>{data.title}</Typography>
                                        </Grid>
                                        <Grid xs={10} item>
                                            <Typography variant="subheading">{data.assignee}</Typography>
                                        </Grid>
                                        <Grid xs={2} item>
                                            <Grid container justify="flex-end">
                                                <Button size="small" className={classes.button}>
                                                    <MoreVertIcon className={classes.iconSmall}/>
                                                    More
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </ListItem>
            </React.Fragment>
        );
    }

    private parseItemTime = (rec: any) => {
        const {startDate, endDate} = rec
        return `${moment(startDate).format('LT')} - ${moment(endDate).format('LT')}`
    }
}

const Styled = withStyles(styles, {withTheme: true})(AgendaItem);

export default withWidth()(Styled)
