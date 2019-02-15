import * as React from 'react';
import moment from 'moment';
import {Theme, WithStyles, withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import {IContact} from "../types";
import PersonEditor from "../editors/PersonEditor";
import FormHolder from "../../../widgets/FormHolder";
import {remoteRoutes} from "../../../data/constants";
import {personSchema, renderName} from "../config";
import withWidth from '@material-ui/core/withWidth';
import Hidden from '@material-ui/core/Hidden';

const styles = (theme: Theme) =>
    createStyles({
        root: {},
        cardHeader: {
            paddingBottom: 0
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data: IContact
    width: string,
    handleReload: () => any
}

interface IDProps {
    label: string
    value: string
}

const MobileDisplayRow = (props: IDProps) => <React.Fragment>
    <Typography variant="subtitle2" gutterBottom>
        {props.label}
    </Typography>
    <Typography variant="body2">
        {props.value}
    </Typography>
</React.Fragment>


class PersonView extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            showDialog: false
        }
    }

    public render() {
        const {classes, data} = this.props
        const {person} = data
        return (
            <div className={classes.root}>
                <Card>
                    <CardHeader
                        className={classes.cardHeader}
                        action={
                            <IconButton onClick={this.handleClick}>
                                <EditIcon fontSize="small"/>
                            </IconButton>
                        }
                        title={<Typography variant="button">
                            Basic Information
                        </Typography>}
                    />
                    <CardContent>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <MobileDisplayRow
                                    label='Name'
                                    value={renderName(person)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <MobileDisplayRow
                                    label='Gender'
                                    value={person.gender}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <MobileDisplayRow
                                    label='Status'
                                    value={person.civilStatus}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <MobileDisplayRow
                                    label='Birthday'
                                    value={moment(person.dateOfBirth).format("MMM Do YYYY")}
                                />
                            </Grid>
                            <Hidden xsDown>
                                <Grid item xs={12}>
                                    <MobileDisplayRow
                                        label='Micro Bio'
                                        value={person.about}
                                    />
                                </Grid>
                            </Hidden>
                        </Grid>
                    </CardContent>
                </Card>
                <FormHolder
                    title='Edit Basic Information'
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    data={data.person}
                    url={`${remoteRoutes.contactsPerson}/${data.id}`}
                    isNew={false}
                    schema={personSchema}
                    onAjaxComplete={this.props.handleReload}
                >
                    <PersonEditor/>
                </FormHolder>
            </div>
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLElement>) => {
        this.setState(() => ({showDialog: true}))
    }

    private handleClose = () => {
        this.setState(() => ({showDialog: false}))
    }

}

export default withStyles(styles)(withWidth()(PersonView))
