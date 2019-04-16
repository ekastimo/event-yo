import React, {Fragment} from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Hidden from '@material-ui/core/Hidden';
import MoreMenu from "../MoreMenu";
import withWidth, {WithWidth} from '@material-ui/core/withWidth';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CommentIcon from '@material-ui/icons/Comment';

interface IProps extends WithWidth {
    data: any,
    onEdit: (data: any) => any
    onDelete: (data: any) => any
    isLoading?: boolean
    editOnClick?: boolean
    onDetails?: (data: any) => any
    divider?: boolean
}

class XListItem extends React.Component<IProps, any> {
    // menu: any = undefined
    state = {
        showButtons: false
    }
    showButtons = () => this.setState(() => ({showButtons: true}))
    hideButtons = () => this.setState(() => ({showButtons: false}))

    public render() {
        const {data, onEdit, onDelete, isLoading, width, onDetails, editOnClick = true, divider = true} = this.props
        const isSmall = width === 'sm' || width === 'xs'
        const {showButtons} = this.state
        const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
            console.log("Handle edit")
            e.stopPropagation()
            e.preventDefault()
            if (editOnClick) {
                onEdit({...data})
            } else if (onDetails) {
                onDetails({...data})
            }
        }

        const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation()
            e.preventDefault()
            onDelete({...data})
        }
        const items = ['Edit', 'Delete']
        const handleMenuClick = (item: string) => {
            if (item === 'Edit') {
                onEdit({...data})
            } else if (item === 'Delete') {
                onDelete({...data})
            }
        }

        return (
            <Fragment>
                <ListItem dense={width === 'sm'} button onClick={handleEdit} role={undefined}
                          onMouseOver={this.showButtons}
                          onMouseLeave={this.hideButtons}
                >
                    {this.props.children}
                    {
                        isSmall ?
                            <ListItemSecondaryAction>
                                <MoreMenu options={items} onItemSelected={handleMenuClick}/>
                            </ListItemSecondaryAction> :
                            showButtons &&
                            <React.Fragment>
                                <IconButton aria-label="Edit" onClick={handleEdit} disabled={isLoading}>
                                    <EditIcon fontSize='small'/>
                                </IconButton>
                                <IconButton aria-label="Delete" onClick={handleDelete} disabled={isLoading}>
                                    <DeleteIcon fontSize='small'/>
                                </IconButton>
                            </React.Fragment>
                    }
                </ListItem>
                {divider && <Divider/>}
            </Fragment>

        );
    }
}

export default withWidth()(XListItem);


