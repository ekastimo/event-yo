import React from 'react';
import Typography from '@material-ui/core/Typography';


interface IMobileDisplayProps {
    label: string
    value: string
}
export const MobileDisplayRow = (props: IMobileDisplayProps) => <React.Fragment>
    <Typography variant="subtitle2" gutterBottom>
        {props.label}
    </Typography>
    <Typography variant="body2">
        {props.value}
    </Typography>
</React.Fragment>