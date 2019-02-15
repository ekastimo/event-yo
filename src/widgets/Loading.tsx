import * as React from "react";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridWrapper from "./GridWrapper";

const Loading = () => <GridWrapper>
    <Grid container spacing={16} justify='center'>
        <Grid item>
            <CircularProgress/>
        </Grid>
    </Grid>
</GridWrapper>
export default Loading;
