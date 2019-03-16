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
    handleSearch?: (data: any) => any,
    dataParser?: (data: any) => any,
    title: string,
    handleAdd: () => any,
    hasData: boolean,
    children: React.ReactNode
    filter?: any
    advancedForm?: any
}

const ListView = (props: IProps) => {
    const {isLoading, handleSearch, title, handleAdd, children, classes, hasData, filter, advancedForm, dataParser} = props
    return (
        <div className={classes.root}>
            <Grid container spacing={0} justify='center'>
                <Grid item xs={12} sm={10} md={8} className={classes.item}>
                    {
                        handleSearch &&
                        <Hidden smDown>
                            <XToolBar
                                onFilter={handleSearch}
                                title={title}
                                handleNew={handleAdd}
                                filter={filter}
                                advancedForm={advancedForm}
                                dataParser={dataParser}
                            />
                        </Hidden>
                    }
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
                    <Hidden mdUp>
                        <FabButton color='primary' onClick={handleAdd}>
                            <AddIcon/>
                        </FabButton>
                    </Hidden>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles, {withTheme: true})(ListView);
