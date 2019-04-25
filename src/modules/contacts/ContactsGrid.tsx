import * as React from 'react';
import {localRoutes, remoteRoutes} from "../../data/constants";
import {RouteComponentProps, withRouter} from 'react-router'
import {IContact} from "./types";
import {
    contactChcFilterDataParser,
    contactChcFilterDataParserReverse,
    contactChcFormDataParser,
    newPersonSchema
} from "./config";
import FormHolder from "../../widgets/FormHolder";
import NewPersonEditor from "./editors/NewPersonEditor";
import {connect} from "react-redux";
import {IStore} from "../../data/types";
import {fetchData} from "./redux";
import {useDataManipulator} from "../../data/hooks";
import AppBase from "../../base/AppBase";
import {ChcForm} from "./views/ChcView";
import FabButton from "../../widgets/FabButton";
import AddIcon from '@material-ui/icons/Add';
import Loading from "../../widgets/Loading";
import GridWrapper from "../../widgets/GridWrapper";
import Grid from '@material-ui/core/Grid';
import ContactItem from "./ContactItemGrid";

interface IProps extends RouteComponentProps<any> {
    isLoading: boolean,
    data: IContact[],
    loadData: (data: any) => any,
}

export function Contacts(props: IProps) {
    const {
        toEdit, showDialog, filter,
        handleSearch, handleClose, handleDelete,
        handleNew, handleCompletion
    } = useDataManipulator({deleteUrl: remoteRoutes.contacts, loadData: props.loadData})
    const {data, isLoading} = props
    const handleEdit = (data: any) => {
        const path = `${localRoutes.contacts}/${data.id}`
        const {history} = props
        history.push(path)
    }
    return (
        <AppBase
            title='People'
            filter={filter}
            handleSearch={handleSearch}
            dataParser={contactChcFilterDataParser}
            dataParserReverse={contactChcFilterDataParserReverse}
            advancedForm={<ChcForm/>}
        >
            <GridWrapper>
                <Grid container spacing={16} justify='center'>
                    <Grid item xs={12} sm={11} md={10} >
                        {
                            isLoading ?
                                <Loading/> :
                                <Grid container spacing={16}>
                                    {
                                        data.map((it: IContact) => {
                                            return (
                                                <Grid item xs={12} sm={6} lg={4} xl={4} key={it.id}>
                                                    <ContactItem
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
                title='New Contact'
                data={toEdit ? {...toEdit} : {}}
                url={remoteRoutes.contactsPerson}
                isNew={true}
                schema={newPersonSchema}
                open={showDialog}
                onClose={handleClose}
                onAjaxComplete={handleCompletion}
                dataParser={contactChcFormDataParser}
            >
                <NewPersonEditor/>
            </FormHolder>
        </AppBase>
    )
}


export default connect(
    ({contacts}: IStore) => {
        return {
            data: contacts.data,
            isLoading: contacts.isFetching
        }
    },
    (dispatch: any) => {
        return {
            loadData: (data: any) => dispatch(fetchData(data))
        }
    }
)(withRouter(Contacts))
