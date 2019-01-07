import * as React from 'react'
import {FastField, Field, FieldProps} from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface IProps {
    label: string,
    name: string,
    checkBoxStyle: any,
    isFast?: boolean
}

const CheckBox = (props: IProps) => {
    const {label = '', checkBoxStyle = {}, isFast, ...rest} = props
    const render = (fieldProps: FieldProps) => {
        const {field, form} = fieldProps
        const name = field.name;
        const value = field.value;
        const error = form.errors[name];
        const isTouched = form.touched[name];
        const showError = isTouched && error
        return <FormControl error={!!showError}>
            <FormControlLabel
                control={
                    <Checkbox checked={value} {...field} value={name} style={checkBoxStyle}/>
                }
                label={label}
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

export default CheckBox
