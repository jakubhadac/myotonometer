import React, {Component} from 'react';
import {Panel, Button, FormControl, Col, Row} from 'react-bootstrap';

export default class singleSelect extends Component{
    constructor(props){
        super(props);
        this.state = { select: 'freeposition', canApply: false };

        this.hClick = this.hClick.bind(this);
        this.hSelect = this.hSelect.bind(this);
    }
    hSelect(e){
        let val = e.target.value;
        if (val === "freeposition") this.setState({select: val, canApply: false});
        else this.setState({select: val, canApply: true});
    }
    hClick(){ if (this.state.canApply) this.props.dataout(this.state.select); }
    render(){
        const sWithout = (
            <Panel header="Profile" collapsible defaultExpanded>
                <Row>
                    <Col sm={8}>
                        <FormControl componentClass="select" onChange={this.hSelect}>
                            <option key='freeposition' value='freeposition'> </option>
                            {this.props.datain.map(function(meas){
                                return <option key={meas} value={meas}>{meas}</option>
                            })}
                        </FormControl>
                    </Col>
                </Row>
            </Panel>
        );
        const sWith = (
            <Panel header="Profile" collapsible defaultExpanded>
                <Row>
                    <Col sm={8}>
                        <FormControl componentClass="select" onChange={this.hSelect}>
                            <option key='freeposition' value='freeposition'> </option>
                            {this.props.datain.map(function(meas){
                                return <option key={meas} value={meas}>{meas}</option>
                            })}
                        </FormControl>
                    </Col>
                    <Col sm={4}> <Button bsStyle="success" onClick={this.hClick} block>Apply</Button> </Col>
                </Row>
            </Panel>
        );
        const empty = (
            <Panel header="Profile" collapsible defaultExpanded>
                You havent save any profile....
            </Panel>
        );
        let r = (this.state.canApply)? sWith : sWithout;

        const render = (this.props.datain.length <= 1)? empty : r;
        return ( render );
    }
};