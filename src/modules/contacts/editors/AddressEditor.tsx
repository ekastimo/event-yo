import * as React from 'react';
import {WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../widgets/inputs/TextInput';
import SelectInput from '../../../widgets/inputs/SelectInput';
import {addressCategories} from "../config";
import {toOptions} from "../../../utils/TK";
import CheckBox from "../../../widgets/inputs/CheckBox";
import {countries} from "../../../data/countries";

const styles = () =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    });

interface IProps extends WithStyles<typeof styles> {
}

const AddressEditor = (props: IProps) => {
    return (
        <div style={{padding: 15}}>
            <Grid className={props.classes.root} container spacing={24}>
                <Grid item xs={12} sm={3}>
                    <SelectInput name='category' label='Type' options={toOptions(addressCategories)}/>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <SelectInput name='country' label='Country' options={countries}/>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextInput type="text" name='originalFreeform' label='Address' isFast={true}/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <CheckBox
                        name='isPrimary'
                        label='Main'
                        checkBoxStyle={{fontSize: 16}}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
export default withStyles(styles)(AddressEditor)
