import * as React from "react";
import { Theme, withStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import Fab, { FabProps } from "@material-ui/core/Fab";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: theme.spacing.unit * 3,
      right: theme.spacing.unit * 2,
      [theme.breakpoints.up("sm")]: {
        bottom: theme.spacing.unit * 5,
        right: theme.spacing.unit * 5
      },
      [theme.breakpoints.up("lg")]: {
        bottom: theme.spacing.unit * 8,
        right: theme.spacing.unit * 8
      }
    }
  });

interface FabButtonProps extends FabProps {
  classOverride?: string;
  classes: {
    root: string;
  };
}

class FabButton extends React.Component<FabButtonProps, any> {
  public render() {
    const { classes, children } = this.props;
    return (
      <Fab className={classes.root} {...this.props}>
        {children}
      </Fab>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FabButton);
