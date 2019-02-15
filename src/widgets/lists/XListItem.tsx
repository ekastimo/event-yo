import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

interface IProps {
    data: any,
    onEdit: (data: any) => any
    onDelete: (data: any) => any
}

class XListItem extends React.Component<IProps, any> {
    state = {
        showButtons: false
    }
    showButtons = () => this.setState(() => ({showButtons: true}))
    hideButtons = () => this.setState(() => ({showButtons: false}))

    public render() {
        const {data, onEdit, onDelete} = this.props
        const {showButtons} = this.state
        const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation()
            e.preventDefault()
            onEdit({...data})
        }

        const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation()
            e.preventDefault()
            onDelete({...data})
        }
        return (
            <ListItem dense button onClick={handleEdit}
                      onMouseOver={this.showButtons}
                      onMouseLeave={this.hideButtons}
            >
                {this.props.children}
                {
                    showButtons &&
                    <React.Fragment>
                        <IconButton aria-label="Edit" onClick={handleEdit}>
                            <EditIcon fontSize='small'/>
                        </IconButton>
                        <IconButton aria-label="Delete" onClick={handleDelete}>
                            <DeleteIcon fontSize='small'/>
                        </IconButton>
                    </React.Fragment>
                }
            </ListItem>
        );
    }
}

export default XListItem;
