import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ITEM_HEIGHT = 48;

interface IProps {
    options: any[],
    onItemSelected: (selected: any) => any,
}

class MoreMenu extends React.Component<IProps, any> {
    public state = {
        anchorEl: null,
    };

    public render() {
        const {anchorEl} = this.state;
        const {options} = this.props;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    {options.map(option => (
                        <MenuItem key={option} onClick={this.handleClose(option)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }

    private handleClick = (event: any) => {
        this.setState({anchorEl: event.currentTarget})
    }

    private handleClose = (itemId: any) => () => {
        this.setState({anchorEl: null});
        this.props.onItemSelected(itemId)
    };
}


export default MoreMenu;
