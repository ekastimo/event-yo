import * as React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateInput from '../../../widgets/inputs/DateInput';
import TimeInput from '../../../widgets/inputs/TimeInput';
import TextInput from '../../../widgets/inputs/TextInput';
import SelectInput from '../../../widgets/inputs/SelectInput';
import MultiSelectInput from '../../../widgets/inputs/MultiSelectInput';
import {WithStyles} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import {eventTags, publicityOptions} from '../config';
import TextArea from '../../../widgets/inputs/TextArea';
import {toOptions} from "../../../utils/TK";
import XRemoteSelect from '../../../widgets/inputs/XRemoteSelect';
import {remoteRoutes} from "../../../data/constants";


const styles = () =>
    createStyles({
        root: {
            flexGrow: 1
        }
    });

interface IProps extends WithStyles<typeof styles> {

}

class EventForm extends React.Component<IProps> {
    render() {
        const {classes} = this.props
        const parser = (it: any) => ({label: it.description, value: it.placeId,...it})
        return (
            <div className={classes.root}>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={3}>
                        <SelectInput
                            name='publicity'
                            label='Publicity'
                            options={toOptions(publicityOptions)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TextInput
                            name='name'
                            label='Name'
                            type='text'
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <DateInput
                            name='startDate'
                            label='Start Date'
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TimeInput
                            name='startDate'
                            label='Time'
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <DateInput
                            name='endDate'
                            label='End Date'
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TimeInput
                            name='endDate'
                            label='Time'
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextInput
                            name='venue'
                            label='Venue'
                            type='text'
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <XRemoteSelect
                            name='freeFormAddress'
                            label='Location'
                            remote={remoteRoutes.googleMaps}
                            isMulti={false}
                            minQueryString={3}
                            parser={parser}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <MultiSelectInput
                            name='tags'
                            label='Tags'
                            options={toOptions(eventTags)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextArea
                            name='details'
                            label='Details'
                            type='text'
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(EventForm);
