import * as React from 'react';
import GridWrapper from "../../widgets/GridWrapper";
import {Grid} from "@material-ui/core";
import HomeWidget from "./HomeWidget";


function Home() {
    return <GridWrapper>
        <Grid container spacing={16}>
            <Grid item sm={12} md={3}>
                <HomeWidget
                    title='Members'
                    chipText='LIVE'
                    content='2000 adults, 570 children'
                />
            </Grid>
        </Grid>
    </GridWrapper>
}

export default Home;
