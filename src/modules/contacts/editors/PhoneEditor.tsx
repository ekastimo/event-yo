import * as React from 'react';
import {WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from '@material-ui/core/Grid';
import TextInput from '../../../widgets/inputs/TextInput';
import SelectInput from '../../../widgets/inputs/SelectInput';
import {phoneCategories} from "../config";
import {toOptions} from "../../../utils/TK";
import CheckBox from "../../../widgets/inputs/CheckBox";

const styles = () =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    });

interface IProps extends WithStyles<typeof styles> {
}

const PhoneEditor = (props: IProps) => {
    return (
        <div style={{padding: 12}}>
            <Grid className={props.classes.root} container spacing={24}>
                <Grid item xs={12} sm={3}>
                    <SelectInput name='category' label='Type' options={toOptions(phoneCategories)}/>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextInput type="text" name='number' label='Number' isFast={true}/>
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
export default withStyles(styles)(PhoneEditor)
