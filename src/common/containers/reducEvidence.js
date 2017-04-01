/* import libs */
import React, {Component} from 'react';
import {Col, Row, FormControl, Button, FormGroup, ControlLabel, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
/* import ws */
import * as ws from '../services/index';
/* map functions */
function mapStateToProps(store) { return { errorP: store.patient.error, patients: store.patient.patients }; }

class reducEvidence extends Component{
    constructor(){
        super();
        this.state = {id: 'new', name: '', lastName: '', pin: '', gender: 'male', note: '', error: ''};

        this.handlePatientId = this.handlePatientId.bind(this);
        this.handlePatientLastName = this.handlePatientLastName.bind(this);
        this.handlePatientName = this.handlePatientName.bind(this);
        this.handlePatientPin = this.handlePatientPin.bind(this);
        this.handlePatientGander = this.handlePatientGander.bind(this);
        this.handlePatientNote = this.handlePatientNote.bind(this);

        this.btnSave = this.btnSave.bind(this);
    }
    /* ... functions */
    resetState(){ this.setState({id: 'new', lastName: '', name: '', pin: '', gender: 'male', note: '', error: ''}); }
    getLastId(){
        let i = 0, patients = this.props.patients;
        while(patients[i] !== undefined){ i++; }
        return i;
    }
    createPatient(){
        return { note: this.state.note, lastName: this.state.lastName, name: this.state.name,
            gender: this.state.gender, pin: this.state.pin };
    }
    checkValues(){ return (this.state.error === ''); }
    checkName(){ if(this.state.name === '') this.setState({error: 'Name must be...'}); else this.setState({error: ''}); }
    checkLastName(){ if(this.state.lastName === '') this.setState({error: 'Last name must be...'}); else this.setState({error: ''}); }
    checkPin(){ if(this.state.pin.length !== 10) this.setState({error: 'Pin mus have 10numbers'}); else this.setState({error: ''}); }
    /* handle functions */
    handlePatientId(event){
        let value = event.target.value;
        if(this.checkValues()){
            if(value !== 'new'){
                let patients = this.props.patients;
                let index = patients.findIndex(item => item.id === parseInt(value, 10));
                if (index !== -1) {
                    let p = patients[index];
                    this.setState({id: value, lastName: p.lastName, pin: p.pin, name: p.name, gender: p.gender, note: p.note });
                } //else { this.setState({error: 'Patient not found > select patient again'}); }
            } else { this.resetState(); }
        }
    }
    handlePatientLastName(event){ this.checkLastName(); this.setState({ lastName: event.target.value }); }
    handlePatientName(event){ this.checkName(); this.setState({ name: event.target.value }); }
    handlePatientPin(event){ this.checkPin(); this.setState({ pin: event.target.value }); }
    handlePatientGander(event){ this.setState({ gender: event.target.value }); }
    handlePatientNote(event){ this.setState({ note: event.target.value }); }
    /* user functions */
    btnSave(){
        let p = this.createPatient(), i = this.getLastId();
        if(this.state.id === 'new' && this.checkValues()) { ws.patientAdd(i, p); }
    }
    /* render */
    render(){
        const newP = (
            <fieldset>
                <legend>Personal Data</legend>
                <Row>
                    <Col sm={6}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalID">
                                <Col componentClass={ControlLabel} sm={6}>ID: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="select" value={this.state.id} onChange={this.handlePatientId}>
                                        <option value='new' key='new' >New Patient</option>
                                        {
                                            this.props.patients.map(function(patient){
                                                return <option key={patient.id} value={patient.id}>
                                                    ({patient.id}): {patient.lastName} {patient.name}</option>
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
                                                 value={this.state.lastName} onChange={this.handlePatientLastName}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPenetrationPersonalIN">
                                <Col componentClass={ControlLabel} sm={6}>Personal IN: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="input" type="number"
                                                 value={this.state.pin} onChange={this.handlePatientPin}/>
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
                                                 value={this.state.name} onChange={this.handlePatientName}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalGender">
                                <Col componentClass={ControlLabel} sm={6}>Gender: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="select" value={this.state.gender} onChange={this.handlePatientGander}>
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
                    <FormControl componentClass="textarea" value={this.state.note} onChange={this.handlePatientNote}/>
                </FormGroup>
                <Row>
                    <Col sm={9}>
                        <ControlLabel>Errors: {this.props.errorP}{this.state.error}</ControlLabel>
                    </Col>
                    <Col sm={3}>
                        <Button className="pull-right" onClick={this.btnSave}>Save</Button>
                    </Col>
                </Row>
            </fieldset>
        );
        const editP = (
            <fieldset>
                <legend>Personal Data</legend>
                <Row>
                    <Col sm={6}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalID">
                                <Col componentClass={ControlLabel} sm={6}>ID: </Col>
                                <Col sm={6}>
                                    <FormControl componentClass="select" value={this.state.id} onChange={this.handlePatientId}>
                                        <option value='new' key='new' >New Patient</option>
                                        {
                                            this.props.patients.map(function(patient){
                                                return <option key={patient.id} value={patient.id}>
                                                    ({patient.id}): {patient.lastName} {patient.name}</option>
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
                                <Col componentClass={ControlLabel} sm={6}>{this.state.lastName}</Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPenetrationPersonalIN">
                                <Col componentClass={ControlLabel} sm={6}>Personal IN: </Col>
                                <Col sm={6} componentClass={ControlLabel}>{this.state.pin}</Col>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col sm={6}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalName">
                                <Col componentClass={ControlLabel} sm={6}>Name: </Col>
                                <Col componentClass={ControlLabel} sm={6}>{this.state.name}</Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalGender">
                                <Col componentClass={ControlLabel} sm={6}>Gender: </Col>
                                <Col componentClass={ControlLabel} sm={6}>{this.state.gender}</Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <FormGroup controlId="formUserNote">
                    <ControlLabel>User note:</ControlLabel>
                    <p>{this.state.note}</p>
                </FormGroup>
            </fieldset>
        );
        return ( (this.state.id === 'new')? newP: editP );
    }
}
export default connect(mapStateToProps)(reducEvidence);