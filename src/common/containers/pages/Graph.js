/* libs import */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Row, Well ,FormControl, Button, FormGroup, ControlLabel, Form } from 'react-bootstrap';
/* import components */
import Chart from '../../components/lineChart';
/* import ws */
import * as ws from '../../services/index';
/* import actions */
import * as ac from '../../actions/index';
/* map functions */
function mapStateToProps(store) { return { meas: store.measurement, sel: store.graph, pat: store.patient.patients }; }
function mapDispatchToProps(dispatch){ return {
    sPat: (p)=>{ dispatch( ac.setPatient(p) ); }, sMeas: (m)=>{ dispatch( ac.setMeasurement(m) ); }
}; }

class Graph extends Component{
    constructor(props){
        super(props);
        this.state = { note: '' };

        this.saveBtn = this.saveBtn.bind(this);
        this.againBtn = this.againBtn.bind(this);
        this.backBtn = this.backBtn.bind(this);
        this.handleNote = this.handleNote.bind(this);
    }
    getLastId(){
        let i = 0;
        let meas = this.props.meas.measurements.filter( e=> e.patId === this.props.sel.pid);
        let ms = meas.map((a)=>a.measId); ms.sort( (a,b) => a-b );
        while ( ms[i] === i ){ i++; } return i;
    }
    getMeas(){
        let meas, m;
        if( this.props.sel.type === 'unsaved'){
            meas = this.props.meas.unsaved.filter( e=> e.patId === this.props.sel.pid && e.date === this.props.sel.date);
            m = { date: meas[0].date, fnote: meas[0].fnote, speed: meas[0].speed, depth: meas[0].depth,
                data: meas[0].data, patId: meas[0].patId, profile: meas[0].profile, indentor: meas[0].indentor};
        } else {
            meas = this.props.meas.measurements.filter( e=> e.patId === this.props.sel.pid && e.measId === this.props.sel.mid);
            m = { date: meas[0].date, fnote: meas[0].fnote, speed: meas[0].speed, depth: meas[0].depth, snote: meas[0].snote,
                data: meas[0].data, patId: meas[0].patId, profile: meas[0].profile, indentor: meas[0].indentor};
        }
        return m;
    }
    createParam(){
        let param;
        if( this.props.sel.type === 'unsaved'){
            param = this.props.meas.unsaved.filter( e=> e.patId === this.props.sel.pid && e.date === this.props.sel.date);
        } else {
            param = this.props.meas.measurements.filter( e=> e.patId === this.props.sel.pid && e.measId === this.props.sel.mid);
        }
        return { note: param[0].fnote, speed: param[0].speed, depth: param[0].depth, profile: param[0].profile };
    }
    createPat(){
        let pat = this.props.pat.filter( e=> e.id === this.props.sel.pid );
        return {id: pat[0].id, name: pat[0].name, lastName: pat[0].lastName, pin: pat[0].pin,
            gender: pat[0].gender, note: pat[0].note};
    }
    saveBtn(){
        let meas = this.getMeas(); delete meas.patId; meas.snote = this.state.note;
        let id = this.getLastId();
        ws.measurementAdd(this.props.sel.pid, id, meas);
    }
    againBtn(){
        this.props.sPat(this.createPat()); this.props.sMeas(this.createParam());
        setTimeout(()=>{ browserHistory.push('/measurement'); }, 200);
    }
    backBtn(){ browserHistory.goBack(); }
    handleNote(event){ this.setState({ note: event.target.value.replace(/>/g, '').replace(/</g, '') }); }

    render(){
        const patient = this.createPat();
        const measData = this.getMeas();
        const g = (
            <Well>
                {this.props.sel.type === 'unsaved' && <legend>Unsaved Measurement</legend>}
                {this.props.sel.type === 'saved' && <legend>Saved Measurement</legend>}
                <p>{patient.lastName} {patient.name} (PIN:{patient.pin})</p>
                <p>{measData.date}</p>
                <p>Params [profile: {measData.profile},speed: {measData.speed},depth: {measData.depth}]</p>
                <div><ControlLabel>First note:</ControlLabel><p>{measData.fnote}</p></div>
                <Chart />
                <Form>
                    {this.props.sel.type === 'saved' &&
                    <div><ControlLabel>Second note:</ControlLabel><p>{measData.snote}</p></div>}
                    {this.props.sel.type === 'unsaved' &&
                    <FormGroup controlId="formUserNote">
                        <ControlLabel>Measurement second note:</ControlLabel>
                        <FormControl componentClass="textarea" value={this.state.note} onChange={this.handleNote}/>
                    </FormGroup> }
                    <Row>
                        {this.props.sel.type === 'unsaved' && <Button onClick={this.saveBtn}>Save</Button>}
                        <Button onClick={this.againBtn}>Again</Button>
                        {this.props.sel.type === 'saved' && <Button onClick={this.backBtn}>Back</Button>}
                    </Row>
                </Form>
            </Well>
        );
        return g;
    }
} export default connect(mapStateToProps, mapDispatchToProps)(Graph);