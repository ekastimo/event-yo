import Avatar from '@material-ui/core/Avatar';
import {Theme, withStyles} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import * as React from 'react';
import {images} from "../assets/images";

interface IProps {
    classes?: any
}

class NavProfile extends React.Component<IProps> {

    public render() {
        const {classes} = this.props
        return (
            <div className={classes.holder}>
                <div className={classes.row}>
                    <Avatar
                        alt="Profile"
                        src={images.profile}
                        className={classNames(classes.avatar, classes.bigAvatar)}
                    />
                </div>
                <div className={classes.row}>
                    <Typography component="p" className={classes.profileText}>
                        Mujungu Eva
                    </Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant="caption" component="p" className={classes.profileText}>
                        mujux@gmail.com
                    </Typography>
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


export default withStyles(styles)(NavProfile);


