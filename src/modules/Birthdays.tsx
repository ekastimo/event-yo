import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            ...theme.mixins.gutters(),
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
        }
    });
interface IProps {
    title:string
    chipText:string
    content:string
}

function BirthDays(props: IProps) {
    const {title,chipText,content} = props
    return (
        <Card>
            <CardHeader
                action={
                    <Chip label={chipText}/>
                }
                subheader={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default BirthDays