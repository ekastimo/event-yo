import React from 'react';
import {Field, FieldProps} from 'formik';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
const Component = (fieldProps: FieldProps) => {
    const {field, form, ...other} = fieldProps
    const currentError = form.errors[field.name];
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
                keyboard
                clearable
                fullWidth
                value={field.value||null}
                helperText={currentError}
                error={Boolean(currentError)}
                onError={(_, error: any) => form.setFieldError(field.name, error)}
                onChange={date => form.setFieldValue(field.name, date, true)}
                // mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                {...other}
            /></MuiPickersUtilsProvider>
    );
};

interface IProps {
    name: string
    label: string
}

const DateInput = (props: IProps) => {
    return <Field name={props.name} label={props.label} component={Component}/>
}

export default DateInput
