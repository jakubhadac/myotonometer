/* import libs */
import React, {Component} from 'react';
import {Col, Row, FormControl, FormGroup, ControlLabel, Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
/* import ws */
import * as ws from '../services/index';
/* import actions */
import * as ac from '../actions/index';
/* map functions */
function mapStateToProps(store) { return { set: store.settings, id: store.patient.id, meas: store.measurement }; }
function mapDispatchToProps(dispatch){ return {
    eSpeed: (s)=>{ dispatch( ac.editMeasurementSpeed(s) ); }, ePene: (p)=>{ dispatch( ac.editMeasurementPene(p) ); },
    eProf: (p)=>{ dispatch( ac.editMeasurementProf(p) ); }, eNote: (n)=>{ dispatch( ac.editMeasurementNote(n) ); },
    eStatus: (s)=>{ dispatch( ac.measurementStatus(s) ); }, rStatus: ()=>{ dispatch( ac.measurementStatusReset() ); },
    eSend: (s)=>{ dispatch( ac.measurementSend(s) ); }
}; }

class MeasParam extends Component{
    constructor(props){
        super(props);
        this.handleProfile = this.handleProfile.bind(this);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.handleDepth = this.handleDepth.bind(this);
        this.handleNote = this.handleNote.bind(this);

        this.startBtn = this.startBtn.bind(this);
        this.start = this.start.bind(this);
    }
    componentWillMount() {
        if (this.props.set.defSpeed > this.props.meas.speed) this.props.eSpeed(this.props.set.defSpeed);
        if (this.props.set.defPenetration > this.props.meas.pene) this.props.ePene(this.props.set.defPenetration);
    }
    startBtn(){
        if( this.props.meas.pene !== '' && this.props.meas.speed !== '' && this.props.meas.profile !== ''
        && this.props.meas.send === false ){
            this.props.eSend(true); ws.modifyMyotonometer(this.createMeas());
        } else this.props.eStatus('Missing parameters...');
    }
    start() {
        /*if( this.props.meas.pene !== '' && this.props.meas.speed !== '' && this.props.meas.profile !== ''
         && this.props.meas.send === false ){
         this.props.eSend(true); let m = this.createMeas(); m.status = 2; ws.modifyMyotonometer(m);
         } else this.props.eStatus('Missing parameters...');*/
        this.props.eStatus('Automatic start is not possible now...');
    }
    createMeas(){
        return { status: 1, progress: 0, writer: 0, speed: this.props.meas.speed, depth: this.props.meas.pene, fnote: this.props.meas.note,
            data: [], patId: this.props.id, profile: this.props.meas.profile, indentor: this.props.set.indentor };
    }
    handleNote(e){ this.props.eNote( e.target.value.replace(/>/g, '').replace(/</g, '').substr(0, 250) ); }
    handleProfile(e){ this.props.eProf( e.target.value ); }
    handleSpeed(e){
        let value = parseInt(e.target.value, 10); if (value < 1) value = 1;
        if (value > this.props.set.maxSpeed) value = this.props.set.maxSpeed;
        this.props.eSpeed(value);
    }
    handleDepth(e){
        let value = parseInt(e.target.value, 10); if (value < 1) value = 1;
        if (value > this.props.set.maxPene) value = this.props.set.maxPene;
        this.props.ePene(value);
    }
    render(){
        return (
            <fieldset>
                <legend>Measurement Parameters</legend>
                <Row>
                    <Col sm={6}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalProfile">
                                <Col componentClass={ControlLabel} sm={6}>Profile: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="select" value={this.props.meas.profile}
                                        onChange={this.handleProfile} disabled={this.props.meas.send}>
                                        <option value='default'>Def. profile</option>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalSpeed">
                                <Col componentClass={ControlLabel} sm={6}>Speed [mm/s]: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="input" type="number" value={this.props.meas.speed}
                                        onChange={this.handleSpeed} disabled={this.props.meas.send}/>
                                    </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPenetrationDepth">
                                <Col componentClass={ControlLabel} sm={6}>Penetration depth [mm]: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="input" type="number" value={this.props.meas.pene}
                                        onChange={this.handleDepth} disabled={this.props.meas.send} />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col sm={6}>
                        <Row>
                            <Col componentClass={ControlLabel} sm={6}>Meas time [s]: </Col>
                            <Col sm={6}>{this.props.meas.pene / this.props.meas.speed}</Col>
                        </Row>
                        <Row>
                            <Col componentClass={ControlLabel} sm={6}>Force limit [N]: </Col>
                            <Col sm={6}>{this.props.set.maxForce}</Col>
                        </Row>
                        <Row>
                            <Col componentClass={ControlLabel} sm={6}>Used indentor: </Col>
                            <Col sm={6}>{this.props.set.indentor}</Col>
                        </Row>
                    </Col>
                </Row>
                <FormGroup controlId="formMeasurementNote">
                    <ControlLabel>Measurement note:</ControlLabel>
                    <FormControl componentClass="textarea" value={this.props.meas.note} onChange={this.handleNote}/>
                </FormGroup>
                <Col sm={9}><ControlLabel>Status: {this.props.meas.status}</ControlLabel></Col>
                <Col sm={3}>
                    <Row>
                    {!this.props.meas.send &&
                    <Button className="pull-right" onClick={this.start} disabled={this.props.meas.send}>Start</Button>}
                    {!this.props.meas.send &&
                    <Button className="pull-right" onClick={this.startBtn} disabled={this.props.meas.send}>Start with Btn</Button>}
                    </Row>
                </Col>
            </fieldset>
        );
    }
} export default connect(mapStateToProps, mapDispatchToProps)(MeasParam);