/* import libs */
import React, {Component} from 'react';
import {Col, Row, FormControl, Button, FormGroup, ControlLabel, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
/* import ws */
import * as ws from '../services/index';
/* import actions */
import * as ac from '../actions/index';
/* map functions */
function mapStateToProps(store) { return { pat: store.patient, send: store.measurement.send }; }
function mapDispatchToProps(dispatch){ return {
    eId: (id)=>{ dispatch( ac.editPatientId(id) ); }, eLName: (lName)=>{ dispatch( ac.editPatientLastName(lName) ); },
    eName: (name)=>{ dispatch( ac.editPatientName(name) ); }, ePin: (pin)=>{ dispatch( ac.editPatientPin(pin) ); },
    eGender: (gen)=>{ dispatch( ac.editPatientGender(gen) ); }, eNote: (note)=>{ dispatch( ac.editPatientNote(note) ); },
    rPat: ()=>{ dispatch( ac.patientReset() ); }, rStatus: ()=>{ dispatch( ac.patientStatusReset() ); },
    eStat: (msg)=>{ dispatch( ac.patientStatus(msg) ); }
}; }

class reducEvidence extends Component {
    constructor(props){
        super(props);

        this.hId = this.hId.bind(this); this.hLastName = this.hLastName.bind(this);
        this.hName = this.hName.bind(this); this.hPin = this.hPin.bind(this);
        this.hGander = this.hGander.bind(this); this.hNote = this.hNote.bind(this);

        this.btnSave = this.btnSave.bind(this);
    }
    /* ... functions */
    getLastId(){
        let i = 0, pats = this.props.pat.patients.map( (a) => a.id ); pats.sort( (a,b) => a-b );
        while ( pats[i] === i ){ i++; } return i;
    }
    createPatient(){
        return { note: this.props.pat.note, lastName: this.props.pat.lastName, name: this.props.pat.name,
            gender: this.props.pat.gender, pin: this.props.pat.pin };
    }
    checkValues(){
        this.checkLastName();
        if (this.props.pat.status === '') { this.checkName(); }
        if (this.props.pat.status === '') { this.checkPin(); }
    }
    checkName(){ if(this.props.pat.name === '') this.props.eStat('Missing name...'); }
    checkLastName(){ if(this.props.pat.lastName === '') this.props.eStat('Missing last name...'); }
    checkPin(){ if(this.props.pat.pin.length < 10) this.props.eStat('PIN must have 10 numbers...'); }
    /* handle functions */
    hId(event){
        let value = parseInt(event.target.value,10);
        if(value !== -1){
            let patients = this.props.pat.patients;
            let index = patients.findIndex(item => item.id === parseInt(value, 10));
            if (index !== -1) {
                let p = patients[index];
                this.props.eId(value); this.props.eNote(p.note); this.props.eLName(p.lastName);
                this.props.eName(p.name); this.props.ePin(p.pin); this.props.eGender(p.gender);
                this.setState({id: value, lastName: p.lastName, pin: p.pin, name: p.name, gender: p.gender, note: p.note });
            } else { this.props.eStat('Patient not found > select patient again'); }
        } else { this.props.rPat(); }
    }
    hLastName(event){
        let value = event.target.value.replace(/[^a-zá-žA-ZÁ-Ž]/g, '').substr(0, 20);
        let e = (value.length === 0)? 'Please set last name': '';
        this.props.eLName(value); this.props.eStat(e);
    }
    hName(event){
        let value = event.target.value.replace(/[^a-zá-žA-ZÁ-Ž]/g, '').substr(0, 20);
        let e = (value.length === 0)? 'Please set name': '';
        this.props.eName(value); this.props.eStat(e);
    }
    hPin(event){
        let value = event.target.value.replace(/[^0-9\.]+/g, ""); let e = (value.length < 10)? 'Pin mus have 10numbers': '';
        this.props.ePin(value.substr(0,10)); this.props.eStat(e);
    } 
    hGander(event){ this.props.eGender(event.target.value); }
    hNote(event){ this.props.eNote(event.target.value.replace(/>/g, '').replace(/</g, '').substr(0, 250)); }
    /* user functions */
    btnSave(){
        this.props.rStatus();
        this.checkValues();
        if(this.props.pat.name === '' || this.props.pat.lastName === '' || this.props.pat.pin === ''){
            this.props.eStat('Missing values...');
        } else {
            if(this.props.pat.id === -1 && this.props.pat.status === '') {
                let p = this.createPatient(), i = this.getLastId(); ws.patientAdd(i, p);
            }
        }
    }
    /* render */
    render(){
        const newP = (
            <fieldset>
                <legend>Measurement Personal Data</legend>
                <Row>
                    <Col sm={6}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalID">
                                <Col componentClass={ControlLabel} sm={6}>Patient: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="select" value={this.props.pat.id} onChange={this.hId}>
                                        <option value='-1' key='-1' >New Patient</option>
                                        {
                                            this.props.pat.patients.map(function(patient){
                                                return <option key={patient.id} value={patient.id}>
                                                    {patient.lastName} {patient.name} ({patient.pin})</option>
                                            })
                                        }
                                    </FormControl>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalLastName">
                                <Col componentClass={ControlLabel} sm={6}>Last Name: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="input" type="text"
                                                 value={this.props.pat.lastName} onChange={this.hLastName}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPenetrationPersonalIN">
                                <Col componentClass={ControlLabel} sm={6}>Personal IN: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="input" type="text"
                                                 value={this.props.pat.pin} onChange={this.hPin}/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col sm={6}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalName">
                                <Col componentClass={ControlLabel} sm={6}>Name: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="input" type="text"
                                                 value={this.props.pat.name} onChange={this.hName}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalGender">
                                <Col componentClass={ControlLabel} sm={6}>Gender: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="select" value={this.props.pat.gender} onChange={this.hGander}>
                                        <option value="male">Male</option>
                                        <option value="Female">Female</option>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <FormGroup controlId="formUserNote">
                    <ControlLabel>User note:</ControlLabel>
                    <FormControl componentClass="textarea" value={this.props.pat.note} onChange={this.hNote}/>
                </FormGroup>
                <Row>
                    <Col sm={9}>
                        <ControlLabel>Status: {this.props.pat.status}</ControlLabel>
                    </Col>
                    <Col sm={3}>
                        <Button className="pull-right" onClick={this.btnSave}>Save</Button>
                    </Col>
                </Row>
            </fieldset>
        );
        const editP = (
            <fieldset>
                <legend>Measurement Personal Data</legend>
                <Row>
                    <Col sm={6}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalID">
                                <Col componentClass={ControlLabel} sm={6}>Patient: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="select" value={this.props.pat.id} onChange={this.hId}
                                                 disabled={this.props.send} >
                                        <option value='-1' key='-1' >New Patient</option>
                                        {
                                            this.props.pat.patients.map(function(patient){
                                                return <option key={patient.id} value={patient.id}>
                                                {patient.lastName} {patient.name} ({patient.pin})</option>
                                            })
                                        }
                                    </FormControl>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalLastName">
                                <Col componentClass={ControlLabel} sm={6}>Last Name: </Col>
                                <Col componentClass={ControlLabel} sm={6}>{this.props.pat.lastName}</Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPenetrationPersonalIN">
                                <Col componentClass={ControlLabel} sm={6}>Personal IN: </Col>
                                <Col sm={6} componentClass={ControlLabel}>{this.props.pat.pin}</Col>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col sm={6}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalName">
                                <Col componentClass={ControlLabel} sm={6}>Name: </Col>
                                <Col componentClass={ControlLabel} sm={6}>{this.props.pat.name}</Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalGender">
                                <Col componentClass={ControlLabel} sm={6}>Gender: </Col>
                                <Col componentClass={ControlLabel} sm={6}>{this.props.pat.gender}</Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <FormGroup controlId="formUserNote">
                    <ControlLabel>User note:</ControlLabel>
                    <p>{this.props.pat.note}</p>
                </FormGroup>
            </fieldset>
        );
        return ( (this.props.pat.id === -1)? newP: editP );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(reducEvidence);