import React, {ReactNode, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import NavBar from './NavBar';
import NavProfile from "./NavProfile";
import {WithStyles, WithTheme} from "@material-ui/core";
import XToolBar from "../widgets/XToolBar";

const drawerWidth = 260;

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('md')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            marginLeft: drawerWidth,
            [theme.breakpoints.up('md')]: {
                width: `calc(100% - ${drawerWidth}px)`,
            },
        },
        menuButton: {
            marginRight: 20,
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1
        },
        grow: {
            flexGrow: 1,
        },
    });

export interface IProps extends WithStyles<typeof styles>, WithTheme {
    title: string
    handleSearch?: (data: any) => any
    children: ReactNode

    filter?: any
    advancedForm?: any
    dataParser?: (data: any) => any,
    dataParserReverse?: (data: any) => any,
}

function DrawerBody(props: any) {
    return <div>
        <NavProfile/>
        <Divider/>
        <NavBar onClose={props.closeDrawer}/>
    </div>
}

function AppBase(props: IProps) {
    const {classes, theme, title = "dEMO", children, handleSearch, advancedForm, filter, dataParser, dataParserReverse} = props;
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const closeDrawer = () => {
        setMobileOpen(false);
    }

    const openDrawer = () => {
        setMobileOpen(true);
    }

    const killIt = () => {
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                {
                    handleSearch ?
                        <XToolBar
                            onFilter={handleSearch}
                            title={title}
                            handleNew={killIt}
                            filter={filter}
                            advancedForm={advancedForm}
                            dataParser={dataParser}
                            dataParserReverse={dataParserReverse}
                            handleDrawerToggle={handleDrawerToggle}
                            menuButtonClass={classes.menuButton}
                        /> :
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
                                {title}
                            </Typography>
                        </Toolbar>
                }
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden mdUp implementation="css">
                    <SwipeableDrawer
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onOpen={openDrawer}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <DrawerBody closeDrawer={closeDrawer}/>
                    </SwipeableDrawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <DrawerBody closeDrawer={closeDrawer}/>
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {children}
            </main>
        </div>
    );

}


export default withStyles(styles, {withTheme: true})(AppBase)
