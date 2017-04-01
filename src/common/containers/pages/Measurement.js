/* import libs */
import React, {Component} from 'react';
import {Col, Row, Well, FormControl, Button, FormGroup, ControlLabel, Form} from 'react-bootstrap';
/* import components */
import Revidence from '../reducEvidence';

export default class Measurement extends Component{
    render(){
        return (
            <Well>
                <Revidence ></Revidence>
                <fieldset>
                    <legend>Measurement Parameters</legend>
                    <Row>
                        <Col sm={6}>
                            <Form horizontal>
                                <FormGroup controlId="formHorizontalProfile">
                                    <Col componentClass={ControlLabel} sm={6}>Profile: </Col>
                                    <Col sm={6}>
                                        <FormControl componentClass="select">
                                            <option value='defProfile'>Def. profile</option>
                                        </FormControl>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalSpeed">
                                    <Col componentClass={ControlLabel} sm={6}>Speed [nm/s]: </Col>
                                    <Col sm={6}>
                                        <FormControl componentClass="input" type="number" />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPenetrationDepth">
                                    <Col componentClass={ControlLabel} sm={6}>Penetration depth [nm]: </Col>
                                    <Col sm={6}>
                                        <FormControl componentClass="input" type="number" />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col sm={6}>
                            <Form horizontal>
                                <FormGroup controlId="formHorizontalMeasTime">
                                    <Col componentClass={ControlLabel} sm={6}>Meas time [s]: </Col>
                                    <Col sm={6}>
                                        <FormControl componentClass="input" type="number" disabled/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalForceLimit">
                                    <Col componentClass={ControlLabel} sm={6}>Force limit [N]: </Col>
                                    <Col sm={6}>
                                        <FormControl componentClass="input" type="number" disabled/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPenetrationUsedIndentor">
                                    <Col componentClass={ControlLabel} sm={6}>Used indentor: </Col>
                                    <Col sm={6}>
                                        <FormControl componentClass="input" type="text" disabled/>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <FormGroup controlId="formMeasurementNote">
                        <ControlLabel>Measurement note:</ControlLabel>
                        <FormControl componentClass="textarea" />
                    </FormGroup>
                    <Row>
                        <Col sm={9}>
                            <ControlLabel>Status: </ControlLabel>
                        </Col>
                        <Col sm={3}>
                            <Button className="pull-right">Start</Button>
                            <Button className="pull-right">Start with Btn</Button>
                        </Col>
                    </Row>
                </fieldset>
            </Well>
        );
    }
};