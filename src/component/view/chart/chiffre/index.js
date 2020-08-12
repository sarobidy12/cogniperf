import React , { Component } from 'react';
import { Line } from 'react-chartjs-2';
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
                    return  value+' Pts';
                },
              min: 0,
              max: 18,
              stepSize: 2

            }
          }],
          yAxes: [{
              display: false,
              ticks: {
                callback: function(value) {return ((value % 10) === 0)? value : ''},
              }
          }]
        }
}

const styles= {
    graphContainer :{
        padding: '15px',
    }
}
class ChartChiffre extends Component {

    constructor(props){
        super(props);
        this.state={
            data: {
                datasets :  [{
                            data :  null,
                            label: "My First dataset",
                           // lineTension: 0.1,
                            backgroundColor: "rgba(38, 196, 236, 0.3)",
                            borderColor: "#26C4EC",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "#26C4EC",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "#26C4EC",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                }]
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
        
        const url= 'https://www.cogniperf.com/api/chart_chiffre.php';
        axios.post(url,formData)
        .then((res)=>{
            this.state.data.datasets[0].data=res.data;
            this.setState({line:1})
        })

    }


    line=()=>{

        if(this.state.line === 1){
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
export default ChartChiffre;
