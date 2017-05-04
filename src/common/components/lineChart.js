import React, {Component} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
/* maps functions */
function mapStateToProps(store) { return { meas: store.measurement, sel: store.graph }; }

class Chart extends Component{
    //select unsaved graph
    //transfer data to format [] => [{}, ..., {}]; {} = {pos: , chart: }
    dataTransfer(){
        let meas;
        if (this.props.sel.type === 'unsaved') {
            meas = this.props.meas.unsaved.filter( e=> (e.patId === this.props.sel.pid && e.date === this.props.sel.date) );
        } else if (this.props.sel.type === 'saved'){
            meas = this.props.meas.measurements.filter( e=> (e.patId === this.props.sel.pid && e.measId === this.props.sel.mid) );
        } else { meas = []; }

        if (meas.length !== 0){
            let chartData = [];
            for (let index=0; index<meas[0].data.length; index++){
                chartData[index] = {pos: index, chart: meas[0].data[index]};
            }
            return chartData;
        } else { return []; }
    }
    render(){
        const chartData = this.dataTransfer();
        const yes = (
            <ResponsiveContainer height={450} widht="95%">
                <LineChart data={chartData} margin={{top: 20, right: 80, bottom: 20, left: 20}}>
                    <XAxis dataKey="pos" label="Samples" />
                    <YAxis label="P [kPa]" />
                    <CartesianGrid strokeDasharray="8 8"/>
                    <Line type="monotone" dataKey="chart" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        );
        const no = (
            <div>
                No data ...
            </div>
        );
        const render = (chartData.length !== 0)? yes : no;
        return ( render );
    }
} export default connect(mapStateToProps)(Chart);