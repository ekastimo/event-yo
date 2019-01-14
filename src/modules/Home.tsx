import * as React from 'react';
import {Form, Formik, FormikActions} from 'formik';
import {Theme, withStyles} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import RemoteSelect from "../widgets/inputs/RemoteSelect";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import XMultiSelect from "../widgets/inputs/XMultiSelect";

const styles = (theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 200,
        },
        dense: {
            marginTop: 19,
        },
        menu: {
            width: 200,
        },
    });

interface IProps extends WithStyles<typeof styles> {
    data: any
}

class TextFields extends React.Component<IProps> {
    form?: Formik = undefined

    render() {
        return (
            <div>
                <Formik
                    initialValues={{}}
                    onSubmit={this.onSubmit}
                    enableReinitialize={true}
                >
                    {(formState) => (
                        <Form>
                            <div>
                                <XMultiSelect suggestions={suggestions}/>
                                <Button
                                    type='submit'
                                    aria-label='Save'
                                    disabled={formState.isSubmitting}
                                    onClick={this.submitForm}
                                >
                                    <SaveIcon/>
                                    &nbsp;Submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }

    submitForm = () => {
        if (this.form) {
            this.form.submitForm()
        }
    }

    onSubmit = (values: any, actions: FormikActions<any>) => {

        console.log('isSubmiting', values)
        actions.setSubmitting(false);
    }
}

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


export default withStyles(styles)(TextFields);
