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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddIcon from '@material-ui/icons/Add';
import MoreMenu from "../../../widgets/MoreMenu";
import {IEvent, IEventItem} from "../types";
import {getImage} from "../../../utils/TK";
import {parseRange} from "../../../utils/dates";
import FabButton from '../../../widgets/FabButton';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        fab: {
            position: 'fixed',
            bottom: theme.spacing.unit * 3,
            right: theme.spacing.unit * 2,
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
            <Grid container justify='center' spacing={8} className={classes.root}>
                <Grid item xs={12} sm={8}>
                    <List className={classes.root}>
                        {
                            data.items.map((it: IEventItem) => {
                                const {id} = it
                                return <ListItem alignItems='flex-start' key={id}>
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
                                                <Typography component="span" variant="subtitle1" gutterBottom>
                                                    {it.name}
                                                </Typography>
                                                <Typography component="span" variant="subtitle2" gutterBottom>
                                                    {it.details}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <MoreMenu
                                            options={["Edit", "Delete"]}
                                            onItemSelected={this.onItemSelected}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            })
                        }
                    </List>
                </Grid>
                <FabButton color='primary'>
                    <AddIcon/>
                </FabButton>
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

    private onItemSelected = (item: any) => {
        const {data} = this.props
        switch (item) {
            case 'Edit':
                //onEdit(data)
                break;
            case 'Delete':
                ///onDelete(data)
                break;
        }
    }


}

export default withStyles(styles, {withTheme: true})(Agenda);
