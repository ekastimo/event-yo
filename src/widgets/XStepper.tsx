import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import {WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";


const styles = () =>
    createStyles({
        stepLabel: {
            cursor: 'pointer'
        },
        root: {}
    });

export interface IStep {
    label: string
    content: React.ReactNode
}

interface IProps extends WithStyles<typeof styles> {
    steps: IStep[]
    allActive?: boolean
}

class XStepper extends React.Component<IProps, any> {
    public state = {
        activeStep: 0,
    };

    public setActive = (activeStep: number) => () => {
        this.setState(() => ({activeStep}))
    }

    public render() {
        const {classes, steps, allActive = false} = this.props;
        const xProps: any = {}
        if (allActive) {
            xProps.active = true
        }
        const {activeStep} = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map(({label, content}, index) => {
                        return (
                            <Step key={label} completed={false} {...xProps}>
                                <StepLabel onClick={this.setActive(index)}
                                           className={classes.stepLabel}>{label}</StepLabel>
                                <StepContent>
                                    <div>
                                        {content}
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        );
    }
}

export default withStyles(styles)(XStepper);
