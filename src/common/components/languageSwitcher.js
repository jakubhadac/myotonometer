/* import libs */
import React, { Component } from 'react';
import {FormGroup, FormControl, Button, InputGroup} from 'react-bootstrap';

import Lang from '../data/languageData';

export default class languageSwitcher extends Component{
    constructor(props){
        super(props);

        this.changeLang = this.changeLang.bind(this);
        this.changeDefaultLang = this.changeDefaultLang.bind(this);
    }
    changeLang(e){
        let lang = e.target.value;
        Lang.language = lang;
        this.props.changeLanguage( lang );
    }
    changeDefaultLang() {
        Lang.language = 'en';
        this.props.changeLanguage( 'en' );
    }
    render(){
        return (
            <FormGroup controlId="languageControl">
                <InputGroup>
                    <FormControl componentClass="select" value={Lang.language} onChange={this.changeLang}>
                        <option value="cz">Czech</option>
                        <option value="en">English</option>
                    </FormControl>
                    <InputGroup.Button>
                        <Button onClick={this.changeDefaultLang}>Set to default</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }
}