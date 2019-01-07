import * as React from 'react'
import {FastField, Field, FieldProps, getIn} from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as _ from 'lodash';
import {hasValue} from "../../utils/validators";

interface IOption {
    label: string
    value: string

}

interface IProps {
    label: string
    name: string
    options: IOption[]
    isFast?: boolean
}

const MultiSelectInput = (props: IProps) => {
    const {label = '', options = [], isFast, ...rest} = props
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

        function handleBlur() {
            const touched = {...form.touched};
            _.set(touched, name, true)
            form.setTouched(touched)
        }

        return <FormControl error={!!showError} fullWidth>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Select
                multiple
                {...field}
                onClose={handleClose}
                onBlur={handleBlur}
                value={value || []}
                fullWidth
                inputProps={{name}}
            >
                {
                    options.map(
                        it => <MenuItem
                            value={it.value}
                            key={it.value}
                        >{it.label}</MenuItem>
                    )
                }
            </Select>
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
export default MultiSelectInput
