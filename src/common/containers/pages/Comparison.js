/* import libs */
import React, {Component} from 'react';
/* import components */
import Chart from '../../components/linesChart';
import Select from '../../components/multiSelect';
/* import data */
//import {language} from '../data/languageData';

export default class Comparison extends Component{
    constructor(props){
        super(props);
        this.state = { values: {valueA: '', valueB: ''}, chartData: [], meas: []};

        this.getSelectGraphs = this.getSelectGraphs.bind(this);
    }
    // componentDidMount() {
    //     socket.on('comparison:failure', (data) => this.getErrorMsg(data));
    //     socket.on('comparison:success', (data) => this.getGraphsData(data));
    // }
    // getErrorMsg(data){ console.log(data.errorMsg); }
    // getGraphsData(data){ this.setState({chartData: data.graphs}); }
    getSelectGraphs(data){ /*socket.emit('comparison', {profileA: data.selectA, profileB: data.selectB});*/ }
    render(){
        const withoutG = ( <div> <Select datain={this.state.meas} dataout={this.getSelectGraphs}/> </div> );
        const withG = ( <div> <Select datain={this.state.meas} dataout={this.getSelectGraphs}/> <Chart datain={this.state.chartData}/> </div> );

        const render = (this.state.chartData.length !== 0)? withG : withoutG;
        return ( render );
    }
};