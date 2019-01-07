import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';

import AgendaItem from "./AgendaItem";
import {IAgendaItem} from "../types";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            [theme.breakpoints.only('xs')]: {
                padding: theme.spacing.unit * 2,
            },
        },
        nested: {
            paddingLeft: theme.spacing.unit * 4,
        },
        avatar: {
            // margin: 5,
        },
        card: {
            display: 'flex',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 100,
            height: 100,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
        },
        playIcon: {
            height: 38,
            width: 38,
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data: IAgendaItem[]
    handleClick: () => any
}


class Agenda extends React.Component<IProps, any> {
    public state = {
        open: {}
    };


    public render() {
        const {classes, data} = this.props;
        return (
            <Grid container justify="center" className={classes.root}>
                <Grid item xs={12} sm={10}>
                    <List>
                        {
                            data.map((it: IAgendaItem) => {
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
