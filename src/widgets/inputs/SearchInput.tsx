import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import createStyles from "@material-ui/core/styles/createStyles";
import {Theme, WithStyles} from "@material-ui/core";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.up('md')]: {
                width: 400,
            },
            flexGrow: 1,
            flex: 1,
        },
        input: {
            marginLeft: 8,
            flex: 1,
        },
        iconButton: {
            padding: 10,
        }
    });


interface IProps extends WithStyles<typeof styles> {
    onChange: (event: any) => any
    onBack?: () => any
    withBack: boolean
    placeholder?: string
}

function SearchInput(props: IProps) {
    const {classes, placeholder = "Search here", onBack, onChange} = props;
    return (
        <Paper className={classes.root} elevation={1}>
            <IconButton className={classes.iconButton} aria-label="Back" onClick={onBack}>
                <ArrowBackIcon/>
            </IconButton>
            <InputBase className={classes.input} placeholder={placeholder} onChange={onChange}/>
            <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}

export default withStyles(styles)(SearchInput);
