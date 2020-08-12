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
                    return  value +' Points';
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
                        return  value+' ms';
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
        padding: '10px'
    }
}

class Evolution extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){

        super(props);
        this.state={
        chiffre:{
                labels:null,
                datasets: [
                          {
                            data :  null,
                            label : 'Chiffre',
                           // lineTension: 0.1,
                            backgroundColor:'rgba(255, 0, 0, 0.2)',
                            borderColor: 'rgba(255, 0, 0, 1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(255, 0, 0, 1)',
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(255, 0, 0, 1)',
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            borderColor: 'red',
                            fill:"start"
                          }
                        ]

        },
        memoire_visuel:{
            labels:null,
            datasets: [
                      {
                        data :  null,
                        // lineTension: 0.1,
                        backgroundColor:'rgba(0, 191, 255, 0.2)',
                        borderColor: 'rgba(0, 191, 255, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(0, 191, 255, 1)',
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(0, 191, 255, 1)',
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        borderColor: 'blue',
                        fill:"start"
                      }
                    ]
        },
        memoire_verbal: {
            labels:null,
            datasets: [
                      {
                        data :  null,
                        // lineTension: 0.1,
                        backgroundColor:'rgba(0, 128, 0, 0.2)',
                        borderColor: 'rgba(0, 128, 0, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(0, 128, 0, 1)',
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(0, 128, 0, 1)',
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        borderColor: 'yellowgreen',
                        fill:"start"
                      }
                    ]

        },
        auditif: {
            labels:null,
            datasets: [
                      {
                        data :  null,
                        // lineTension: 0.1,
                        backgroundColor:'rgba(238, 130, 238, 0.589)',
                        borderColor: 'rgba(238, 130, 238, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(238, 130, 238, 1)',
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(238, 130, 238, 1)',
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        borderColor: 'violet',
                        fill:"start"
                      }
                    ]

        },
        dactylo: {
            labels:null,
            datasets: [
                      {

                        data :  null,
                        // lineTension: 0.1,
                        backgroundColor:'rgba(128, 0, 0, 0.4)',
                        borderColor: 'rgba(128, 0, 0, 0.4)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(128, 0, 0, 0.4)',
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(128, 0, 0, 0.4)',
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        borderColor: 'maroon',
                        fill:"start"

                      }
                    ]

        },
        reflexe: {
            labels:null,
            datasets: [
                      {

                        data :  null,
                        // lineTension: 0.1,
                        backgroundColor:'rgba(255, 166, 0, 0.2)',
                        borderColor:'rgba(255, 166, 0, 0.2)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(255, 166, 0, 0.2)',
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(255, 166, 0, 0.2)',
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        borderColor: 'yellow',
                        fill:"start"

                      }
                    ]

        },
        _chiffre: 0,
        _reflexe: 0,
        _dactylo: 0,
        _auditif: 0,
        _memoire_verbal: 0,
        _memoire_visuel: 0
    }

    }

    chiffre=()=>{
        const { cookies } = this.props;
        if(cookies.get('auth_').chiffre != null){

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

        this.state.chiffre.datasets[0].data=y;
        this.state.chiffre.labels=x;

        this.setState({
            _chiffre:1
        })
    }

    }

    memoire_visuel=()=>{
        const { cookies } = this.props;

        if(cookies.get('auth_').memoire_visuel != null){

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

            this.state.memoire_visuel.datasets[0].data=y;
            this.state.memoire_visuel.labels=x;

            this.setState({
                _memoire_visuel:1
            })
        }

    }

    memoire_verbal=()=>{

        const { cookies } = this.props;

        if(cookies.get('auth_').memoire_verbal != null){

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

            this.state.memoire_verbal.datasets[0].data=y;
            this.state.memoire_verbal.labels=x;

            this.setState({
                _memoire_verbal:1
            })

        }

    }

    dactylo=()=>{

        const { cookies } = this.props;

        if(cookies.get('auth_').dactylo != null){

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

            this.state.dactylo.datasets[0].data=y;
            this.state.dactylo.labels=x;

            this.setState({
                _dactylo:1
            })
        }

    }

    reflexe=()=>{

        const { cookies } = this.props;

        if(cookies.get('auth_').reflexe != null){

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
            this.state.reflexe.datasets[0].data=y;
            this.state.reflexe.labels=x;


            this.setState({
                _reflexe:1
            })

        }
    }

    auditif=()=>{

        const { cookies } = this.props;

        if(cookies.get('auth_').auditif != null){
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

                    this.state.auditif.datasets[0].data=y;
                    this.state.auditif.labels=x;

                    this.setState({
                        _auditif:1
                    })
        }


    }

    evolution=()=>{

        const { cookies } = this.props;
          this.chiffre();
          this.memoire_visuel();
          this.memoire_verbal();
          this.dactylo();
          this.reflexe();
          this.auditif();
    }

    Chartchiffre=()=>{
        if(this.state._chiffre == 1){
            return  <div className='chart_all'>
                    <h1>Mémoire des chiffres </h1>
                        <div style={styles.graphContainer}>
                            <Line
                                    data={this.state.chiffre}
                                    options={options}
                            />
                        </div>
                    </div>

        }
    }

    Chartmemoire_visuel=()=>{
        if(this.state._memoire_visuel == 1){
            return  <div className='chart_all'>
                    <h1>Mémoire visuelle</h1>
                        <div style={styles.graphContainer}>
                            <Line
                                    data={this.state.memoire_visuel}
                                    options={options}
                            />
                        </div>
                    </div>
        }
    }

    Chartdactylo=()=>{
        if(this.state._dactylo == 1){
            return  <div className='chart_all'>
                    <h1>Evolution de la dactylographie</h1>
                    <div style={styles.graphContainer}>
                        <Line
                                data={this.state.dactylo}
                                options={options}
                        />
                    </div>
                    </div>
        }
    }


    Chartmemoire_verbal=()=>{
        if(this.state._memoire_verbal == 1){
            return  <div className='chart_all'>
                        <h1>Mémoire des mots</h1>
                        <div style={styles.graphContainer}>
                            <Line
                                    data={this.state.memoire_verbal}
                                    options={options}
                            />
                        </div>
                    </div>
        }
    }

    Charreflexe=()=>{

        if(this.state._reflexe == 1){
            return  <div className='chart_all'>
                        <h1>Temps de Réaction</h1>
                        <div style={styles.graphContainer}>
                                <Line
                                        data={this.state.reflexe}
                                        options={chart1}
                                />
                        </div>
                    </div>
        }
    }

    Charauditif=()=>{
        if(this.state._auditif == 1){
            return  <div className='chart_all'>
                    <h1>Fréquences Auditives</h1>
                    <div style={styles.graphContainer}>
                        <Line
                            data={this.state.auditif}
                            options={chart2}
                        />
                    </div>
                    </div>
            }
    }

    componentDidMount=()=>{
        this.evolution();
    }

    render(){
        return (
            <div>
                    {this.Chartchiffre()}
                    {this.Charauditif()}
                    {this.Charreflexe()}
                    {this.Chartmemoire_verbal()}
                    {this.Chartmemoire_visuel()}
                    {this.Chartdactylo()}
                </div>
        )
    }
}

export default withCookies(Evolution);
