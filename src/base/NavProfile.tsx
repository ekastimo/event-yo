import Avatar from '@material-ui/core/Avatar';
import {Theme, withStyles} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import * as React from 'react';
import {connect} from "react-redux";
import {doLogin, doLogout} from "../data/coreActions";
import {IUser} from "../data/types";
import {WithStyles} from "@material-ui/core";
import {isNullOrEmpty, parseAvatar} from "../utils/TK";

import Link from '@material-ui/core/Link';

interface IProps extends WithStyles<typeof styles> {
    user: IUser
    handleLogin: (data: any) => any
    handleLogout: () => any
}

class NavProfile extends React.Component<IProps> {

    public render() {
        const {classes, user} = this.props
        return (
            <div className={classes.holder}>
                <div className={classes.row}>
                    {
                        isNullOrEmpty(user.avatar) ?
                            <Avatar
                                alt="Profile"
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            >{parseAvatar(user.fullName)}</Avatar> :
                            <Avatar
                                alt="Profile"
                                src={user.avatar}
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                    }
                </div>
                <div className={classes.row}>
                    <Typography variant='subtitle1' className={classes.profileText}>
                        {user.fullName}
                    </Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant="caption" className={classes.profileText}>
                        {user.email}
                    </Typography>
                </div>
                <div className={classes.row}>
                    <Link
                        component="button"
                        variant="caption"
                        onClick={this.props.handleLogout}
                        className={classes.profileText}
                    >
                        LOG OUT
                    </Link>
                </div>
            </div>
        )
    }
}

const styles = (theme: Theme) =>
    createStyles({
        holder: {
            height: 150,
            backgroundColor: theme.palette.primary.main
        },
        row: {
            display: 'flex',
            justifyContent: 'center',
        },
        avatar: {
            margin: 10,
        },
        bigAvatar: {
            width: 60,
            height: 60,
        },
        profileText: {
            color: '#fff'
        }
    });

export default connect(
    (store: any) => {
        return {
            token: store.core.token,
            user: store.core.user
        }
    },
    (dispatch: any) => {
        return {
            handleLogin: (data: any) => dispatch(doLogin(data)),
            handleLogout: () => dispatch(doLogout())
        }
    }
)(withStyles(styles)(NavProfile))


