/* import libs */
/* import libs */
import React, { Component } from 'react';
import { Col, Row, FormControl, FormGroup, ControlLabel, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
/* import actions */
import * as ac from '../actions/index';
/* map functions */
function mapStateToProps(store) { return { pat: store.patient }; }
function mapDispatchToProps(dispatch){ return {
    eId: (id)=>{ dispatch( ac.editPatientId(id) ); }, eLName: (lName)=>{ dispatch( ac.editPatientLastName(lName) ); },
    eName: (name)=>{ dispatch( ac.editPatientName(name) ); }, ePin: (pin)=>{ dispatch( ac.editPatientPin(pin) ); },
    eGender: (gen)=>{ dispatch( ac.editPatientGender(gen) ); }, eNote: (note)=>{ dispatch( ac.editPatientNote(note) ); },
    rPat: ()=>{ dispatch( ac.patientReset() ); }, rStatus: ()=>{ dispatch( ac.patientStatusReset() ); },
    eStat: (msg)=>{ dispatch( ac.patientStatus(msg) ); }
}; }

class PatSelect extends Component {
    constructor(props){
        super(props);
        this.handleId = this.handleId.bind(this);
    }
    /* handle functions */
    handleId(event){
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
    /* render */
    render(){
        return (
            <Row>
                <Col sm={6}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalID">
                            <Col componentClass={ControlLabel} sm={6}> Patient: </Col>
                            <Col sm={6}>
                                <FormControl componentClass="select" value={this.props.pat.id} onChange={this.handleId}>
                                    <option key='-1' value='-1'></option>
                                    {
                                        this.props.pat.patients.map(function(patient){
                                            return <option key={patient.id} value={patient.id}>
                                            {patient.lastName} {patient.name} - ({patient.pin})</option>
                                        })
                                    }
                                </FormControl>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PatSelect);