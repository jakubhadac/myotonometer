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
                    <li>Ready for: add/remove/edit measurement</li>
                    <li>SIM: status= &#123; 0, 1, 2 &#125;
                        <ul>
                            <li>0: Waiting for new measurement</li>
                            <li>1: Press start btn (<a target="_blank" href="http://mtrsim.herokuapp.com/">start btn</a>)</li>
                            <li>2: Measurement in progress...</li>
                        </ul>
                    </li>
                </ul>
            </Well>
        );
    }
};