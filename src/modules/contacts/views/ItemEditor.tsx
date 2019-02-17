import React,{Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';

import XListItem from "../../../widgets/lists/XListItem";

interface IProps {
    data: any
    text: string
    isPrimary: boolean
    isLoading: boolean
    handleEdit: (e: any) => any
    handleDelete: (e: any) => any
    primary: React.ReactNode
    secondaryIcon: React.ReactNode
}

const ItemEditor = (props: IProps) => {
    const {data, isPrimary, text, isLoading, handleEdit, handleDelete, primary, secondaryIcon} = props
    return (
        <XListItem
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
        >
            <ListItemText
                primary={<Typography variant='body2' noWrap>
                    {isPrimary ? primary : secondaryIcon}
                    &nbsp;&nbsp;{text}
                </Typography>}
            />
        </XListItem>
    );
}

export default ItemEditor
