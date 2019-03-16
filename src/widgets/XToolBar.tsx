import React, {Fragment} from 'react';
import {Divider, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {lighten} from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import SearchInput from "./inputs/SearchInput";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            paddingRight: theme.spacing.unit,
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        spacer: {
            flex: '1 1 100%',
        },
        actions: {
            color: theme.palette.text.secondary,
        },
        title: {
            flex: '0 0 auto',
        },
        toolBar: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        }
        , toolBarButton: {}
    });

interface IProps extends WithStyles<typeof styles> {
    onFilter: (data: any) => any
    title: string
    handleNew: () => any
    filter?: any
    advancedForm?: any
    dataParser?: (data: any) => any
}

class XToolBar extends React.Component<IProps, any> {
    public state = {
        isSearching: false
    }

    public render() {
        const {classes, onFilter, handleNew, title,...rest} = this.props;
        const {isSearching} = this.state;
        return (
            <Toolbar
                className={classes.root}
            >
                {
                    isSearching ?
                        <SearchInput onFilter={onFilter} onBack={this.handleEndSearch} withBack={true} {...rest}/>
                        :
                        <Fragment>
                            <div className={classes.title}>
                                <Typography variant="h6" id="tableTitle">
                                    {title}
                                </Typography>
                            </div>
                            <div className={classes.spacer}/>
                            <div className={classes.actions}>
                                <div className={classes.toolBar}>
                                    <Tooltip title="Search">
                                        <IconButton aria-label="Search" onClick={this.handleStartSearch}>
                                            <SearchIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Add New">
                                        <Button aria-label="Add New" size='medium' onClick={handleNew}>
                                            <AddIcon/> Add
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                            <Divider/>
                        </Fragment>
                }
            </Toolbar>
        );
    }

    private handleStartSearch = () => {
        this.setState(() => ({
            isSearching: true
        }))
    }
    private handleEndSearch = () => {
        this.setState(() => ({
            isSearching: false
        }))
    }
}

export default withStyles(styles)(XToolBar)
