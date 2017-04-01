/* import libs */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {Panel} from 'react-bootstrap';

export default class NoMatch extends Component{
    render(){
        return (
            <Panel header="Page not found" collapsible defaultExpanded>
                <Link to="/">Back to ...</Link>
            </Panel>
        );
    }
}