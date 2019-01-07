import * as React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import DateInput from '../../widgets/inputs/DateInput';
import TextInput from '../../widgets/inputs/TextInput';
import SelectInput from '../../widgets/inputs/SelectInput';
import {WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";


const styles = () =>
    createStyles({
        root: {
            flexGrow: 1
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data: any
    handleClick: () => any
}

class EventForm extends React.Component<IProps> {


    public render() {
        const {classes} = this.props
        const genderOptions = [
            {value: 'Male', label: 'Male'},
            {value: 'Female', label: 'Female'},
        ]
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <SelectInput
                            name="publicity"
                            label='Publicity'
                            options={genderOptions}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextInput
                            name="name"
                            label='Name'
                            type='text'
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextInput
                            name="description"
                            label='Description'
                            type='text'

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DateInput
                            name="startDate"
                            label='Start Date'

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DateInput
                            name="endDate"
                            label='End Date'

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            name="venue"
                            label='Venue'
                            type='text'

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            name="freeFormAddress"
                            label='Address'
                            type='text'

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            name="geoCoordinates"
                            label='Geo Coordinates'
                            type='text'

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            name="image"
                            label='Image'
                            type='text'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit'>Submit</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

    // private onSubmit = (data: any) => {
    //     console.log("On submit", data)
    // }
}

export default withStyles(styles)(EventForm);
