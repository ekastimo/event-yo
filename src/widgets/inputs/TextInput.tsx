import * as React from 'react'
import {FastField, Field, FieldProps, getIn} from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {hasValue} from "../../utils/validators";


interface IProps {
    label: string
    name: string
    type: string
    isFast?: boolean
    multiLine?: boolean
    autoComplete?: string
    margin?: 'none' | 'dense' | 'normal'
    autoFocus?: boolean
}

const TextInput = (props: IProps) => {
    const {label = '',margin, multiLine, isFast, ...rest} = props
    const render = (fieldProps: FieldProps) => {
        const {field, form} = fieldProps
        const name = field.name;
        const error = getIn(form.errors, name);
        const isTouched = getIn(form.touched, name);
        const wasSubmitted = form.submitCount > 0;
        const showError = hasValue(error) && (isTouched || wasSubmitted)
        const inputProps = {...rest, ...field}
        return <FormControl error={!!showError} fullWidth margin={margin}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Input
                {...inputProps}

                value={field.value || ''}
            />
            {
                showError && <FormHelperText>{error}</FormHelperText>
            }
        </FormControl>
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

export default TextInput
