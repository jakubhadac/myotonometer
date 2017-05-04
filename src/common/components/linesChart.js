/* libs import */
import React, {Component} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { connect } from 'react-redux';

/* map functions */
function mapStateToProps(store) { return { unit: store.settings.unit, meas: store.measurement, pid: store.patient.id }; }

class Chart extends Component{
    //transfer data to format [[],[]] => [{}, ..., {}]; {} = {pos: , chartA: , chartB: }
    createData(){
        let measA = {}, measB={}, chartData = [];
        this.props.meas.measurements.forEach( k =>{
            if (k.patId === this.props.pid && k.measId === this.props.meas.compA) measA = k;
            if (k.patId === this.props.pid && k.measId === this.props.meas.compB) measB = k;
        });
        for (let index=0; index<Math.max(measA.data.length, measB.data.length); index++){
            chartData[index] = {pos: index, chartA: measA.data[index], chartB: measB.data[index]};
        }
        return chartData;
    }
    render(){
        const chartData = this.createData();
        return (
            <ResponsiveContainer height={450} widht="95%">
                <LineChart data={chartData} margin={ {top: 20, right: 80, bottom: 20, left: 20} }>
                    <XAxis dataKey="pos" label="Samples" />
                    <YAxis label="P [kPa]" />
                    <CartesianGrid strokeDasharray="8 8"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="chartA" stroke="#8884d8" />
                    <Line type="monotone" dataKey="chartB" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
export default connect(mapStateToProps)(Chart);