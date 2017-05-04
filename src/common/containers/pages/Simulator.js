/* import libs */
import React from 'react';
import { connect } from 'react-redux';
/* map functions */
function mapStateToProps(store) { return { myo: store.myotonometer }; }

class Simulator extends React.Component {
    render() {
        const statusText = ['Waiting for new measurement', 'Press start btn', 'Measurement in progress(move down)',
            'Measurement in progress(measurement)', 'Measurement in progress(move up)'];
        const noProgress = (
            <fieldset>
                <legend>Myotonometer simulator</legend>
                <p>Status: {statusText[this.props.myo.status]}</p>
                <p>Chart data: {this.props.myo.data}</p>
            </fieldset>
        );
        const withProgress = (
            <fieldset>
                <legend>Myotonometer simulator</legend>
                <p>Status: {statusText[this.props.myo.status]}</p>
                <p>Profile: {this.props.myo.profile}, speed: {this.props.myo.speed}, depth: {this.props.myo.depth},
                    indentor: {this.props.myo.indentor} </p>
                <p>Progress: <progress value={this.props.myo.progress} max="100" /></p>
            </fieldset>
        );
        const render = (this.props.myo.status >= 2)? withProgress: noProgress;
        return ( render );
    }
}
export default connect(mapStateToProps)(Simulator);