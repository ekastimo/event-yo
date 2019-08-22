import * as React from 'react';
import GridWrapper from "../../widgets/GridWrapper";
import {Grid} from "@material-ui/core";
import HomeWidget from "./HomeWidget";
import AppBase from "../../base/AppBase";
import SelectInputs from "../../widgets/play/SelectInputs";


function Home() {
    return <AppBase
        title='Home'
    >
        <GridWrapper>
            <Grid container spacing={16}>
                <Grid item sm={12} md={3}>
                    <HomeWidget
                        title='Members'
                        chipText='LIVE'
                        content='2000 adults, 570 children'
                    />
                </Grid>
                <Grid item sm={12} md={3}>
                    <SelectInputs data={{}}/>
                </Grid>
            </Grid>
        </GridWrapper>
    </AppBase>
}

export default Home;
