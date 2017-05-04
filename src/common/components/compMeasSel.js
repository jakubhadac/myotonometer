/* libs import */
import React, { Component } from 'react';
import { FormGroup, FormControl, Col, ControlLabel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
/* import actions */
import * as ac from '../actions/index';
/* map functions */
function mapStateToProps(store) { return { pid: store.patient.id, meas: store.measurement }; }
function mapDispatchToProps(dispatch){ return {
    eSelA: (id)=>{ dispatch( ac.editMeasurementCompA(id) ); }, eSelB: (id)=>{ dispatch( ac.editMeasurementCompB(id) ); }
}; }

class MultiSelect extends Component{
    constructor(props){
        super(props);
        this.hSelectA = this.hSelectA.bind(this);
        this.hSelectB = this.hSelectB.bind(this);
    }
    hSelectA(e){ this.props.eSelA( parseInt( e.target.value, 10 ) ); }
    hSelectB(e){ this.props.eSelB( parseInt( e.target.value, 10 ) ); }
    render(){
        let sel = this.props.meas.measurements.filter(e => e.patId === this.props.pid);
        let selA = (this.props.meas.compB !== -1)? sel.filter(e => e.measId !== this.props.meas.compB) : sel;
        let selB = (this.props.meas.compA !== -1)? sel.filter(e => e.measId !== this.props.meas.compA) : sel;

        const data = (
            <div>
                <FormGroup controlId="comparisonSelect">
                    <Row>
                        <Col componentClass={ControlLabel} sm={5}> GraphA </Col>
                        {this.props.meas.compA !== -1 && <Col componentClass={ControlLabel} sm={5}> GraphB </Col>}
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <FormControl componentClass="select" value={this.props.meas.compA} onChange={this.hSelectA}>
                                <option key='-1' value='-1'> </option>
                                { selA.map(function(meas){
                                    return <option key={meas.measId} value={meas.measId}>[{meas.date}]:{meas.fnote.substr(0,15)}</option>
                                }) }
                            </FormControl>
                        </Col>
                        {this.props.meas.compA !== -1 &&
                        <Col sm={6}>
                            <FormControl componentClass="select" value={this.props.meas.compB} onChange={this.hSelectB}>
                                <option key='-1' value='-1'> </option>
                                { selB.map(function (meas) {
                                    return <option key={meas.measId} value={meas.measId}> [{meas.date}]:{meas.fnote.substr(0, 15)}</option>
                                }) }
                            </FormControl>
                        </Col>
                        }
                    </Row>
                </FormGroup>
            </div>
        );
        const noData = (
            <div> Patient have 0 or 1 saved measurement</div>
        );
        return (sel.length <= 1)? noData : data;
    }
} export default connect(mapStateToProps, mapDispatchToProps)(MultiSelect);