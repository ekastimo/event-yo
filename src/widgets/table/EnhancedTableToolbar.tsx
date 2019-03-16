import React, {Fragment} from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import createStyles from "@material-ui/core/styles/createStyles";
import {Theme, WithStyles} from "@material-ui/core";
import SearchInput from "../inputs/SearchInput";


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
    numSelected: number
    onChange: (query: string) => any
    handleSelection: () => any
}

class EnhancedTableToolbar extends React.Component<IProps, any> {

    public state = {
        isSearching: false
    }

    public render() {
        const {numSelected, classes, onChange, handleSelection} = this.props;
        const {isSearching} = this.state;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 ? (
                    <Fragment>
                        <div className={classes.title}>
                            <Typography color="inherit" variant="subtitle1">
                                {numSelected} selected
                            </Typography>
                        </div>
                        <div className={classes.spacer}/>
                        <div className={classes.actions}>
                            <div className={classes.toolBar}>
                                <Tooltip title="Clear">
                                    <IconButton aria-label="Clear" onClick={handleSelection}>
                                        <RefreshIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="EditIcon">
                                    <IconButton aria-label="EditIcon">
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="Delete">
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        {
                            isSearching ?
                                <SearchInput onFilter={onChange} onBack={this.handleEndSearch} withBack={true}/>
                                :
                                <Fragment>
                                    <div className={classes.title}>
                                        <Typography variant="h6" id="tableTitle">
                                            Nutrition
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
                                                <Button aria-label="Add New" size='medium'>
                                                    <AddIcon/> Add
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </Fragment>
                        }
                    </Fragment>
                )}
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

    private clearSelection = () => {
        this.setState(() => ({
            isSearching: false
        }))
    }
}


export default withStyles(styles)(EnhancedTableToolbar);
