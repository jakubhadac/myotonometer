/* import libs */
import React, {Component} from 'react';
import { Table, Well, Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
/* import actions */
import * as ac from '../../actions/index';
/* map functions */
function mapStateToProps(store) { return { un: store.measurement.unsaved, pat: store.patient.patients }; }
function mapDispatchToProps(dispatch){ return {
    sUn: (pid, date)=>{ dispatch( ac.editUnGraph(pid, date) ); }, dUn: (pid, date)=>{ dispatch( ac.removeUnMeasurement(pid, date) ); }
}; }
class MeasUnsaved extends Component{
    constructor(){
        super();
        this.showBtn = this.showBtn.bind(this); this.deleteBtn = this.deleteBtn.bind(this);
        this.findPat = this.findPat.bind(this); this.createObj = this.createObj.bind(this);}
    findPat(id){
        let ps = this.props.pat.filter( p => (p.id === id) );
        return ps[0];
    }
    createObj(){
        let meas = [], i=0;
        this.props.un.forEach( u => {
            let pat = this.findPat(u.patId);
            let k = { date: u.date, fnote: u.fnote, patId: u.patId, name: pat.lastName+' '+pat.name, pos: i };
            i++;
            meas.push(k);
        });
        return meas;
    }
    deleteBtn(val){ this.props.dUn(this.props.un[val].patId, this.props.un[val].date); }
    showBtn(val){
        this.props.sUn(this.props.un[val].patId, this.props.un[val].date);
        setTimeout(()=>{ browserHistory.push('/g'); }, 500);
    }
    render(){
        const unsaved = this.createObj();
        return (
            <Well>
                <fieldset>
                    <legend>Unsaved Measurement</legend>
                    <p>Unsaved Meas. will be lost after logout.</p>
                    {this.props.un.length === 0 && <p> You have 0 unsaved measurement </p>}
                    {this.props.un.length > 0 &&
                    <Table responsive>
                        <thead>
                            <tr><th>Date</th><th>Note</th><th>Patient</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                        {
                            unsaved.map((u)=>{
                                return (
                                    <tr key={u.date+u.patId.toString()}>
                                        <td>{u.date}</td>
                                        <td>{u.fnote}</td>
                                        <td>{u.name}</td>
                                        <td>
                                            <Button bsSize="small" onClick={(event) => this.showBtn(u.pos)}>Show</Button>
                                            <Button bsSize="small" onClick={(event) => this.deleteBtn(u.pos)}>Remove</Button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </Table>
                    }
                </fieldset>
            </Well>
        );
    }
} export default connect(mapStateToProps, mapDispatchToProps)(MeasUnsaved) ;