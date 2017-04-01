import React, {Component} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {Panel} from 'react-bootstrap';
/*
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as webSocketActions from './../../actions/webSocket';

function mapStateToProps(state) {
    return {
        chartData: state.chartData
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators( webSocketActions, dispatch) };
}
*/
class Chart extends Component{
    //transfer data to format [[],[]] => [{}, ..., {}]; {} = {pos: , chartA: , chartB: }
    dataTransfer(data){
        if (data.length !== 0){
            let chartData = [];
            for (let index=0; index<Math.max(data[0].length, data[1].length); index++){
                chartData[index] = {pos: index, chartA: data[0][index], chartB: data[1][index]};
            }
            return chartData;
        } else { return []; }
    }
    render(){
        const chartData = this.dataTransfer(this.props.datain);
        const yes = (
            <Panel header="Chart" collapsible defaultExpanded>
                <ResponsiveContainer height={450} widht="95%">
                    <LineChart data={chartData} margin={{top: 20, right: 80, bottom: 20, left: 20}}>
                        <XAxis dataKey="pos" label="Pages" />
                        <YAxis label="Pages" />
                        <CartesianGrid strokeDasharray="6 6"/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey="chartA" stroke="#8884d8" />
                        <Line type="monotone" dataKey="chartB" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </Panel>
        );
        const no = (
            <Panel header="Chart" collapsible defaultExpanded>
                No data
            </Panel>
        );

        const render = (chartData.length !== 0)? yes : no;
        return ( render );
    }
}
export default Chart;
//export default connect(mapStateToProps, mapDispatchToProps)(Chart);