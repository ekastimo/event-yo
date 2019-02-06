import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import AgendaItem from "./AgendaItem";
import {IEvent, IEventItem} from "../types";
import {getImage, parseRange} from "../../../utils/TK";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 700,
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    });

interface IProps extends WithStyles<typeof styles> {
    data: IEvent
    handleClick: () => any
}


class Agenda extends React.Component<IProps, any> {
    public state = {
        open: {}
    };


    public render() {
        const {classes, data} = this.props;
        const itemProps = {alignItems: "flex-start"}
        return (
            <Grid container justify="center" className={classes.root}>
                <Grid item xs={12} sm={10}>
                    <List className={classes.root}>

                        {
                            data.items.map((it: IEventItem) => {
                                const {id} = it
                                return <ListItem {...itemProps} key={id}>
                                    <ListItemAvatar>
                                        <Avatar alt={it.name} src={getImage(it.images[0])}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="button" gutterBottom>
                                                {parseRange(it)}
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" variant="body1" gutterBottom>
                                                    {it.name}
                                                </Typography>
                                                <Typography component="span" variant="body2" gutterBottom>
                                                    {it.details}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            })
                        }

                    </List>
                    <List>
                        {
                            data.items.map((it: IEventItem) => {
                                const {id} = it
                                return <AgendaItem key={id} data={it} handleClick={this.handleClick.bind(this, it.id)}/>
                            })
                        }
                    </List>
                </Grid>
            </Grid>
        );
    }

    private handleClick = (id: any) => () => {
        this.setState((oldState: any) => {
            const oldOpen = oldState.open
            const open = {...oldOpen, [id]: !oldOpen[id]}
            return {open}
        });
    };


}

export default withStyles(styles, {withTheme: true})(Agenda);
