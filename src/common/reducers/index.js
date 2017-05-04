/* import libs */
import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux';
/* import reducers */
import myotonometer from './myotonometer';
import measurement from './measurement';
import patient from './patient';
import settings from './settings';
import graph from './graph';

const myotonometerApp = combineReducers({
    myotonometer, patient, settings, measurement, graph
});
export default myotonometerApp;