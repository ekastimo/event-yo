import React, {Fragment, useState} from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import PinDropIcon from '@material-ui/icons/PinDrop';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import CalenderIcon from '@material-ui/icons/PermContactCalendar';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SettingsIcon from '@material-ui/icons/Settings';
import TocIcon from '@material-ui/icons/Toc';
import CakeIcon from '@material-ui/icons/Cake';
import PersonIcon from '@material-ui/icons/Person';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {RouteComponentProps, withRouter} from 'react-router'
import {localRoutes} from "../data/constants";
import createStyles from "@material-ui/core/styles/createStyles";
import {Theme, withStyles, WithStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {IStore} from "../data/types";
import {toggleNav} from "../data/coreActions";


const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        nested: {
            paddingLeft: theme.spacing.unit * 4,
        },
    });

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
    onClose?: any
    toggleNavBar: (name: string) => any
    navBar: any
}

const NavBar = (props: IProps) => {
    const {toggleNavBar, navBar:open} = props

    const onClick = (path: string) => () => {
        const {history, onClose} = props
        history.push(path)
        onClose()
    }

    const handleExpand = (name: string) => () => {
        toggleNavBar(name)
    }
    const collapseProps: any = {component: "div", disablePadding: true}

    return <div>
        {
            menu.map(it => {
                if (it.items) {
                    return <Fragment  key={it.name}>
                        <ListItem button onClick={handleExpand(it.name)}>
                            <ListItemIcon>
                                {it.icon}
                            </ListItemIcon>
                            <ListItemText primary={it.title}/>
                            {open[it.name] ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={open[it.name]} timeout="auto" unmountOnExit>
                            <List {...collapseProps}>
                                {
                                    it.items.map(itChild => {
                                        return <ListItem button className={props.classes.nested}
                                                         onClick={onClick(itChild.route)}
                                                         key={itChild.name}>
                                            <ListItemIcon>
                                                {itChild.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={itChild.title}/>
                                        </ListItem>
                                    })
                                }
                            </List>
                        </Collapse>
                    </Fragment>
                } else {
                    return <ListItem button onClick={onClick(it.route)} key={it.name}>
                        <ListItemIcon>
                            {it.icon}
                        </ListItemIcon>
                        <ListItemText primary={it.title}/>
                    </ListItem>
                }
            })
        }
    </div>
}

interface INavMenu {
    grouped: boolean
    name: string
    route: string
    title: string
    icon: any,
    items?: INavMenu[]
}

const menu: INavMenu[] = [
    {
        grouped: false,
        icon: <HomeIcon/>,
        name: 'home',
        title: 'Home',
        route: localRoutes.home

    },
    {
        grouped: true,
        icon: <PeopleOutline/>,
        name: 'people',
        title: 'People',
        route: '',
        items: [
            {
                grouped: false,
                icon: <PeopleOutline/>,
                name: 'members',
                title: 'Members',
                route: localRoutes.contacts

            },
            {
                grouped: false,
                icon: <PeopleOutline/>,
                name: 'teams',
                title: 'Teams',
                route: localRoutes.teams
            }
        ]
    },
    {
        grouped: true,
        icon: <AccountBalanceIcon/>,
        name: 'church',
        title: 'Church',
        route: '',
        items: [
            {
                grouped: false,
                icon: <NaturePeopleIcon/>,
                name: 'cellGroups',
                title: 'Mcs',
                route: localRoutes.cellGroups

            },
            {
                grouped: false,
                icon: <PinDropIcon/>,
                name: 'location',
                title: 'Locations',
                route: localRoutes.locations
            }
        ]
    }, {
        grouped: true,
        icon: <CakeIcon/>,
        name: 'events',
        title: 'Events',
        route: '',
        items: [
            {
                grouped: false,
                icon: <CalendarTodayIcon/>,
                name: 'allEvent',
                title: 'Events',
                route: localRoutes.events

            },
            {
                grouped: false,
                icon: <CalenderIcon/>,
                name: 'calendar',
                title: 'Calendar',
                route: localRoutes.events
            }
        ]
    }, {
        grouped: true,
        icon: <SettingsIcon/>,
        name: 'admin',
        title: 'Admin',
        route: '',
        items: [
            {
                grouped: false,
                icon: <PersonIcon/>,
                name: 'users',
                title: 'User',
                route: localRoutes.users

            },
            {
                grouped: false,
                icon: <TocIcon/>,
                name: 'logs',
                title: 'Audit',
                route: localRoutes.users
            }
        ]
    }
]


export default connect(
    ({core}: IStore) => {
        return {navBar: core.navBar}
    },
    (dispatch: any) => {
        return {
            toggleNavBar: (data: string) => dispatch(toggleNav(data))
        }
    }
)(withStyles(styles)(withRouter(NavBar)))


