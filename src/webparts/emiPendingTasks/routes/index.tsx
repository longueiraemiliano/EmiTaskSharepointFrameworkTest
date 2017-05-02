import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../components/App';
import EmiPendingTasks from '../components/EmiPendingTasks';

/*
var RouteMap = (
    <Route path="/" component={App}>
        {/*<Route path="users" component={Users}/>
        <Route path="branches" component={Home}/>
        <Route path="sales" component={Sales}/>}
        <IndexRoute component={EmiPendingTasks}/>
    </Route>
);

export default RouteMap;

*/

export default class RouteMap extends React.Component<any, any> { 
    render() {
            return (
                <Route path="/" component={App}>
                    {/*<Route path="users" component={Users}/>
                    <Route path="branches" component={Home}/>
                    <Route path="sales" component={Sales}/>*/}
                    <IndexRoute component={EmiPendingTasks}/>
                </Route>);
        }
}

