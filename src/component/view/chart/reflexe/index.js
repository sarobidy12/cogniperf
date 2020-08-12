import React , { Component } from 'react';
import {Line } from 'react-chartjs-2';
import axios from 'axios';

const options = {
      legend: {
        display: false
    },
    pointStyle:'crossRot',
    scales: {

         xAxes: [{
            type: 'linear',
           position: 'bottom',
            ticks: {
                callback: function(value, index, values) {
                    return  value+' ms';
                },
              min: 0,
              max: 120,
              stepSize: 10
            }
          }],
          yAxes: [{
              display: false,
              ticks: {
                callback: function(value) {return ((value % 10) == 0)? value : ''},
                // min: 0,
                // max: 50,
                stepSize: 1
              }
          }]
        }
}

const styles= {
    graphContainer :{
        padding: '15px'
    }
}
class ChartReflexe extends Component {

    constructor(props){
        super(props);
        this.state={
            data: {
            labels:null,
            datasets:[
                {
                    data :  null,
                    label: "My First dataset",
                  //  lineTension: 0.1,
                    backgroundColor: "rgba(0, 139, 139, 0.3)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                }
            ]
        },
        line:0
        }



    }

    componentDidMount=()=>{
        this.getChart();
    }

    getChart=()=>{
        let formData= new FormData();
        formData.append("text","ko")
        const url= 'https://www.cogniperf.com/api/chart_reflexe.php';
        axios.post(url,formData)
        .then((res)=>{
            this.state.data.datasets[0].data=res.data;
            this.setState({line:1})
        })

    }

    line=()=>{

        if(this.state.line == 1){
            return   <Line
                        data={this.state.data}
                        options={options}
                        height='300vh'
                     />
        }else{
            return <div id='loader'>
                        <img src='/img/loader.gif'/>
                    </div>
        }

    }

    render(){
        return (
            <div>
                <div style={styles.graphContainer}>
                     {this.line()}
                </div>
            </div>
        )
    }
}
export default ChartReflexe;
