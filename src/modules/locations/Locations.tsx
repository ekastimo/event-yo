import React from 'react';
import {remoteRoutes} from "../../data/constants";
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

interface IProps extends RouteComponentProps<any> {
    loadData: (req: any) => any
    data: any[]
    isLoading: boolean
}

function Locations(props: IProps) {
    const {
        isNew,toEdit, showDialog,
        handleChange, handleClose, handleDelete,
        handleEdit, handleNewContact, handleCompletion
    } = useDataManipulator({deleteUrl: remoteRoutes.locations, loadData: props.loadData})
    const {data, isLoading} = props

    return (
        <div>
            <ListView
                isLoading={isLoading}
                title='Church Locations'
                hasData={data && data.length > 0}
                handleAdd={handleNewContact}
                handleSearch={handleChange}
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
                title={isNew?'New Location':'Edit Location'}
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

        </div>
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