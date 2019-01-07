import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
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
            flexGrow: 1,
            height: '100%',
            zIndex: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            width: '100%',
        },
        appBar: {
            position: 'absolute',
            marginLeft: drawerWidth,
            [theme.breakpoints.up('md')]: {
                width: `calc(100% - ${drawerWidth}px)`,
            },
        },
        navIconHide: {
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
            height: '100%',
            [theme.breakpoints.up('md')]: {
                position: 'relative',
            },
        },
        mainBody: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing.unit,
            },
            overflow: 'auto'
        },
        fillHeight: {
            height: '100%'
        },
        logoutButton: {
            float: 'right'
        }, grow: {
            flexGrow: 1,
        }
    });

export interface IProps extends WithStyles<typeof styles> {
    theme: any,
    handleLogout: () => any
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

    public render() {
        const {classes, theme} = this.props;
        const drawer = (
            <div className={classes.fillHeight}>
                <NavProfile/>
                <Divider/>
                <NavBar onClose={this.closeDrawer}/>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap={true} className={classes.grow}>
                            Demo
                        </Typography>
                        <Button color="inherit" onClick={this.props.handleLogout} size={"small"}>Log
                            out</Button>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp={true}>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown={true} implementation="css">
                    <Drawer
                        variant="permanent"
                        open={true}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.mainBody}>
                    <div className={classes.toolbar}/>
                    <ContentSwitch/>
                </main>
            </div>
        );
    }
}


const Styled = withStyles(styles, {withTheme: true})(Main);

export default withWidth()(Styled)
