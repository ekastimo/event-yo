import * as React from 'react';
import {Theme, WithStyles, withStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {ITeam} from "./types";
import {get} from "../../utils/ajax";
import {remoteRoutes} from "../../data/constants";
import * as validate from "validate.js";
import {RouteComponentProps} from "react-router";
import Loading from "../../widgets/Loading";
import Error from "../../widgets/Error";
import BasePanel from "../../base/BasePanel";
import MyDebug from "../../widgets/MyDebug";
import moment from "moment";
import TabbedDetails from "./TabbedDetails";


const styles = (theme: Theme) =>
    createStyles({
        root: {flexGrow: 1},
        cardHeader: {
            paddingBottom: 0
        }
    });

interface IPrams {
    teamId: string
}

interface IState {
    isLoading: boolean
    data?: ITeam
    error?: string
}

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<IPrams> {

}

interface IDProps {
    label: string
    value: string
}

const MobileDisplayRow = (props: IDProps) => <React.Fragment>
    <Typography variant="caption">
        {props.label}
    </Typography>
    <Typography variant="subheading">
        {props.value}
    </Typography>
</React.Fragment>


class Details extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    public render() {
        const {classes} = this.props
        const {isLoading, data, error} = this.state
        if (isLoading) {
            return <Loading/>
        }
        if (error || !data) {
            return <Error message='Failed to load contact!'/>
        }
        return (
            <BasePanel>
                <Card>
                    <CardHeader
                        className={classes.cardHeader}

                        title={<Typography variant="button">
                            Basic Information
                        </Typography>}
                    />
                    <CardContent>
                        <Grid container spacing={8}>
                            <Grid item xs={6} sm={4}>
                                <MobileDisplayRow
                                    label='Name'
                                    value={data.name}
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <MobileDisplayRow
                                    label='Created On'
                                    value={moment(data.createdAt).format("MMM Do YYYY")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <MobileDisplayRow
                                    label='Details'
                                    value={data.description}
                                />
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
                <TabbedDetails data={data}/>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={4}>
                        <MyDebug data={data}/>
                    </Grid>
                </Grid>
            </BasePanel>
        );
    }

    public componentWillMount() {
        const {match} = this.props
        const {params: {teamId}} = match
        if (validate.isDefined(teamId)) {
            const url = `${remoteRoutes.teams}/${teamId}`
            get(url, (data: ITeam) => {
                console.log("Fetched contact", data)
                this.setState(() => ({data}))
            }, undefined, () => {
                this.setState(() => ({isLoading: false}))
            })
        } else {
            this.setState(() => ({isLoading: false, error: 'Invalid path'}))
        }
    }
}

export default withStyles(styles)(Details)
