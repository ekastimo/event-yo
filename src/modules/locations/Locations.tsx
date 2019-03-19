import React from 'react';
import {localRoutes, remoteRoutes} from "../../data/constants";
import {RouteComponentProps, withRouter} from 'react-router'
import LocationItem from "./LocationItem";
import {locationSchema} from "./config";
import FormHolder from "../../widgets/FormHolder";
import LocationEditor from "./editors/LocationEditor";
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
        handleNew, handleCompletion
    } = useDataManipulator({deleteUrl: remoteRoutes.locations, loadData: props.loadData})
    const {data, isLoading} = props
    const handleEdit = (data: any) => {
        const path = `${localRoutes.contacts}/${data.id}`
        const {history} = props
        history.push(path)
    }
    return (
        <AppBase
            handleSearch={handleSearch}
            title='Church Locations'
        >
            <ListView
                isLoading={isLoading}
                hasData={data && data.length > 0}
                handleAdd={handleNew}
            >
                {
                    data.map((it: any) => (
                        <LocationItem
                            key={it.id}
                            data={{...it}}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                }
            </ListView>
            <FormHolder
                title={isNew ? 'New Location' : 'Edit Location'}
                open={showDialog}
                onClose={handleClose}
                data={toEdit ? {...toEdit} : {}}
                url={remoteRoutes.locations}
                isNew={isNew}
                schema={locationSchema}
                onAjaxComplete={handleCompletion}
            >
                <LocationEditor/>
            </FormHolder>

        </AppBase>
    )
}

export default connect(
    ({locations}: IStore) => {
        return {
            data: locations.data,
            isLoading: locations.isFetching
        }
    },
    (dispatch: any) => {
        return {
            loadData: (data: any) => dispatch(fetchData(data))
        }
    }
)(withRouter(Locations))
