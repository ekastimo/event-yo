import React, {useEffect, useState} from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import {Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {Field, FieldProps, getIn} from 'formik';
import {hasValue} from "../../utils/validators";

const suggestions = [
    {label: 'Afghanistan'},
    {label: 'Aland Islands'},
    {label: 'Albania'},
    {label: 'Algeria'},
    {label: 'American Samoa'},
    {label: 'Andorra'},
    {label: 'Angola'},
    {label: 'Anguilla'},
    {label: 'Antarctica'},
    {label: 'Antigua and Barbuda'},
    {label: 'Argentina'},
    {label: 'Armenia'},
    {label: 'Aruba'},
    {label: 'Australia'},
    {label: 'Austria'},
    {label: 'Azerbaijan'},
    {label: 'Bahamas'},
    {label: 'Bahrain'},
    {label: 'Bangladesh'},
    {label: 'Barbados'},
    {label: 'Belarus'},
    {label: 'Belgium'},
    {label: 'Belize'},
    {label: 'Benin'},
    {label: 'Bermuda'},
    {label: 'Bhutan'},
    {label: 'Bolivia, Plurinational State of'},
    {label: 'Bonaire, Sint Eustatius and Saba'},
    {label: 'Bosnia and Herzegovina'},
    {label: 'Botswana'},
    {label: 'Bouvet Island'},
    {label: 'Brazil'},
    {label: 'British Indian Ocean Territory'},
    {label: 'Brunei Darussalam'},
];

const styles = (theme: Theme) => (
    createStyles({

        container: {
            flexGrow: 1,
            position: 'relative',
        },

        inputRoot: {
            flexWrap: 'wrap',
        },
        inputInput: {
            width: 'auto',
            flexGrow: 1,
        },
        zIndex: {
            zIndex: theme.zIndex.modal + 200,
        },
    }));

interface IProps2 extends WithStyles<typeof styles> {
    name: string
    label: string
    value: string
    error: string
    placeholder?: string
    options?: any[]
    onChange: any
    onBlur: any
}

interface IProps extends WithStyles<typeof styles> {
    name: string
    label: string
    options?: any[]
}

function renderInput(inputProps: any) {
    const {InputProps, classes, ref, error, ...other} = inputProps;
    return (
        <TextField
            error={!!error}
            helperText={error}
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion({suggestion, index, itemProps, highlightedIndex, selectedItem}: ISuggestion) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

interface ISuggestion {
    highlightedIndex: number | null,
    index?: number,
    itemProps?: any,
    selectedItem?: string,
    suggestion: { label: string },
}


function filter(cache: any[], value: any) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    return inputLength === 0
        ? []
        : cache.filter(rec => {
            const keep =
                count < 5 && rec.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }
            return keep;
        });
}


let popperNode: any;

function XAutoComplete(props: IProps2) {
    const {classes, onChange, onBlur, error, value, label, placeholder} = props;
    const [data, setData] = useState([] as any[])
    const [query, setQuery] = useState('')
    useEffect(() => {
        setTimeout(() => {
            const newData = filter([...suggestions], query)
            setData(newData)
        }, 200)
    }, [query])

    function handleChange(str: string) {
        return setQuery(str);
    }

    return (
        <Downshift onInputValueChange={handleChange} onChange={onChange} initialInputValue={value}>
            {({
                  getInputProps,
                  getItemProps,
                  getMenuProps,
                  highlightedIndex,
                  isOpen,
                  selectedItem,
              }) => (
                <div className={classes.container}>
                    {renderInput({
                        label,
                        fullWidth: true,
                        classes,
                        InputProps: getInputProps({
                            placeholder,
                            onBlur
                        }),
                        ref: (node: any) => {
                            popperNode = node;
                        },
                        error
                    })}
                    <Popper open={isOpen} anchorEl={popperNode} className={classes.zIndex}>
                        <div {...(isOpen ? getMenuProps({}, {suppressRefError: true}) : {})}>
                            <Paper
                                square
                                style={{marginTop: 8, width: popperNode ? popperNode.clientWidth : null}}
                            >
                                {data.map((record: any, index) =>
                                    renderSuggestion({
                                        suggestion: record,
                                        index,
                                        itemProps: getItemProps({item: record.label}),
                                        highlightedIndex,
                                        selectedItem,
                                    }),
                                )}
                            </Paper>
                        </div>
                    </Popper>
                </div>
            )
            }
        </Downshift>
    );
}


function XInput(props: IProps) {
    const {classes, options = [], label = '', ...rest} = props;


    const render = (fieldProps: FieldProps) => {
        const {field, form,} = fieldProps
        const name = field.name;
        const value = field.value;
        const error = getIn(form.errors, name);
        const isTouched = getIn(form.touched, name);
        const wasSubmitted = form.submitCount > 0;
        const showError = hasValue(error) && (isTouched || wasSubmitted)

        const handleChange = (value: any) => {
            form.setFieldValue(field.name, value)
        }

        function handleBlur() {
            form.setFieldTouched(field.name)
        }

        return <XAutoComplete
            options={options}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError ? error : undefined}
            classes={classes}
            name={name}
            label={label}
        />
    }
    return (
        <Field {...rest}>
            {render}
        </Field>
    );
}

export default withStyles(styles)(XInput);
