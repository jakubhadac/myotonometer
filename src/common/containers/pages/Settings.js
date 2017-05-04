/* import libs */
import React, {Component} from 'react';
import {Col, Row, Well, FormControl, Checkbox, Button, ControlLabel} from 'react-bootstrap';
/* import components */
import Lang from '../../components/languageSwitcher';


class Settings extends Component{
    render(){
        return (
            <Well>
                <fieldset>
                    <legend>Web interface</legend>
                    <Lang />
                </fieldset>
                <fieldset>
                    <legend>Measurement Parameters</legend>
                    <h3> Defaults </h3>
                    <Row>
                        <Col componentClass={ControlLabel} sm={3}>Speed (1 - 10 mm/s): </Col>
                        <Col sm={7}>
                            <FormControl componentClass="input" type="range" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>1 nm/s</Col>
                    </Row>
                    <Row>
                        <Col componentClass={ControlLabel} sm={3}>Penetration depth (1 - 30 mm): </Col>
                        <Col sm={7}>
                            <FormControl componentClass="input" type="range" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>1 mm</Col>
                    </Row>
                    Limits:
                    <Row>
                        <Col componentClass={ControlLabel} sm={3}>Max achievable force (1 - 50 N): </Col>
                        <Col sm={7}>
                            <FormControl componentClass="input" type="range" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>30 N</Col>
                    </Row>
                    <Row>
                        <Col componentClass={ControlLabel} sm={3}>Max speed (1 - 10 mm/s): </Col>
                        <Col sm={7}>
                            <FormControl componentClass="input" type="range" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>10 mm/s</Col>
                    </Row>
                    <Row>
                        <Col componentClass={ControlLabel} sm={3}>Max penetration depth (1 - 50 mm): </Col>
                        <Col sm={7}>
                            <FormControl componentClass="input" type="range" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>30 mm</Col>
                    </Row>
                    <Row>
                        <Col componentClass={ControlLabel} sm={2}>Used indentor: </Col>
                        <Col sm={10}>
                            <FormControl componentClass="select">
                                <optgroup label="Spherical">
                                    <option value="S4">S4 (25,1 mm2)</option>
                                    <option value="S6">S6 (56,5 mm2)</option>
                                    <option value="S8">S8 (100,5 mm2)</option>
                                    <option value="S14">S14 (307,9 mm2)</option>
                                    <option value="S18">S18 (508,9 mm2)</option>
                                    <option value="S21">S21 (692,7 mm2)</option>
                                    <option value="S24">S24 (904,8 mm2)</option>
                                </optgroup>
                                <optgroup label="Cylindrical">
                                    <option value="C4">C4 (12,6 mm2)</option>
                                    <option value="C6">C6 (28,3 mm2)</option>
                                    <option value="C8">C8 (50,3 mm2)</option>
                                    <option value="C14">C14 (153,9 mm2)</option>
                                    <option value="C18">C18 (254,5 mm2)</option>
                                    <option value="C21">C21 (346,4 mm2)</option>
                                    <option value="C24">C24 (452,4 mm2)</option>
                                </optgroup>
                            </FormControl>
                        </Col>
                    </Row>
                    <Row>
                        <Checkbox>Show force [mN] in chart istead of calculated pressure [kPa].</Checkbox>
                    </Row>
                </fieldset>
                <fieldset>
                    <legend>Unix</legend>
                    <Row>
                        <Col componentClass={ControlLabel} sm={2}>System hostname: </Col>
                        <Col sm={10}>
                            <FormControl componentClass="input" type="text" />
                        </Col>
                    </Row>
                    <Row>
                        <Col componentClass={ControlLabel} sm={5}>Click here for invoking dhclient on eth0: </Col>
                        <Col sm={7}>
                            <Button bsSize="small" >DHCLIENT ETH0</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col componentClass={ControlLabel} sm={5}>Click here for rebooting the system: </Col>
                        <Col sm={7}>
                            <Button bsSize="small" >REBOOT</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col componentClass={ControlLabel} sm={5}>Click here for turning the system off: </Col>
                        <Col sm={7}>
                            <Button bsSize="small" >TURN OFF</Button>
                        </Col>
                    </Row>
                </fieldset>
                <Button block>Save settings</Button>
            </Well>
        );
    }
} export default Settings;