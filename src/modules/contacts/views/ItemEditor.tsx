import * as React from 'react';
import {Theme, WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = (theme: Theme) =>
    createStyles({
        label: {
            flexGrow: 1,
            padding: theme.spacing.unit * 2
        },
        labelGrid: {
            display: 'flex',
            flexDirection: 'row'
        },
        iconHolder: {
            display: 'inline-block'
        }
    });

interface IProps extends WithStyles<typeof styles> {
    text: string
    isPrimary: boolean
    isLoading: boolean
    handleEdit: (e: any) => any
    handleDelete: (e: any) => any
    primary: React.ReactNode
    secondaryIcon: React.ReactNode
}

const ItemEditor = (props: IProps) => {
    const {classes, isPrimary, text, isLoading, handleEdit, handleDelete, primary, secondaryIcon} = props
    return <React.Fragment>
        <div className={classes.labelGrid}>
            <Typography variant='body2' className={classes.label} noWrap>
                {isPrimary ? primary : secondaryIcon}
                &nbsp;&nbsp;{text}
            </Typography>
            {
                !isLoading &&
                <div className={classes.iconHolder}>
                    <IconButton
                        aria-label="Edit"
                        onClick={handleEdit}
                    >
                        <EditIcon fontSize="small"/>
                    </IconButton>
                    <IconButton
                        aria-label="Delete"
                        onClick={handleDelete}
                    >
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </div>
            }
        </div>
    </React.Fragment>
}

export default withStyles(styles)(ItemEditor)
