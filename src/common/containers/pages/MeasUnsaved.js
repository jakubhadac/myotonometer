/* import libs */
import React, {Component} from 'react';
import {Table, Well, Button} from 'react-bootstrap';
/* import components */

export default class MeasUnsaved extends Component{
    constructor(props){
        super(props);
        this.state = {error: 'error'};
    }
    componentDidMount(){}
    render(){
        return (
            <Well>
                <fieldset>
                    <legend>Unsaved Measurement</legend>
                    <p>Unsaved Meas. will be lost after logout.</p>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr><th>#</th><th>Meas ID</th><th>User ID</th><th></th></tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td><a>123456</a></td>
                            <td>645448</td>
                            <td><Button>Show</Button><Button>Save</Button><Button>Delete</Button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><a>154546</a></td>
                            <td>645448</td>
                            <td><Button>Show</Button><Button>Save</Button><Button>Delete</Button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td><a>588214</a></td>
                            <td>441154</td>
                            <td><Button>Show</Button><Button>Save</Button><Button>Delete</Button></td>
                        </tr>
                        </tbody>
                    </Table>
                </fieldset>
            </Well>
        );
    }
};