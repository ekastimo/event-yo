import * as React from "react"
import {Route, Switch} from 'react-router-dom'
import {localRoutes} from "../data/constants";
import Home from "../modules/Home2";
import NoMatch from "./NoMatch";
import Contacts from "../modules/contacts/Contacts";
import Details from "../modules/contacts/Details";
import Events from "../modules/events/Events";
import Teams from "../modules/teams/Teams";
import Locations from "../modules/locations/Locations";
import LocationsX from "../modules/locations/LocationsX";
import LocationDetails from "../modules/locations/Details";
import CellGroups from "../modules/cellgroups/CellGroups";
import CellGroupDetails from "../modules/cellgroups/Details";
// import Users from "../modules/users/Users";
import EventDetails from "../modules/events/details/EventDetails";
import TeamDetails from "../modules/teams/Details";


export class ContentSwitch extends React.Component {
    public render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={Contacts}/>
                <Route path={localRoutes.home} component={Home}/>
                <Route path={localRoutes.contactsDetails} component={Details}/>
                <Route path={localRoutes.contacts} component={Contacts}/>

                <Route path={localRoutes.eventsDetails} component={EventDetails}/>
                <Route path={localRoutes.events} component={Events}/>

                <Route path={localRoutes.teamsDetails} component={TeamDetails}/>
                <Route path={localRoutes.teams} component={Teams}/>

                <Route path={localRoutes.locationDetails} component={LocationDetails}/>
                <Route path={localRoutes.locations} component={LocationsX}/>

                <Route path={localRoutes.cellGroupDetails} component={CellGroupDetails}/>
                <Route path={localRoutes.cellGroups} component={CellGroups}/>
                {/*<Route path={localRoutes.users} component={Users}/>*/}
                <Route component={NoMatch}/>
            </Switch>
        )
    }
}
