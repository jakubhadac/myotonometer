import React, {Component} from 'react';
import {Panel, Button, FormGroup, FormControl, Col, ControlLabel, Row} from 'react-bootstrap';


export default class MultiSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectA: 'freeposition', selectB: 'freeposition',
            isSelectA: false, isSelectB: false, canBeApply: false,
        };
        this.hClick = this.hClick.bind(this);
        this.hSelectA = this.hSelectA.bind(this);
        this.hSelectB = this.hSelectB.bind(this);
    }
    hSelectA(e){
        let val = e.target.value;
        if (val === "freeposition") this.setState({selectA: val, isSelectA: false, canBeApply: false});
        else this.setState({selectA: val, isSelectA: true});
    }
    hSelectB(e){
        let val = e.target.value;
        if (val !== "freeposition") this.setState({selectB: val, isSelectB: true, canBeApply: true});
        else this.setState({selectB: val, isSelectB: false, canBeApply: false});
    }
    hClick(){
        if (this.state.canBeApply) this.props.dataout(
                {
                    selectA: this.state.selectA,
                    selectB: this.state.selectB
                }
            )
    }
    render(){
        let selA = (this.state.isSelectB)? this.props.datain.filter(e => e !== this.state.selectB) : this.props.datain;
        let selB = (this.state.isSelectA)? this.props.datain.filter(e => e !== this.state.selectA) : this.props.datain;
        const fSelect = (
            <Panel header="Select Comparison Graphs" collapsible defaultExpanded>
                <FormGroup controlId="comparisonSelect">
                    <Row>
                        <Col componentClass={ControlLabel} sm={5}> GraphA </Col>
                    </Row>
                    <Row>
                        <Col sm={5}>
                            <FormControl componentClass="select" defaultValue={this.state.selectA} onChange={this.hSelectA}>
                                <option key='freeposition' value='freeposition'> </option>
                                {
                                    selA.map(function(meas){
                                        return <option key={meas} value={meas}>{meas}</option>
                                    })
                                }
                            </FormControl>
                        </Col>
                    </Row>
                </FormGroup>
            </Panel>
        );
        const sSelect = (
            <Panel header="Select Comparison Graphs" collapsible defaultExpanded>
                <FormGroup controlId="comparisonSelect">
                    <Row>
                        <Col componentClass={ControlLabel} sm={5}> GraphA </Col>
                        <Col componentClass={ControlLabel} sm={5}> GraphB </Col>
                    </Row>
                    <Row>
                        <Col sm={5}>
                            <FormControl componentClass="select" defaultValue={this.state.selectA} onChange={this.hSelectA}>
                                <option key='freeposition' value='freeposition'> </option>
                                {
                                    selA.map(function(meas){
                                        return <option key={meas} value={meas}>{meas}</option>
                                    })
                                }
                            </FormControl>
                        </Col>
                        <Col sm={5}>
                            <FormControl componentClass="select" defaultValue={this.state.selectB} onChange={this.hSelectB}>
                                <option key='freeposition' value='freeposition'> </option>
                                {
                                    selB.map(function(meas){
                                        return <option key={meas} value={meas}>{meas}</option>
                                    })
                                }
                            </FormControl>
                        </Col>
                    </Row>
                </FormGroup>
            </Panel>
        );
        const finalSelect = (
            <Panel header="Select Comparison Graphs" collapsible defaultExpanded>
                <FormGroup controlId="comparisonSelect">
                    <Row>
                        <Col componentClass={ControlLabel} sm={5}> GraphA </Col>
                        <Col componentClass={ControlLabel} sm={5}> GraphB </Col>
                        <Col componentClass={ControlLabel} sm={2}> </Col>
                    </Row>
                    <Row>
                        <Col sm={5}>
                            <FormControl componentClass="select" defaultValue={this.state.selectA} onChange={this.hSelectA}>
                                <option key='freeposition' value='freeposition'> </option>
                                {
                                    selA.map(function(meas){
                                        return <option key={meas} value={meas}>{meas}</option>
                                    })
                                }
                            </FormControl>
                        </Col>
                        <Col sm={5}>
                            <FormControl componentClass="select" defaultValue={this.state.selectB} onChange={this.hSelectB}>
                                <option key='freeposition' value='freeposition'> </option>
                                {
                                    selB.map(function(meas){
                                        return <option key={meas} value={meas}>{meas}</option>
                                    })
                                }
                            </FormControl>
                        </Col>
                        <Col sm={2}><Button bsStyle="success" onClick={this.hClick} block>Apply</Button></Col>
                    </Row>
                </FormGroup>
            </Panel>
        );
        const empty = (
            <Panel header="Select Comparison Graphs" collapsible defaultExpanded>
                You cant....
            </Panel>
        );
        let r = fSelect;
        if (this.state.isSelectA) { r = sSelect;
            if(this.state.isSelectB){ r = finalSelect; }
        }
        const render = (this.props.datain.length <= 1)? empty : r;
        return ( render );
    }
};