import * as React from 'react'
import {FastField, Field, FieldProps, getIn} from 'formik';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

import {hasValue} from "../../utils/validators";

interface IProps {
    label: string
    name: string
    isFast?: boolean
}

const DateTimeInput = (props: IProps) => {
    const {label = '', isFast, ...rest} = props

    const render = (fieldProps: FieldProps) => {
        const {field, form} = fieldProps
        const name = field.name;
        const value = field.value;
        const error = getIn(form.errors, name);
        const isTouched = getIn(form.touched, name);
        const wasSubmitted = form.submitCount > 0;
        const showError = hasValue(error) && (isTouched || wasSubmitted)

        function handleChange(date: any) {
            form.setFieldValue(name, date);
        }

        function handleClose() {
            return form.setTouched({...form.touched, [name]: true});
        }

        const extras = {
            fullWidth: true,
            label,
            placeholder: '10/10/2018',
            error: showError,
            helperText: showError ? error : undefined
        }
        return <DateTimePicker
                clearable
                animateYearScrolling={false}
                value={value || null}
                onChange={handleChange}
                onClose={handleClose}
                autoOk
                {...extras}
            />
    }
    if (isFast) {
        return (
            <FastField {...rest}>
                {render}
            </FastField>
        )
    } else {
        return (
            <Field {...rest}>
                {render}
            </Field>
        )
    }
}


export default DateTimeInput;
