/* import libs */
import React, {Component} from 'react';
import { Well } from 'react-bootstrap';

export default class Home extends Component{
    render(){
        return (
            <Well>
                <h1>Info:</h1>
                <ul>
                    <li>React + react-bootstrap ... OK</li>
                    <li>add/remove/edit patient ... OK</li>
                    <li>Ready for: add/remove/edit patient</li>
                </ul>
            </Well>
        );
    }
};