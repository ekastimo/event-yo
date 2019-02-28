import React, {useEffect, useState} from 'react';
import {remoteRoutes} from "../../data/constants";
import {del, search} from "../../utils/ajax";
import {RouteComponentProps, withRouter} from 'react-router'
import LocationItem from "./LocationItem";
import {locationSchema} from "./config";
import FormHolder from "../../widgets/FormHolder";
import LocationEditor from "./editors/LocationEditor";
import Toast from "../../utils/Toast";
import uiConfirm from "../../widgets/confirm";
import ListView from "../../widgets/lists/ListView";

interface IProps extends RouteComponentProps<any> {
}

function Locations(props:IProps) {
    const [isLoading,setIsLoading]= useState(true)
    const [showDialog,setShowDialog]= useState(false)
    const [toEdit ,setToEdit]= useState(undefined)
    const [query ,setQuery]= useState("")
    const [data,setData]= useState([])
    const selected: any = toEdit
    const handleClose=()=>{
        setShowDialog(false)
    }

    const handleChange = (e: any) => {
        const value = e.target.value
        setQuery(value)
    }

    useEffect(()=>{
        const request = {limit: 10, skip: 0,query}
        reloadData(request)
    },[query])

    const handleNewContact=()=>{
        setShowDialog(true)
    }

    const handleEdit=(data:any)=>{
        setToEdit(data)
        setShowDialog(true)
    }

    const handleDelete=(data:any)=>{
        doDeletion(data,setIsLoading,handleCompletion)
    }

    const reloadData =(request: any = {})=> {
        search(remoteRoutes.locations, request, data => {
            setData(data)
            setIsLoading(false)
        }, undefined, () => {
            setIsLoading(false)
        })
    }

    const handleCompletion=()=>{
        reloadData()
    }
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
            {showDialog &&
            <FormHolder
                title='New Location'
                open={showDialog}
                onClose={handleClose}
                data={toEdit ? {...selected} : {}}
                url={remoteRoutes.locations}
                isNew={!toEdit}
                schema={locationSchema}
                onAjaxComplete={handleCompletion}
            >
                <LocationEditor/>
            </FormHolder>
            }

        </div>
    )
}

function doDeletion(data:any,setIsLoading:any,handleCompletion:any) {
    const {name, id} = data;
    uiConfirm(`Do you really want to delete ${name}?`).then(() => {
        const url = `${remoteRoutes.locations}/${id}`;
        setIsLoading(true)
        del(url, resp => {
            Toast.info(resp.message)
            handleCompletion()
        }, undefined, () => {
            setIsLoading(false)
        });
    }).catch(e => undefined)
}

export default withRouter(Locations)
