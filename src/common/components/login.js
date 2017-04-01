import React, {Component} from 'react';
import {Well, Button, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

export default class singleSelect extends Component{
    constructor(props){
        super(props);
        this.state = {username: '', pass: '', can: false, canLogin: false};
        this.clickLogin = this.clickLogin.bind(this);
        this.hName = this.hName.bind(this);
        this.hPass = this.hPass.bind(this);
    }
    clickLogin(){
        if (this.state.canLogin && this.state.can) {
            this.props.dataout({username: this.state.username, pass: this.state.pass});
        }else {console.log('...');}
    }
    hName(e){
        let val = e.target.value;
        if (val !== '') this.setState({username: val, can: true});
        else this.setState({can: false});
    }
    hPass(e){
        let val = e.target.value;
        if (val !== '') this.setState({pass: val, canLogin: true});
        else this.setState({canLogin: false});
    }
    render(){
        return(
            <Well>
                <fieldset>
                    <legend>Login</legend>
                    <FormGroup controlId="formHorizontalUsername">
                        <Col componentClass={ControlLabel} sm={2}>Username</Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Username" value={this.state.username} onChange={this.hName}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPass">
                        <Col componentClass={ControlLabel} sm={2}>Password</Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" value={this.state.pass} onChange={this.hPass}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontallog">
                        <Col sm={2}></Col>
                        <Col sm={10}> <Button bsStyle="success" onClick={this.clickLogin} block> Login </Button> </Col>
                    </FormGroup>
                </fieldset>
            </Well>
        );
    }
};