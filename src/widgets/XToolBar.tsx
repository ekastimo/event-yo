import React, {Fragment, useState} from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import SearchInput from "./inputs/SearchInput";
import {withStyles} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';

const styles = (theme: Theme) =>
    createStyles({
        spacer: {
            flex: '1 1 100%',
        },
        actions: {
            color: theme.palette.text.secondary,
        },
        grow: {
            flexGrow: 1,
        },
    });

interface IProps extends WithStyles<typeof styles> {
    onFilter: (data: any) => any
    title: string
    handleNew: () => any
    menuButtonClass: any
    handleDrawerToggle: any
    filter?: any
    advancedForm?: any
    dataParser?: (data: any) => any
    dataParserReverse?: (data: any) => any
}

const XToolBar = (props: IProps) => {
    const {classes, menuButtonClass, handleDrawerToggle, title, ...rest} = props
    const [isSearching, setSearching] = useState(false)

    const handleStartSearch = () => {
        setSearching(true)
    }
    const handleEndSearch = () => {
        setSearching(false)
    }
    return (
        <Toolbar
        >
            {
                isSearching ?
                    <SearchInput
                        onBack={handleEndSearch}
                        withBack={true}
                        {...rest}
                    />
                    :
                    <Fragment>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            className={menuButtonClass}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {title}
                        </Typography>
                        <div className={classes.spacer}/>
                        <div className={classes.actions}>
                            <Tooltip title="Search">
                                <IconButton aria-label="Search" onClick={handleStartSearch}>
                                    <SearchIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Fragment>
            }
        </Toolbar>
    );
}
export default withStyles(styles)(XToolBar)
