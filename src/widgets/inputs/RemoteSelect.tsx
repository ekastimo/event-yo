import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import {Theme, WithStyles} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import {search} from '../../utils/ajax'
import {remoteRoutes} from '../../data/constants';

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
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));


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

interface IProps extends WithStyles<typeof styles> {
}

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

class RemoteSelect extends React.Component<any> {
    state = {
        single: null,
        multi: null,
        textIn: undefined,
    };

    handleChange = (name: any) => (value: any) => {
        this.setState({
            [name]: value,
        });
    };

    handleInputChange = (textIn: any) => {
        this.setState(() => ({
            textIn
        }))
    }

    getData = (textIn: any, callback: any) => {
        const query = this.state.textIn;
        search(remoteRoutes.contactSearch, {query}, data => {
            const fine = data.map((it: any) => ({label: it.fullName, value: it.id}))
            callback(fine)
        }, undefined, () => {
            callback([])
        })
    }

    render() {
        const {classes, theme} = this.props;
        const selectStyles = {
            input: (base: any) => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };
        const textFieldProps = {label: 'Label', InputLabelProps: {shrink: true,},}
        const props = {classes, textFieldProps}
        return (
            <div className={classes.root}>

                <Select
                    options={suggestions}
                    styles={selectStyles}
                    components={components}
                    value={this.state.multi}
                    onChange={this.handleChange('multi')}
                    placeholder='Select multiple countries'
                    isMulti
                    onInputChange={this.handleInputChange}
                    {...props}
                />

                <pre>inputValue: '{this.state.textIn}'</pre>
                <AsyncSelect
                    cacheOptions
                    loadOptions={this.getData}
                    defaultOptions
                    onInputChange={this.handleInputChange}
                    styles={selectStyles}
                    components={components}
                    value={this.state.multi}
                    onChange={this.handleChange('multi')}
                    placeholder='Select multiple countries'
                    isMulti
                    {...props}
                />
            </div>
        );
    }
}


export default withStyles(styles, {withTheme: true})(RemoteSelect);
