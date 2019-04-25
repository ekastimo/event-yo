import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import PinDropIcon from '@material-ui/icons/PinDrop';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import {IContact} from "./types";
import {renderSimpleName} from "./config";
import {isNullOrEmpty, parseAvatar} from "../../utils/TK";

import createStyles from "@material-ui/core/styles/createStyles";
import {Theme, withStyles, WithStyles} from "@material-ui/core";


const styles = (theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            marginLeft: 75
        },
        cardHeader: {
            paddingBottom: 0
        },
        cardBody: {
            paddingTop: 0
        },
        avatar: {
            backgroundColor: red[500],
            width: 60,
            height: 60,
        },
    });

interface IProps extends WithStyles<typeof styles> {
    data: IContact,
    handleClick: (data: any) => any
}

const ContactItem = (props: IProps) => {
    const {data, classes, handleClick} = props
    const {firstName, lastName, avatar} = data.person
    const {person, emails: [email], phones: [phone]} = data
    return (
        <Card onClick={handleClick}>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    isNullOrEmpty(avatar) ?
                        <Avatar alt={lastName}
                                className={classes.avatar}>{parseAvatar(`${firstName} ${lastName}`)}</Avatar> :
                        <Avatar alt={firstName} src={avatar} className={classes.avatar}/>
                }
                title={
                    <Typography variant="h6" component='span'>
                        {renderSimpleName(person)}
                    </Typography>
                }
            />
            <CardContent className={classes.cardBody}>
                <div className={classes.content}>
                    <Typography variant="body2" component='span'>
                        <EmailIcon fontSize="inherit"/>&nbsp;{email.address}
                    </Typography>
                </div>
                <div className={classes.content}>
                    <Typography variant="body2" component='span'>
                        <PhoneIcon fontSize="inherit"/>&nbsp;{phone.number}
                    </Typography>
                </div>
                <div className={classes.content}>
                    <Typography variant="caption" component='span'>
                        <PinDropIcon fontSize="inherit"/>&nbsp;{data.churchLocation}&nbsp;&nbsp;&nbsp;
                    </Typography>

                    <Typography variant="caption" component='span' inline>
                        <NaturePeopleIcon fontSize="inherit"/>&nbsp;{data.cellGroup}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}

export default withStyles(styles)(ContactItem)
