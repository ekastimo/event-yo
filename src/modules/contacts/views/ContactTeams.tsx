import * as React from 'react';
import {List, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {remoteRoutes} from "../../../data/constants";
import {get} from "../../../utils/ajax";
import {withStyles} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from 'react-router'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {ITeam} from "../../teams/types";
import Loading from "../../../widgets/Loading";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            [theme.breakpoints.only('xs')]: {
                padding: theme.spacing.unit * 2,
            },
        }
    });

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
    contactId :string
}

interface IState {
    isLoading: boolean,
    data: ITeam[],
    search: ISearch,
    showDialog: boolean
}

interface ISearch {
    limit: number,
    skip: number,
    name?: string
}

class Contacts extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            isLoading: true,
            showDialog: false,
            data: [],
            search: {
                limit: 10,
                skip: 0
            }
        }
    }



    public render() {
        const {isLoading, data} = this.state
        return (
            <div>
                {
                    isLoading ?
                        <Loading/>
                        :
                        <List>
                            {
                                data.map((it: any) => (
                                    <ListItem dense >
                                        <Avatar alt={it.name} src={''}/>
                                        <ListItemText
                                            primary={it.name}
                                            secondary={it.description}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>
                }
            </div>
        )
    }

    public componentDidMount() {
        this.reloadData()
    }

    private reloadData() {
        const url = `${remoteRoutes.contactTeams}/${this.props.contactId}`
        get(url, data => {
            this.setState(() => ({data, isLoading: false}))
        }, undefined, () => {
            this.setState(() => ({isLoading: false}))
        })
    }

}

export default withRouter(withStyles(styles)(Contacts))
