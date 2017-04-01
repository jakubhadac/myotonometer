import React, {Component} from 'react';
import {Panel, Button, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

export default class singleSelect extends Component{
    constructor(props){
        super(props);
        this.state = { valueA: 0, valueB: 0, name: '', next: false, canApply: false, canSave: false};

        this.hClickApply = this.hClickApply.bind(this);
        this.hClickSave = this.hClickSave.bind(this);
        this.hValueA = this.hValueA.bind(this);
        this.hValueB = this.hValueB.bind(this);
        this.hName = this.hName.bind(this);
    }
    hValueA(e){
        let val = e.target.value;
        this.setState({valueA: val, next: true});
    }
    hValueB(e){
        let val = e.target.value;
        if (this.state.next) this.setState({valueB: val, canApply: true});
    }
    hName(e){
        let val = e.target.value;
        if (val !== '') this.setState({name: val, canSave: true});
        else this.setState({canSave: false})
    }
    hClickApply(){
        if (this.state.canApply) this.props.dataout({
            valueA: this.state.valueA,
            valueB: this.state.valueB
        });
    }
    hClickSave(){
        if (this.state.canSave) this.props.profil({
            name: this.state.name,
            valueA: this.state.valueA,
            valueB: this.state.valueB
        });
    }
    render(){
        const value = (
            <Panel header="New" collapsible defaultExpanded>
                <Col sm={9}>
                    <FormGroup controlId="formHorizontalValueA">
                        <Col componentClass={ControlLabel} sm={2}>ValueA*</Col>
                        <Col sm={10}>
                            <FormControl type="number" min="0" max="10" step="1" value={this.state.valueA} onChange={this.hValueA}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalValueB">
                        <Col componentClass={ControlLabel} sm={2}>ValueB*</Col>
                        <Col sm={10}>
                            <FormControl type="number" min="0" max="10" step="1" value={this.state.valueB} onChange={this.hValueB}/>
                        </Col>
                    </FormGroup>
                </Col>
            </Panel>
        );
        const apply = (
            <Panel header="New" collapsible defaultExpanded>
                <Col sm={9}>
                    <FormGroup controlId="formHorizontalValueA">
                        <Col componentClass={ControlLabel} sm={2}>ValueA*</Col>
                        <Col sm={10}>
                            <FormControl type="number" min="0" max="10" step="1" value={this.state.valueA} onChange={this.hValueA}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalValueB">
                        <Col componentClass={ControlLabel} sm={2}>ValueB*</Col>
                        <Col sm={10}>
                            <FormControl type="number" min="0" max="10" step="1" value={this.state.valueB} onChange={this.hValueB}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalValueB">
                        <Col componentClass={ControlLabel} sm={2}>name</Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="nameOfMeas" value={this.state.name} onChange={this.hName}/>
                        </Col>
                    </FormGroup>
                </Col>
                <Col sm={3}>
                    <FormGroup>
                        <Col smOffset={2}>
                            <Button bsStyle="success" onClick={this.hClickApply} block>Apply</Button>
                        </Col>
                    </FormGroup>
                </Col>
            </Panel>
        );
        const save = (
            <Panel header="New" collapsible defaultExpanded>
                <Col sm={9}>
                    <FormGroup controlId="formHorizontalValueA">
                        <Col componentClass={ControlLabel} sm={2}>ValueA*</Col>
                        <Col sm={10}>
                            <FormControl type="number" min="0" max="10" step="1" value={this.state.valueA} onChange={this.hValueA}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalValueB">
                        <Col componentClass={ControlLabel} sm={2}>ValueB*</Col>
                        <Col sm={10}>
                            <FormControl type="number" min="0" max="10" step="1" value={this.state.valueB} onChange={this.hValueB}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalValueB">
                        <Col componentClass={ControlLabel} sm={2}>name</Col>
                        <Col sm={10}>
                            <FormControl type="text" value={this.state.name} onChange={this.hName}/>
                        </Col>
                    </FormGroup>
                </Col>
                <Col sm={3}>
                    <FormGroup>
                        <Col smOffset={2}>
                            <Button bsStyle="success" onClick={this.hClickApply} block>Apply</Button>
                            <Button bsStyle="success" onClick={this.hClickSave} block>Save</Button>
                        </Col>
                    </FormGroup>
                </Col>
            </Panel>
        );
        let r = (this.state.canApply)? apply : value;

        const render = (this.state.canSave)? save : r;
        return ( render );
    }
};