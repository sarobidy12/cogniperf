import React , { Component } from 'react';
import {  Line } from 'react-chartjs-2';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
const options = {
    legend: {
        display: false
    },
   scales: {
          xAxes: [{
            display: false,
            ticks: {
              stepSize: 1
            }
          }],
            yAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return  value+' Points';
                    },
                  stepSize: 1,
                  beginAtZero:false,
                }
            }]
        }
 }


const chart1 = {
    legend: {
        display: false
    },
   scales: {
          xAxes: [{
            display: false,
            ticks: {
              stepSize: 1
            }
          }],
            yAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return  value+' Ms';
                    },
                    stepSize: 5,
                    beginAtZero:false,
                    reverse: true,
                }
            }]
        }
 }


const chart2 = {
    legend: {
        display: false
    },
    scales: {
           xAxes: [{
             display: false,
             ticks: {
               stepSize: 10
             }
           }],
             yAxes: [{
                 ticks: {
                     callback: function(value, index, values) {
                        return  value+' Hz';
                    },
                     stepSize: 1000,
                     beginAtZero:false,
                 }
             }]
         }
  }

const styles= {
    graphContainer :{
        padding: '15px'
    }
}

class GetEvolution extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){

        super(props);
        this.state={
            data: {
            labels:null,
            datasets: [
                      {
                        label: "Tous le monde",
                        lineTension: 0.1,
                        data :  null,
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
                    ],
            line: 0

        }
    }

    }

    chiffre=()=>{
        const { cookies } = this.props;

        var y = [];
        var x = [];

        for(var i = 0 ;i <= cookies.get('auth_').chiffre.length ; i ++){

            if( i < cookies.get('auth_').chiffre.length){
                y.push(cookies.get('auth_').chiffre[i] *1);
            }
            if( i > 0){
                x.push(i);
            }
        }

        this.state.data.datasets[0].data=y;
        this.state.data.labels=x;

    }

    memoire_visuel=()=>{
        const { cookies } = this.props;

        var y = [];
        var x = [];

        for(var i = 0 ;i <= cookies.get('auth_').memoire_visuel.length ; i ++){

            if( i < cookies.get('auth_').memoire_visuel.length){
                y.push(cookies.get('auth_').memoire_visuel[i] *1);
            }
            if( i > 0){
                x.push(i);
            }
        }

        this.state.data.datasets[0].data=y;
        this.state.data.labels=x;

    }

    memoire_verbal=()=>{

        const { cookies } = this.props;

        var y = [];
        var x = [];

        for(var i = 0 ;i <= cookies.get('auth_').memoire_verbal.length ; i ++){

            if( i < cookies.get('auth_').memoire_verbal.length){
                y.push(cookies.get('auth_').memoire_verbal[i] *1);
            }
            if( i > 0){
                x.push(i);
            }
        }

        this.state.data.datasets[0].data=y;
        this.state.data.labels=x;

    }

    dactylo=()=>{

        const { cookies } = this.props;

        var y = [];
        var x = [];

        for(var i = 0 ;i <= cookies.get('auth_').dactylo.length ; i ++){

            if( i < cookies.get('auth_').dactylo.length){
                y.push(cookies.get('auth_').dactylo[i] *1);
            }
            if( i > 0){
                x.push(i);
            }
        }

        this.state.data.datasets[0].data=y;
        this.state.data.labels=x;

    }

    reflexe=()=>{

        const { cookies } = this.props;

        var y = [];
        var x = [];

        for(var i = 0 ;i <= cookies.get('auth_').reflexe.length ; i ++){
            if( i < cookies.get('auth_').reflexe.length){
                y.push(cookies.get('auth_').reflexe[i]);
            }
            if( i > 0){
                x.push(i);
            }

        }

        this.state.data.datasets[0].data=y;
        this.state.data.labels=x;

    }

    auditif=()=>{

        const { cookies } = this.props;

        var y = [];
        var x = [];

        for(var i = 0 ;i <= cookies.get('auth_').auditif.length ; i ++){

            if( i < cookies.get('auth_').auditif.length){
                y.push(cookies.get('auth_').auditif[i]);
            }

            if( i > 0){
                x.push(i);
            }

        }

        this.state.data.datasets[0].data=y;
        this.state.data.labels=x;

    }

    evolution=()=>{

        var url = window.location.pathname;
        var categorie = url.split('/');
        const element = decodeURI(categorie[2]);
 
        if( element === 'Mémoire-des-chiffres'){
            this.chiffre();
        }else if(element === 'Fréquences-Auditives'){
            this.auditif();
        }else if(element === 'Temps-de-Réaction'){
            this.reflexe();
        }else if(element === 'Dactylographie'){
            this.dactylo();
        }else if(element === 'Mémoire-des-mots'){
            this.memoire_verbal();
        }else if(element === 'Mémoire-visuelle'){
            this.memoire_visuel();
        } 

    }

    componentDidMount=()=>{
        setTimeout(()=>{
            this.evolution();
            this.setState({line:1})
        },600);
    }

    line=()=>{

        const { cookies } = this.props;

        if(this.state.line == 1){
            
        var url = window.location.pathname;
        var categorie = url.split('/');
        const element = decodeURI(categorie[2]);
 
        if(element == 'Temps-de-Réaction'){
            return  <Line
                        data={this.state.data}
                        options={chart1}
             />
        }else  if(element == 'Fréquences-Auditives'){
            return  <Line
                        data={this.state.data}
                        options={chart2}
            />
        }else{
            return  <Line
                        data={this.state.data}
                        options={options}
                    />
        }

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
export default withCookies(GetEvolution);
