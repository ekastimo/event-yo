import * as React from 'react';
import {List, Theme, WithStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import createStyles from "@material-ui/core/styles/createStyles";
import {withStyles} from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import XToolBar from "./XToolBar";
import Loading from "./Loading";


const styles = (theme: Theme) =>
    createStyles({
        root: {
        },
        item: {
            position: 'relative',
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 2,
        },
    });

interface IProps extends WithStyles<typeof styles> {
    isLoading: boolean,
    handleSearch?: (query: string) => any,
    title: string,
    handleAdd: () => any,
    children: React.ReactNode
}

const ListView = (props: IProps) => {
    const {isLoading, handleSearch, title, handleAdd, children, classes} = props
    return (
        <div className={classes.root}>
            <Grid container spacing={0} justify='center'>
                <Grid item xs={12} sm={8} className={classes.item}>
                    {
                        handleSearch &&
                        <XToolBar
                            handleChange={handleSearch}
                            title={title}
                            handleNew={handleAdd}
                        />
                    }
                    {
                        isLoading ?
                            <Loading/>
                            :
                            <List>
                                {children}
                            </List>
                    }
                    <Fab className={classes.fab} color='primary'>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles, {withTheme: true})(ListView);