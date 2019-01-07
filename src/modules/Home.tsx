import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import {WithStyles} from "@material-ui/core";
import XTable from "../widgets/table/XTable";

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

    public handleChange = (name:string) => (event:any) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    public render() {
        return (
            <XTable/>
        );
    }
}


export default withStyles(styles)(TextFields);
