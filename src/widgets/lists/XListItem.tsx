import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MoreMenu from "../MoreMenu";
import withWidth, {WithWidth} from '@material-ui/core/withWidth';
import {ListItemSecondaryAction} from "@material-ui/core";

interface IProps extends WithWidth {
    data: any,
    onEdit: (data: any) => any
    onDelete: (data: any) => any
    isLoading?: boolean
    editOnClick?: boolean
    onDetails?: (data: any) => any
}

class XListItem extends React.Component<IProps, any> {
    menu:any= undefined
    state = {
        showButtons: false
    }
    showButtons = () => this.setState(() => ({showButtons: true}))
    hideButtons = () => this.setState(() => ({showButtons: false}))

    public render() {
        const {data, onEdit, onDelete, isLoading, width,onDetails,editOnClick} = this.props
        const {showButtons} = this.state
        const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
            console.log("On Click roww")
            e.stopPropagation()
            e.preventDefault()
            if(editOnClick){
                onEdit({...data})
            }else if(onDetails){
                onDetails({...data})
            }
            this.menu.closeMenu()
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
            <ListItem dense={width === 'sm'} button onClick={handleEdit}
                      onMouseOver={this.showButtons}
                      onMouseLeave={this.hideButtons}
            >
                {this.props.children}
                <Hidden smDown>
                    {
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
                </Hidden>
                <Hidden mdUp>
                    <ListItemSecondaryAction>
                        <MoreMenu options={items} onItemSelected={handleMenuClick} ref={ref=>this.menu=ref}/>
                    </ListItemSecondaryAction>
                </Hidden>
            </ListItem>
        );
    }
}

export default withWidth()(XListItem);


