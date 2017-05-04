/* libs import */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
/* import components */
import Chart from '../../components/linesChart';
import PatientSelect from '../../components/compPatSel';
import MultiSelect from '../../components/compMeasSel';
/* import actions */
import * as ac from '../../actions/index';
/* map functions */
function mapStateToProps(store) { return { pid: store.patient.id, meas: store.measurement }; }
function mapDispatchToProps(dispatch){ return {
    eSelA: (id)=>{ dispatch( ac.editMeasurementCompA(id) ); }, eSelB: (id)=>{ dispatch( ac.editMeasurementCompB(id) ); }
}; }

class Comparison extends Component{
    componentWillMount(){
        let m = this.props.meas.measurements.filter( i => (i.patId === this.props.pid &&
            (i.measId === this.props.meas.compA || i.measId === this.props.meas.compB)) );
        if (m.length === 0) { this.props.eSelA( -1 ); this.props.eSelB( -1 );}
    }
    render(){
        const m = this.props.meas.measurements.filter( i => (i.patId === this.props.pid &&
        (i.measId === this.props.meas.compA || i.measId === this.props.meas.compB)) );
        return (
            <Well>
                <PatientSelect />
        {this.props.pid !== -1 && <MultiSelect />}
        {this.props.pid !== -1 && this.props.meas.compA !== -1 && this.props.meas.compB !== -1 &&
            m.length === 2 && <Chart />}
            </Well>
        );
    }
} export default connect(mapStateToProps, mapDispatchToProps)(Comparison);