import * as React from "react";
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            paddingTop: 50
        }
    });

interface IProps extends WithStyles<typeof styles> {
    message?: string
}

class Error extends React.Component<IProps> {
    public render() {
        const {classes, message = 'Oops Something went wrong!!'} = this.props;
        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item>
                            <Typography variant="h5" gutterBottom>
                                {message}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Error);
