/* import libs */
import { combineReducers } from 'redux';
/* import reducers */
import simulator from './simulator';
import patient from './patient';

const myotonometrApp = combineReducers({
    simulator, patient
});
export default myotonometrApp;