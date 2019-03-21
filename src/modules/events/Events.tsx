import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventItem from "./EventItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import {localRoutes, remoteRoutes} from "../../data/constants";
import createStyles from "@material-ui/core/styles/createStyles";
import {List, ListItem, ListItemText, WithStyles} from "@material-ui/core";
import {RouteComponentProps, withRouter} from 'react-router'
import {IEvent} from "./types";
import FormHolder from "../../widgets/FormHolder";
import EventForm from "./EventForm";
import {eventSchema} from "./config";
import {IStore} from "../../data/types";
import AppBase from "../../base/AppBase";
import {useDataManipulator} from "../../data/hooks";
import {connect} from "react-redux";
import {fetchData} from "./redux";
import FabButton from "../../widgets/FabButton";
import AddIcon from '@material-ui/icons/Add';
import Loading from "../../widgets/Loading";
import GridWrapper from "../../widgets/GridWrapper";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            [theme.breakpoints.only('xs')]: {
                padding: theme.spacing.unit * 2,
            },
        },
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary,
        }
    });

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
    isLoading: boolean,
    data: IEvent[],
    loadData: (data: any) => any,
}


function Events(props: IProps) {
    const {
        toEdit, showDialog,
        handleSearch, handleClose, handleDelete,
        handleNew, handleCompletion
    } = useDataManipulator({deleteUrl: remoteRoutes.contacts, loadData: props.loadData})
    const {data, isLoading} = props
    const handleEdit = (data: any) => {
        const path = `${localRoutes.events}/${data.id}`
        const {history} = props
        history.push(path)
    }
    return (
        <AppBase
            handleSearch={handleSearch}
            title='Events'
        >
            <GridWrapper>
                <Grid container spacing={16} justify='center'>
                    <Grid item xs={12} sm={10} md={10} >
                        {
                            isLoading ?
                                <Loading/> :
                                <Grid container spacing={24}>
                                    {
                                        data.map((it: IEvent) => {
                                            return (
                                                <Grid item xs={12} sm={6} lg={4} xl={3} key={it.id}>
                                                    <EventItem
                                                        data={it}
                                                        handleClick={()=>handleEdit({...it})}
                                                    />
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                        }
                        <FabButton color='primary' onClick={handleNew}>
                            <AddIcon/>
                        </FabButton>
                    </Grid>
                </Grid>
            </GridWrapper>


            <FormHolder
                title='New Event'
                open={showDialog}
                onClose={handleClose}
                data={{}}
                url={remoteRoutes.events}
                isNew={true}
                schema={eventSchema}
                onAjaxComplete={handleCompletion}
                debug
            >
                <EventForm/>
            </FormHolder>

        </AppBase>
    )
}

export default connect(
    ({events}: IStore) => {
        return {
            data: events.data,
            isLoading: events.isFetching
        }
    },
    (dispatch: any) => {
        return {
            loadData: (data: any) => dispatch(fetchData(data))
        }
    }
)(withRouter(withStyles(styles)(Events)))



