import * as React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateInput from '../../widgets/inputs/DateInput';
import TextInput from '../../widgets/inputs/TextInput';
import SelectInput from '../../widgets/inputs/SelectInput';
import {WithStyles} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import {publicityOptions} from './config';
import TextArea from '../../widgets/inputs/TextArea';
import {toOptions} from "../../utils/TK";


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

        return (
            <div className={classes.root}>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={4}>
                        <SelectInput
                            name='publicity'
                            label='Publicity'
                            options={toOptions(publicityOptions)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextInput
                            name='name'
                            label='Name'
                            type='text'
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextArea
                            name='details'
                            label='Details'
                            type='text'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DateInput
                            name='startDate'
                            label='Start Date'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DateInput
                            name='endDate'
                            label='End Date'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            name='venue'
                            label='Venue'
                            type='text'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            name='freeFormAddress'
                            label='Address'
                            type='text'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            name='geoCoordinates'
                            label='Geo Coordinates'
                            type='text'
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(EventForm);
