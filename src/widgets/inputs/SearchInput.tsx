import React, {useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import createStyles from "@material-ui/core/styles/createStyles";
import {Theme, WithStyles} from "@material-ui/core";
import FormHolder from "../FormHolder";

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
    onFilter: (data: any) => any
    dataParser?: (data: any) => any
    dataParserReverse?: (data: any) => any
    onBack?: () => any
    filter?: any
    advancedForm?: any
    withBack: boolean
    placeholder?: string
}

function SearchInput(props: IProps) {
    const {classes, placeholder = "Search here", onBack, onFilter, filter = {}, advancedForm, dataParser, dataParserReverse} = props;
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const handleQueryChange = (event: any) => {
        const query = event.target.value;
        onFilter({...filter, query})
    }

    const handleAdvancedQuery = (data: any) => {
        onFilter({...filter, ...data})
    }

    return (
        <Paper className={classes.root} elevation={1}>
            <IconButton className={classes.iconButton} aria-label="Back" onClick={onBack}>
                <ArrowBackIcon/>
            </IconButton>
            <InputBase className={classes.input} placeholder={placeholder} onChange={handleQueryChange}/>
            <IconButton className={classes.iconButton} aria-label="Advanced" onClick={handleOpen}>
                <SettingsIcon/>
            </IconButton>
            <FormHolder
                title='Advanced Filter'
                open={open}
                onClose={handleClose}
                data={filter}
                url={""}
                isNew={true}
                dataParser={dataParser}
                dataParserReverse={dataParserReverse}
                handleSubmit={handleAdvancedQuery}
            >
                {advancedForm}
            </FormHolder>
        </Paper>
    );
}

export default withStyles(styles)(SearchInput);
