import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';

import XListItem from "../../../widgets/lists/XListItem";

interface IProps {
    data: any
    text: string
    secondaryText?: string
    isPrimary: boolean
    isLoading: boolean
    handleEdit: (e: any) => any
    handleDelete: (e: any) => any
    divider?: boolean
}

const ItemEditor = (props: IProps) => {
    const {data, isPrimary, text, secondaryText, isLoading, handleEdit, handleDelete, divider} = props
    return (
        <XListItem
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
            divider={divider}
        >
            <ListItemText
                primary={
                    <Typography variant='body2' noWrap>
                        {isPrimary ? <b>{text}</b> : text}
                    </Typography>
                }
                secondary={secondaryText}
            />
        </XListItem>
    );
}

export default ItemEditor
