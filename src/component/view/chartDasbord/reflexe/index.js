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
                    return  value+' ms';
                },
              min: 0,
              max: 120,
              stepSize: 5
            }
          }],
          yAxes: [{
             display: false,
              ticks: {
                callback: function(value) {return ((value % 10) === 0)? value : ''},
                min: 0,
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
class Chartreflexe extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
     };

    constructor(props){

        super(props);

        this.state={
            data: {
            labels:null,
            datasets:[
                {
                   data :  null,
                    label: "Vous",
                 //   lineTension: 0.1,
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
                    label: "Tous le monde",
                //    lineTension: 0.1,
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
            ]
        },
        line:0,
        max:0
        }
    }


    
    countApi4=()=>{

        if(this.state.max){

        var max=  this.state.max;

        var d= max.sort(function (a,b){return b - a});
        
        function onlyUnique(value,index,self){
            return self.indexOf(value) === index;
        }
           
        var unique = d.filter(onlyUnique);

        var all=[];

         for(var i=0;i < unique.length;i++){
            all.push(d.filter( function(d){ return d === unique[i]}).length);
         }

        var all_node= all.sort(function (a,b){return b - a});

        return all_node[0];
    }

    
    }

    maxCount4=()=>{

        const { cookies } = this.props;

        if(cookies.get('auth_').reflexe){

        var d= cookies.get('auth_').reflexe.sort(function (a,b){return a - b});
                
        var z = [];
        var a = 0 ;
        var b = 5;

        for(var i = 0 ;i <= 23 ; i ++){

             if(d.filter((d)=>{ return d < (b-0.5) && d > (a+0.5)}).length > 0){
                 z.push(d.filter((d)=>{ return d < (b-0.5) && d > (a+0.5)}).length)
             }

             var a = b *1;
             var b = b +5;

             if(cookies.get('auth_').reflexe.includes(a) === true){
                var tableau=cookies.get('auth_').reflexe;


                if(tableau.filter((tableau)=>{return tableau === a }).length > 0 ){
                   z.push(tableau.filter((tableau)=>{return tableau === a }).length);
                }
            } 

        }
       
        var all_node= z.sort(function (a,b){return b - a});

        return all_node[0];

    }else{
        return 1+''; 
    }

    }

    pourcent=(a,b)=>{

        var total= this.countApi4();

        //le pourcentage 
        var pourcent= (b*100)/a;
        return (total*pourcent)/100;

    }
    
    element = ()=>{
        const { cookies } = this.props;

        var d= cookies.get('auth_').reflexe.sort(function (a,b){return a - b});
            var z = [];
            var a = 0 ;
            var b = 5;
            var n=0;

            z.push({x:0 , y : 0})

            for(var i = 0 ;i <= 23 ; i ++){
             
                 if(d.filter((d)=>{ return d < b && d > a}).length > 0 && d.filter((d)=>{ return d < b && d > a}).length  === this.maxCount4()){
                     z.push({x:  a*1 +2.5 , y :this.countApi4()});
                 }else{
                     z.push({x:  a*1 +2.5 , y :this.pourcent(this.maxCount4(),d.filter((d)=>{ return d < b && d > a}).length )});
                 }

                 var a = b *1;
                 var b = b +5;

                 if(cookies.get('auth_').reflexe.includes(a) === true){
                         var tableau=cookies.get('auth_').reflexe;
         
                         if(tableau.filter((tableau)=>{return tableau === a }).length === this.maxCount4()){
                             z.push({x: a , y :this.countApi4()});
                         }else{
                             z.push({x: a , y :this.pourcent(this.maxCount4(),tableau.filter((tableau)=>{return tableau === a }).length)});
                         }
         
                 }else{
                         z.push({x: a, y : 0});
                 }
            }
            z.push({x:120 , y : 0})

            this.state.data.datasets[0].data=z;

        this.getChart();

    }


    findMAx=()=>{
        let formData= new FormData();

        formData.append("text","2");
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
       formData.append("text","ko");

       const url= 'https://www.cogniperf.com/api/chart_reflexe.php';
       axios.post(url,formData)
       .then((res)=>
       {
          this.state.data.datasets[1].data=res.data;
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
export default withCookies(Chartreflexe);
