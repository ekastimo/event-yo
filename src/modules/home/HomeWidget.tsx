import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';


interface IProps {
    title:string
    chipText:string
    content:string
}

function HomeWidget(props: IProps) {
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

export default HomeWidget