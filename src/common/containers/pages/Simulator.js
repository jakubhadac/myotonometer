/* import libs */
import React from 'react';
import { connect } from 'react-redux';
/* import */
import * as ws from '../../services/index';
/* map functions */
function mapStateToProps(store) { return { status: store.simulator.status, progress: store.simulator.progress}; }

class Simulator extends React.Component {
    constructor(){
        super();
        this.createMeas = this.createMeas.bind(this);
    }
    createMeas(){ ws.modifySimulatorStatus(1); }
    render() {
        const statusText = ['Waiting for new measurement', 'Press start btn', 'Measurement in progress...'];
        const noProgress = (
            <fieldset>
                <legend>Myotonometer simulator</legend>
                <p>Status: {statusText[this.props.status]}</p>
                <p>Move: nope</p>
                <p>Chart data: <small>Data obtained only one who started measurements</small></p>
                <button onClick={this.createMeas} disabled={(this.props.status !== 0)? true: false}>Create meas</button>
            </fieldset>
        );
        const withProgress = (
            <fieldset>
                <legend>Myotonometer simulator</legend>
                <p>Status: {statusText[this.props.status]}</p>
                <p>Move: TOP <progress value={this.props.progress} max="10" /> BOTTOM </p>

            </fieldset>
        );
        const render = (this.props.status === 2)? withProgress: noProgress;
        return ( render );
    }
}
export default connect(mapStateToProps)(Simulator);