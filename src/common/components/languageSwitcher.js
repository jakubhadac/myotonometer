/* import libs */
import React, { Component } from 'react';
import { Col, Row, FormControl, FormGroup, ControlLabel, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
/* import actions */
import { changeLanguage } from '../actions/index';
/* map functions */
function mapStateToProps(store) { return { language: store.settings.language }; }
function mapDispatchToProps(dispatch){ return { changeLang: (lang)=>{ dispatch(changeLanguage(lang)) } } }

class LanguageSwitcher extends Component{
    constructor(props){
        super(props);
        this.changeL = this.changeL.bind(this);
    }
    changeL(e){ this.props.changeLang(e.target.value); }
    render(){
        return (
            <Row>
                <Col sm={6}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalLang">
                            <Col componentClass={ControlLabel} sm={6}> Language: </Col>
                            <Col sm={6}>
                                <FormControl componentClass="select" value={this.props.language} onChange={this.changeL}>
                                    <option value="cz">Czech</option>
                                    <option value="en">English</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        );
    }
} export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);