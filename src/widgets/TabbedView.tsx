import React,{Fragment} from 'react';
import {Theme, WithStyles,WithTheme} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import SwipeableViews from 'react-swipeable-views';

export interface ITabElement {
    id: string
    icon: string | React.ReactElement<any>
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

interface IProps extends WithStyles<typeof styles>,WithTheme {
    data: ITabElement[]
}

class TabbedView extends React.Component<IProps> {
    public state = {
        value: 0,
    }

    handleChangeIndex = (index:number) => {
        this.setState({ value: index });
    };

    public render() {
        const {classes, data,theme} = this.props;
        const {value} = this.state;
        const item: ITabElement = data[value]
        return (
            <div className={classes.root}>
                <AppBar position='relative' color='inherit'>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor='primary'
                        textColor='primary'
                        variant='fullWidth'
                    >
                        {
                            data.map((it: ITabElement) => (
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
                    {data[this.state.value].component}
                    {/*<SwipeableViews*/}
                        {/*axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}*/}
                        {/*index={this.state.value}*/}
                        {/*onChangeIndex={this.handleChangeIndex}*/}
                    {/*>*/}
                        {/*{data.map(it=><Fragment key={it.id}>{it.component}</Fragment>)}*/}
                    {/*</SwipeableViews>*/}
                </Paper>

            </div>
        );
    }

    private handleChange = (event: any, value: number) => {
        this.setState({value});
    }
}

export default withStyles(styles,{ withTheme: true })(TabbedView)
