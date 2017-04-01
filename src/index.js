/* import libs */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
/* import pages */
import App from './common/containers/App'
import Home from './common/containers/pages/Home';
import Measurement from './common/containers/pages/Measurement';
import Unsaved from './common/containers/pages/MeasUnsaved';
import Evidence from './common/containers/pages/Evidence';
import Comparison from './common/containers/pages/Comparison';
import Simul from './common/containers/pages/Simulator';
import Settings from './common/containers/pages/Settings';
import NoF from './common/containers/pages/NoFound';
/* create global State store */
import myotonometrApp from './common/reducers/index';
let store = createStore(myotonometrApp);
/* open ws connection */
import * as ws from './common/services/index';
ws.createWs( false, "marble.cz", 8080, store);
ws.patientLoad();

//render location in testAppB/public/index.html or testAppB/build/index.html
const root = document.getElementById('root');

/* routing */
ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={App} >
                <IndexRoute component={Home} />
                <Route path="/measurement" component={Measurement} />
                <Route path="/unsaved" component={Unsaved} />
                <Route path="/evidence" component={Evidence} />
                <Route path="/settings" component={Settings} />
                <Route path="/sim" component={Simul} />
                <Route path="/comparison" component={Comparison} />
            </Route>
            <Route path="*" component={App} >
                <IndexRoute component={NoF} />
            </Route>
        </Router>
    </Provider>
), root );