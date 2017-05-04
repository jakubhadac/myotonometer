/* import libs */
import React, {Component} from 'react';
import {Col, Row, FormControl, Button, FormGroup, ControlLabel, Form} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
/* import ws */
import * as ws from '../services/index';
/* import actions */
import * as ac from '../actions/index';
/* map functions */
function mapStateToProps(store) { return { pid: store.patient.id, meas: store.measurement }; }
function mapDispatchToProps(dispatch){ return {
    eId: (id)=>{ dispatch( ac.editMeasurementId(id) ); }, sGraph: (pid, mid)=>{ dispatch( ac.editSavGraph(pid,mid) ); }
}; }

class EvidMeas extends Component {
    constructor(props){
        super(props);

        this.hId = this.hId.bind(this);

        this.btnPrint = this.btnPrint.bind(this);
        this.btnDelete = this.btnDelete.bind(this);
        this.btnShow = this.btnShow.bind(this);
    }
    /* handle functions */
    hId(event){ this.props.eId( parseInt( event.target.value, 10 ) ); }
    /* user functions */
    btnPrint(){ }
    btnDelete(){ ws.measurementRemove(this.props.pid, this.props.meas.id); }
    btnShow(){ this.props.sGraph(this.props.pid, this.props.meas.id); setTimeout(()=>{ browserHistory.push('/g'); }, 200); }
    /* render */
    render(){
        const meas = this.props.meas.measurements.filter(e => e.patId === this.props.pid);
        const withoutMeas = (
            <fieldset>
                <legend>Measurements:</legend>
                <p> This patient have not any saved measurement. </p>
            </fieldset>
        );
        const withMeas =(
            <fieldset>
                <legend>Measurements:</legend>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalID">
                        <Col componentClass={ControlLabel} sm={4}>Measurement: </Col>
                        <Col sm={8}>
                            <FormControl componentClass="select" value={this.props.meas.id} onChange={this.hId}>
                                <option value='-1' key='-1' ></option>
                                {
                                    meas.map(function(m){
                                        return <option key={m.measId} value={m.measId}>
                                            [{m.date}]:{m.fnote.substr(0,30)}</option>
                                    })
                                }
                            </FormControl>
                        </Col>
                    </FormGroup>
                </Form>
                <Row>
                    <Col sm={8}>
                        <p>Status: {this.props.meas.status}</p>
                    </Col>
                    <Col sm={4}>
                    {this.props.meas.id !== -1 && <Button className="pull-right" onClick={this.btnDelete}>Delete</Button>}
                    {this.props.meas.id !== -1 && <Button className="pull-right" onClick={this.btnShow}>Show</Button>}
                    {this.props.meas.id !== -1 && <Button className="pull-right" onClick={this.btnPrint}>Print</Button>}
                    </Col>
                </Row>
            </fieldset>
        );
        return (meas.length !== 0)? withMeas: withoutMeas;
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EvidMeas);