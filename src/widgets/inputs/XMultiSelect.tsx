import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import {Theme, WithStyles, WithTheme} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import {Field, FieldProps, getIn} from 'formik';
import {hasValue} from "../../utils/validators";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        input: {
            display: 'flex',
            padding: 0,
        },
        valueContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            alignItems: 'center',
            overflow: 'hidden',
        },
        chip: {
            margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
        },
        chipFocused: {
            backgroundColor: emphasize(
                theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
                0.08,
            ),
        },
        noOptionsMessage: {
            padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        },
        singleValue: {
            fontSize: 16,
        },
        placeholder: {
            position: 'absolute',
            left: 2,
            fontSize: 16,
        },
        paper: {
            position: 'absolute',
            zIndex: 1,
            marginTop: theme.spacing.unit,
            left: 0,
            right: 0,
        },
        divider: {
            height: theme.spacing.unit * 2,
        },
    });

function NoOptionsMessage(props: any) {
    return (
        <Typography
            color='textSecondary'
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent(props: any) {
    const {inputRef, ...rest} = props
    return <div ref={inputRef} {...rest} />;
}

function Control(props: any) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props: any) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component='div'
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props: any) {
    return (
        <Typography
            color='textSecondary'
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props: any) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props: any) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props: any) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props: any) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

interface IOption {
    label: string
    value: string
}

interface IProps extends WithStyles<typeof styles>, WithTheme {
    label: string
    name: string
    options: IOption[]
}

class XMultiSelect extends React.Component<IProps> {
    state = {
        single: null,
        multi: null,
        textIn: undefined,
    };

    handleInputChange = (textIn: any) => {
        this.setState(() => ({
            textIn
        }))
    }

    render() {
        const {classes, theme, options = [], label = '', ...rest} = this.props;
        const selectStyles = {
            input: (base: any) => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };
        const textFieldProps = {label, InputLabelProps: {shrink: true,},}
        const props = {classes, textFieldProps}

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

            return <div className={classes.root}>
                <Select
                    options={options}
                    styles={selectStyles}
                    components={components}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Select multiple countries'
                    isMulti
                    onInputChange={this.handleInputChange}
                    {...props}
                />
                {showError && <div style={{color: "red", marginTop: ".5rem"}}>{error}</div>}
            </div>
        }
        return (
            <Field {...rest}>
                {render}
            </Field>
        );
    }
}


export default withStyles(styles, {withTheme: true})(XMultiSelect);
