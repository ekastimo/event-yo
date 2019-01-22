import React from 'react'
import {Field, FieldProps, getIn} from 'formik';
import TextField from '@material-ui/core/TextField';
import {hasValue} from '../../utils/validators';

interface IProps {
    label: string
    name: string
    type: string
}

const TextArea = (props: IProps) => {
    const {label = '', ...rest} = props
    const render = (fieldProps: FieldProps) => {
        const {field, form} = fieldProps
        const name = field.name;
        const error = getIn(form.errors, name);
        const isTouched = getIn(form.touched, name);
        const wasSubmitted = form.submitCount > 0;
        const showError = hasValue(error) && (isTouched || wasSubmitted)
        return <TextField
            {...field}
            error={showError}
            label={label}
            multiline
            fullWidth
            rowsMax='4'
            helperText={showError ? error : undefined}
            value={field.value || ''}
        />
    }
    return (
        <Field {...rest}>
            {render}
        </Field>
    )
}

export default TextArea
