import React from 'react';
import {remoteRoutes} from "../../data/constants";
import {RouteComponentProps, withRouter} from 'react-router'
import Item from "./CellGroupItem";
import {cellGroupFormDataParser, cellGroupSchema as schema} from "./config";
import FormHolder from "../../widgets/FormHolder";
import Editor from "./editors/CellGroupEditor";
import ListView from "../../widgets/lists/ListView";
import {fetchData} from "./redux";
import {connect} from "react-redux";
import {IStore} from "../../data/types";
import {useDataManipulator} from "../../data/hooks";
import AppBase from "../../base/AppBase";


interface IProps extends RouteComponentProps<any> {
    loadData: (req: any) => any
    data: any[]
    isLoading: boolean
}

function Locations(props: IProps) {
    const {
        isNew, toEdit, showDialog,
        handleSearch, handleClose, handleDelete,
        handleEdit, handleNew, handleCompletion
    } = useDataManipulator({deleteUrl: remoteRoutes.cellGroups, loadData: props.loadData})
    const {data, isLoading} = props


    return (
        <AppBase
            handleSearch={handleSearch}
            title='Mcs'>
            <ListView
                isLoading={isLoading}
                hasData={data && data.length > 0}
                handleAdd={handleNew}
            >
                {
                    data.map((it: any) => (
                        <Item
                            key={it.id}
                            data={{...it}}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                }
            </ListView>
            <FormHolder
                title={isNew ? 'New Mc' : 'Edit Mc'}
                open={showDialog}
                onClose={handleClose}
                data={toEdit ? {...toEdit} : {}}
                url={remoteRoutes.cellGroups}
                isNew={isNew}
                schema={schema}
                onAjaxComplete={handleCompletion}
                dataParser={cellGroupFormDataParser}
            >
                <Editor/>
            </FormHolder>

        </AppBase>
    )
}

export default connect(
    ({cellGroups}: IStore) => {
        return {
            data: cellGroups.data,
            isLoading: cellGroups.isFetching
        }
    },
    (dispatch: any) => {
        return {
            loadData: (data: any) => dispatch(fetchData(data))
        }
    }
)(withRouter(Locations))
