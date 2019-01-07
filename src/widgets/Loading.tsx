import * as React from "react";
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {images} from "../assets/images";
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
}

class Loading extends React.Component<IProps> {
    public render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item>
                            <img src={images.loading} alt='Loading...' style={{width: 40, height: 23}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        )
    }
}



export default withStyles(styles)(Loading);
