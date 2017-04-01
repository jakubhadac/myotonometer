/* import libss */
import React, { Component } from 'react';
import {Grid } from 'react-bootstrap';
/* import components */
import NavigationBar from '../components/navigation';

export default class App extends Component{
    render(){
        return (
            <Grid bsClass="container">
                <NavigationBar />
                {this.props.children}{/*{Component} this.props.children => Dependency injection*/}
            </Grid>
        );
    }
}