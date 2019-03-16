import * as React from 'react';
import {localRoutes, remoteRoutes} from "../../data/constants";
import {RouteComponentProps, withRouter} from 'react-router'
import ContactItem from "./ContactItem";
import {IContact} from "./types";
import {contactChcFilterDataParser, contactChcFormDataParser, newPersonSchema} from "./config";
import FormHolder from "../../widgets/FormHolder";
import NewPersonEditor from "./editors/NewPersonEditor";
import ListView from "../../widgets/lists/ListView";
import {connect} from "react-redux";
import {IStore} from "../../data/types";
import {fetchData} from "./redux";
import {useDataManipulator} from "../../data/hooks";
import {ChcForm} from "./views/ChcView";

interface IProps extends RouteComponentProps<any> {
    isLoading: boolean,
    data: IContact[],
    loadData: (data: any) => any,
}

export function Contacts(props: IProps) {
    const {
        toEdit, showDialog,
        handleSearch, handleClose, handleDelete,
        handleNewContact, handleCompletion
    } = useDataManipulator({deleteUrl: remoteRoutes.contacts, loadData: props.loadData})
    const {data, isLoading} = props
    const handleEdit = (data: any) => {
        const path = `${localRoutes.contacts}/${data.id}`
        const {history} = props
        history.push(path)
    }
    return (
        <div>
            <ListView
                isLoading={isLoading}
                title='People'
                hasData={data && data.length > 0}
                handleAdd={handleNewContact}
                handleSearch={handleSearch}
                advancedForm={<ChcForm/>}
                dataParser={contactChcFilterDataParser}
            >
                {
                    data.map((it: any) => (
                        <ContactItem
                            key={it.id}
                            data={{...it}}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                }
            </ListView>
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

        </div>
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
