import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import PeopleOutlineRounded from '@material-ui/icons/PeopleOutlineRounded';
import CalenderIcon from '@material-ui/icons/PermContactCalendar';
import PersonIcon from '@material-ui/icons/PersonPinCircle';
import * as React from 'react'
import {RouteComponentProps, withRouter} from 'react-router'
import {localRoutes} from "../data/constants";


interface IProps extends RouteComponentProps<any> {
    onClose?: any
}

class NavBar extends React.Component<IProps> {

    public onClick=(path: string)=>() =>{
        const {history, onClose} = this.props
        history.push(path)
        onClose()
    }

    public render() {
        return <div>
            <ListItem button={true} onClick={this.onClick(localRoutes.home)}>
                <ListItemIcon>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
            </ListItem>
            <ListItem button={true} onClick={this.onClick(localRoutes.contacts)}>
                <ListItemIcon>
                    <PeopleOutline/>
                </ListItemIcon>
                <ListItemText primary="Contacts"/>
            </ListItem>
            <ListItem button={true} onClick={this.onClick(localRoutes.teams)}>
                <ListItemIcon>
                    <PeopleOutlineRounded/>
                </ListItemIcon>
                <ListItemText primary="Teams"/>
            </ListItem>
            <ListItem button={true} onClick={this.onClick(localRoutes.events)}>
                <ListItemIcon>
                    <CalenderIcon/>
                </ListItemIcon>
                <ListItemText primary="Events"/>
            </ListItem>
            <ListItem button={true} onClick={this.onClick(localRoutes.users)}>
                <ListItemIcon>
                    <PersonIcon/>
                </ListItemIcon>
                <ListItemText primary="Users"/>
            </ListItem>
        </div>
    }
}


export default withRouter(NavBar)


