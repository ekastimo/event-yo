import * as React from 'react'
import {FastField, Field, FieldProps, getIn,} from 'formik';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import {withStyles} from '@material-ui/core/styles';
import {hasValue} from "../../utils/validators";
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        formControl: {
            margin: theme.spacing.unit * 3,
        },
        group: {
            margin: `${theme.spacing.unit}px 0`,
        },
    });

interface IOption {
    label: string
    value: string
}

interface IProps extends WithStyles<typeof styles> {
    label: string
    name: string
    options: IOption[]
    isFast?: boolean
}


const RadioInput = (props: IProps) => {
    const {label = '', options = [], classes, isFast, ...rest} = props
    const render = (fieldProps: FieldProps) => {
        const {field, form} = fieldProps
        const name = field.name;
        const value = field.value;
        const error = getIn(form.errors, name);
        const isTouched = getIn(form.touched, name);
        const wasSubmitted = form.submitCount > 0;
        const showError = hasValue(error) && (isTouched || wasSubmitted)

        function handleBlur() {
            form.setFieldTouched(name)
        }

        return <FormControl error={showError} className={classes.formControl}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <RadioGroup
                className={classes.group}
                {...field}
                onBlur={handleBlur}
                value={value || ''}
            >
                {
                    options.map(
                        it => <FormControlLabel
                            key={it.value}
                            value={it.value}
                            label={it.label}
                            control={<Radio/>}
                        />
                    )
                }
            </RadioGroup>
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
export default withStyles(styles)(RadioInput);

