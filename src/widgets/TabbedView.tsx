import * as React from 'react';
import {Theme, WithStyles} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
export interface ITabElement{
    id: string
    icon:  string | React.ReactElement<any>
    component: React.ReactNode
    title: React.ReactNode
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        tabContent: {
            paddingTop: theme.spacing.unit,
            minHeight: 200,
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing.unit,
            },
        }
    });

interface IProps extends WithStyles<typeof styles> {
    data: ITabElement[]
}

class TabbedView extends React.Component<IProps> {
    public state = {
        value: 0,
    }

    public render() {
        const {classes, data} = this.props;
        const {value} = this.state;
        const item: ITabElement = data[value]
        return (
            <div className={classes.root}>
                <AppBar position='static' color='inherit'>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor='primary'
                        textColor='primary'
                        centered
                    >
                        {
                        data.map((it: ITabElement)=>(
                            <Tab
                                key={it.id}
                                label={it.title}
                                icon={it.icon}
                            />
                        ))
                    }
                    </Tabs>
                </AppBar>
                <Paper>
                    {item.component}
                </Paper>

            </div>
        );
    }

    private handleChange = (event: any, value: number) => {
        this.setState({value});
    }
}

export default withStyles(styles)(TabbedView)
