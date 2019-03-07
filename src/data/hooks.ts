import {useEffect, useState} from "react";
import Toast from "../utils/Toast";
import uiConfirm from "../widgets/confirm";
import {del} from "../utils/ajax";

interface IDataParams {
    deleteUrl: string
    loadData: (req: any) => any
}

interface IDataResponse {
    isDeleting: boolean
    showDialog: boolean
    toEdit?: any
    isNew: boolean
    handleDelete: (data: any) => any,
    handleEdit: (data: any) => any
    handleNewContact: () => any
    handleClose: () => any
    handleChange: (data: any) => any
    handleCompletion: (data: any) => any
}

export function useDataManipulator(params: IDataParams): IDataResponse {
    const [isNew, setIsNew] = useState(true)
    const [isDeleting, setIsDeleting] = useState(true)
    const [showDialog, setShowDialog] = useState(false)
    const [toEdit, setToEdit] = useState(undefined)
    const [query, setQuery] = useState("")

    const handleClose = () => {
        setShowDialog(false)
    }

    const handleChange = (e: any) => {
        const value = e.target.value
        setQuery(value)
    }

    useEffect(() => {
        const request = {limit: 10, skip: 0, query}
        params.loadData(request)
    }, [query])

    const handleNewContact = () => {
        const empty: any = {};
        setToEdit(empty)
        setIsNew(true)
        setShowDialog(true)
    }

    const handleEdit = (data: any) => {
        setToEdit(data)
        setIsNew(false)
        setShowDialog(true)
    }

    const handleDelete = (data: any) => {
        const {name, id} = data;
        uiConfirm(`Do you really want to delete this record?`).then(() => {
            const url = `${params.deleteUrl}/${id}`;
            setIsDeleting(false)
            del(url, resp => {
                Toast.info(resp.message)
                handleCompletion()
            }, undefined, () => {
                setIsDeleting(false)
            });
        },()=>{})
    }

    const handleCompletion = () => {
        params.loadData({})
    }

    return {
        isNew,isDeleting, showDialog, toEdit,
        handleDelete, handleEdit, handleNewContact, handleClose, handleChange, handleCompletion
    }
}