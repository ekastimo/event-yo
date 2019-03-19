import * as React from 'react';
import {List, ListItem, ListItemText, Theme, WithStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import createStyles from "@material-ui/core/styles/createStyles";
import {withStyles} from "@material-ui/core/styles";
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import XToolBar from "../XToolBar";
import Loading from "../Loading";
import FabButton from '../FabButton';


const styles = (theme: Theme) =>
    createStyles({
        root: {},
        bottomPad: {
            backgroundColor: 'blue',
            height: theme.spacing.unit * 4
        },
        item: {
            overflow: 'auto'
        }
    });

interface IProps extends WithStyles<typeof styles> {
    isLoading: boolean,
    handleAdd: () => any,
    hasData: boolean,
    children: React.ReactNode
}

const ListView = (props: IProps) => {
    const {isLoading, handleAdd, children, classes, hasData} = props
    return (
        <div className={classes.root}>
            <Grid container spacing={0} justify='center'>
                <Grid item xs={12} sm={10} md={8} className={classes.item}>
                    {
                        isLoading ? <Loading/> :
                            <List>
                                {children}
                                {
                                    !hasData &&
                                    <ListItem dense>
                                        <ListItemText
                                            primary='No records found...'
                                        />
                                    </ListItem>
                                }
                            </List>
                    }
                    <FabButton color='primary' onClick={handleAdd}>
                        <AddIcon/>
                    </FabButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles, {withTheme: true})(ListView);
