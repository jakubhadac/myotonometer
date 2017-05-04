/* import libs */
import React, {Component} from 'react';
import { Well } from 'react-bootstrap';
import { connect } from 'react-redux';
/* import components */
import MeasPat from '../../components/measPat';
import MeasParam from '../../components/measParam';
/* map functions */
function mapStateToProps(store) { return { id: store.patient.id, mst: store.myotonometer.status, send: store.measurement.send }; }

class Measurement extends Component {
    render(){
        const statusText = ['Waiting for new measurement', 'Press start btn', 'Measurement in progress(move down)',
            'Measurement in progress(measurement)', 'Measurement in progress(move up)'];
        const a = ( <Well> <MeasPat /> </Well> );
        const b = (
            <Well>
                <MeasPat />
                <MeasParam />
                {this.props.send && <p>Myotonometer status: {statusText[this.props.mst]}</p>}
            </Well> );
        return (this.props.id !== -1)? b: a;
    }
} export default connect(mapStateToProps)(Measurement);