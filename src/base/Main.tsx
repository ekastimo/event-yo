import * as React from 'react';

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
import Typography from "@material-ui/core/Typography";
import withWidth from '@material-ui/core/withWidth';
import MenuIcon from '@material-ui/icons/Menu';
import {ContentSwitch} from "./ContentSwitch";
import NavBar from './NavBar';
import NavProfile from "./NavProfile";
import {WithStyles} from "@material-ui/core";

const drawerWidth = 240;

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            marginLeft: drawerWidth,
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
            },
        },
        menuButton: {
            marginRight: 20,
            [theme.breakpoints.up('sm')]: {
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

export interface IProps extends WithStyles<typeof styles> {
    theme: any
}

class Main extends React.Component<IProps> {
    public state = {
        mobileOpen: false,
    };

    public handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    public closeDrawer = () => {
        this.setState({mobileOpen: false});
    }

    public openDrawer = () => {
        this.setState({mobileOpen: true});
    }

    public render() {
        const {classes, theme} = this.props;
        const drawer = (
            <div>
                <NavProfile/>
                <Divider/>
                <NavBar onClose={this.closeDrawer}/>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
                            dEMO
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <SwipeableDrawer
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onOpen={this.openDrawer}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </SwipeableDrawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <ContentSwitch/>
                </main>
            </div>
        );
    }
}


const Styled = withStyles(styles, {withTheme: true})(Main);

export default withWidth()(Styled)
