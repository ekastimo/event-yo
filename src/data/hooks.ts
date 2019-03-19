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
    filter?: any
    isNew: boolean
    handleDelete: (data: any) => any,
    handleEdit: (data: any) => any
    handleNew: () => any
    handleClose: () => any
    handleSearch: (data: any) => any
    handleCompletion: (data: any) => any
}

export function useDataManipulator(params: IDataParams): IDataResponse {
    const [isNew, setIsNew] = useState(true)
    const [isDeleting, setIsDeleting] = useState(true)
    const [showDialog, setShowDialog] = useState(false)
    const [toEdit, setToEdit] = useState(undefined)
    const [filter, setFilter] = useState({limit: 10, skip: 0})

    const handleClose = () => {
        setShowDialog(false)
    }

    const handleSearch = (data: any) => {
        setFilter(data)
    }

    useEffect(() => {
        console.log("Going to filter")
        params.loadData(filter)
    }, [filter])

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
        const {id} = data;
        uiConfirm(`Do you really want to delete this record?`).then(() => {
            const url = `${params.deleteUrl}/${id}`;
            setIsDeleting(false)
            del(url, resp => {
                Toast.info(resp.message)
                handleCompletion()
            }, undefined, () => {
                setIsDeleting(false)
            });
        }, () => {
        })
    }

    const handleCompletion = () => {
        params.loadData({})
    }

    return {
        isNew, isDeleting, showDialog, toEdit, filter,
        handleDelete, handleEdit, handleNew: handleNewContact, handleClose, handleSearch, handleCompletion
    }
}
