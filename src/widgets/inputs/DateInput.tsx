import * as React from 'react'
import {FastField, Field, FieldProps, getIn} from 'formik';
import DatePicker from 'material-ui-pickers/DatePicker';
import {hasValue} from "../../utils/validators";
import * as _ from "lodash";


interface IProps {
    label: string
    name: string
    isFast?: boolean
}

const DateInput = (props: IProps) => {
    const {label = '', isFast, ...rest} = props

    const render = (fieldProps: FieldProps) => {
        const {field, form} = fieldProps
        const name = field.name;
        const value = field.value;
        const error = getIn(form.errors, name);
        const isTouched = getIn(form.touched, name);
        const wasSubmitted = form.submitCount > 0;
        const showError = hasValue(error) && (isTouched || wasSubmitted)

        function handleClose() {
            const touched = {...form.touched};
            _.set(touched, name, true)
            form.setTouched(touched)
        }

        function handleChange(date: any) {
            form.setFieldValue(name, date.toDate());
        }

        const extras = {
            fullWidth: true,
            label,
            placeholder: '10/10/2018',
            error: showError,
            helperText: showError ? error : undefined
        }

        return <DatePicker
            clearable
            animateYearScrolling={false}
            value={value || null}
            onChange={handleChange}
            onClose={handleClose}
            autoOk
            format="DD/MM/YYYY"
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


export default DateInput;
