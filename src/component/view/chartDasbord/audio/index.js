import React , { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';

const options = {

   pointStyle:'crossRot',
    scales: {
          xAxes: [{
            type: 'linear',
           position: 'bottom',
            ticks: {
                callback: function(value, index, values) {
                    return  value+' htz';
                },
              min: 0,
              max: 20000,
              stepSize: 1000
            }
          }],
          yAxes: [{
              display: false,
              ticks: {
                callback: function(value) {return ((value % 10) == 0)? value : ''},
            //     min: 0,
            //    max: 50,
                stepSize: 1
              }
          }]
        }
}

const styles= {

    graphContainer :{
        height: '50%',
        padding: '15px'
    }
}

class chart_auditif extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    constructor(props){
        super(props);
        this.state={
            data: {
                datasets :  [{
                    data :  null,
                    label: "Vous",
                  //  lineTension: 0.1,
                    backgroundColor: "rgba(65, 105, 225, 0.452)",
                    borderColor: "royalblue",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "royalblue",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "royalblue",
                    pointHoverBorderColor: "royalblue",
                },{
                    label: "Tout le monde",
                   // lineTension: 0.1,
                    data : null,
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
                }]
            },
            line:0,
            max:0

        }
    }
     
    countApi1=()=>{

        if(this.state.max){

            var d=  this.state.max;

            var z = [];
            var a = 0 ;
            var b = 1000;

        for(var i = 0 ;i <= 20 ; i ++){

            if(d.filter((d)=>{ return d < b && d > a}).length > 0){
                z.push(d.filter((d)=>{ return d < (b +1) && d > (a -1)}).length);
            }

            a = b ;
            b = b +1000;

            if(d.includes(a) === true){
                z.push(d.filter(d => d == a).length);
            }

        }
            var all_node= z.sort(function (a,b){return b - a});

            return all_node[0];
            
        }
    
    }


    
    maxCount1=()=>{

        const { cookies } = this.props;

        if(cookies.get('auth_').auditif){

        var d= cookies.get('auth_').auditif.sort(function (a,b){return a - b});
                
        var z = [];
        var a = 0 ;
        var b = 1000;

        for(var i = 0 ;i <= 20 ; i ++){

            if(d.filter((d)=>{ return d < b && d > a}).length > 0){
                z.push(d.filter((d)=>{ return d < (b +1) && d > (a -1)}).length);
            }

            a = b ;
            b = b +1000;

            if(cookies.get('auth_').auditif.includes(a) === true){
                    var tableau=cookies.get('auth_').auditif;
                    z.push(tableau.filter((tableau)=>{return tableau == a }).length);
             
            }

        }

        var all_node= z.sort(function (a,b){return b - a});
        return all_node[0];

    }else{
        return 1+''; 
    }

    }

    element = ()=>{
        const { cookies } = this.props;

           var z = [];

       var d= cookies.get('auth_').auditif;

       var a = 0 ;
       var b = 1000;

       if(d.filter((d)=>{ return d < b  && d > a }).length > 0){
            z.push({x: 0 , y : d.filter((d)=>{ return d < (500 -1) && d > (0 +1)}).length});
        }else{
            z.push({x: 0, y : 0})
        } 
             for(var i = 0 ;i <= 20 ; i ++){

                        if( d.filter((d)=>{ return d < (b -1) && d > (a +1)}).length > 0 &&   d.filter((d)=>{ return d < (b -1) && d > (a +1)}).length === this.maxCount1()){
                            z.push({x:  a*1 +500 , y :this.countApi1()});
                        }else{
                            z.push({x:  a*1 +500 , y :this.pourcent(this.maxCount1(), d.filter((d)=>{ return d < (b -1) && d > (a +1)}).length )});
                        }

                       a = b ;
                       b = b +1000;
    
                        if(cookies.get('auth_').auditif.includes(a+'') === true){

                                var tableau=cookies.get('auth_').auditif;
                                
                                if( tableau.filter((tableau)=>{return tableau == a }).length === this.maxCount1()){
                                    z.push({x:  a  , y :this.countApi1()});
                                }else{
                                    z.push({x:  a , y :this.pourcent(this.maxCount1(), tableau.filter((tableau)=>{return tableau == a }).length )});
                                }
                        
                        }else{
                                z.push({x: a , y : 0});
                        }
                 
             }

           this.state.data.datasets[0].data=z;

            this.getChart();

    }

    
    pourcent=(a,b)=>{

        var total= this.countApi1();

        //le pourcentage 
        var pourcent= (b*100)/a;
        return (total*pourcent)/100;

    }

    
    findMAx=()=>{
        let formData= new FormData();

        formData.append("text","6");
    //    const url= 'http://localhost/react/api/max.php';
        const url= 'https://www.cogniperf.com/api/max.php';
        
        axios.post(url,formData)
            .then((res)=>
            {              
                this.setState({max: res.data});     
                this.element();
            })
    }


    componentDidMount=()=>{    
        this.findMAx()
    }

    getChart=()=>{

        let formData= new FormData();
        formData.append("text","ko")
     //   const url= 'http://localhost/react/api/chart_auditif.php';

      const url= 'https://www.cogniperf.com/api/chart_auditif.php';
        axios.post(url,formData)
            .then((res)=>
            {
                this.state.data.datasets[1].data=res.data
                this.setState({line:1})
            })

    }



    line=()=>{

        if(this.state.line == 1){
            return   <Line
                        data={this.state.data}
                        options={options}
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
export default withCookies(chart_auditif);
