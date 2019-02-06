import React from 'react';
import {Field, FieldProps} from 'formik';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
const Component = (fieldProps: FieldProps) => {
    const {field, form, ...other} = fieldProps
    const currentError = form.errors[field.name];
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
                keyboard
                clearable
                disablePast
                name={field.name}
                value={field.value||null}
                format="dd/MM/yyyy"
                helperText={currentError}
                error={Boolean(currentError)}
                onError={(_, error: any) => form.setFieldError(field.name, error)}
                onChange={date => form.setFieldValue(field.name, date, true)}
                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                {...other}
            /></MuiPickersUtilsProvider>
    );
};

interface IProps {
    name: string
    label: string
}

const DateTimeInput = (props: IProps) => {
    return <Field name={props.name} label={props.label} component={Component}/>
}

export default DateTimeInput;
