/* import libs */
import React, {Component} from 'react';
import { Well } from 'react-bootstrap';
import { connect } from 'react-redux';
/* import components */
import Evid from '../../components/evidPat';
import Meas from '../../components/evidMeas';
/* map functions */
function mapStateToProps(store) { return { id: store.patient.id }; }

class Evidence extends Component{
    render(){
        const a = ( <Well> <Evid /> </Well>);
        const b = ( <Well> <Evid /> <Meas /> </Well>);
        return (this.props.id === -1)? a: b;
    }
}
export default connect(mapStateToProps)(Evidence);