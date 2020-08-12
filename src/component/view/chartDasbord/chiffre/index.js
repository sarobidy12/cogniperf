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
                    return  value+' Pts';
                },
              min: 0,
              max: 18,
              stepSize: 1
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
        padding: '1px'
    }
}

class ChartChiffre extends Component {

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
            max:0,

    }

    }


    countApi=()=>{

        if(this.state.max){

          var max=  this.state.max;
        var d= max.sort(function (a,b){return b - a});
        
        function onlyUnique(value,index,self){
            return self.indexOf(value) === index;
        }
           
        var unique = d.filter(onlyUnique);

        var all=[];

         for(var i=0;i < unique.length;i++){
            all.push(d.filter(d => d == unique[i]).length);
         }

        var all_node= all.sort(function (a,b){return b - a});

        return all_node[0];
    }
    }
    
    maxCount=()=>{

        const { cookies } = this.props;

        if(cookies.get('auth_').chiffre){

        var d= cookies.get('auth_').chiffre.sort(function (a,b){return b - a});
        
        function onlyUnique(value,index,self){
            return self.indexOf(value) === index;
        }
           
        var unique = d.filter(onlyUnique);

        var all=[];

         for(var i=0;i < unique.length;i++){
            all.push(d.filter(d => d == unique[i]).length);
         }

        var all_node= all.sort(function (a,b){return b - a});

        return all_node[0];

    }else{

        return 1+'';
    
    }

    }

    pourcent=(a,b)=>{

        var total= this.countApi();

        //le pourcentage 
        var pourcent= (b*100)/a;
        return (total*pourcent)/100;

    }

    element = ()=>{
        const { cookies } = this.props;

           var a = [];
       
           var d= cookies.get('auth_').chiffre.sort(function (a,b){return b - a});

           function onlyUnique(value,index,self){
            return self.indexOf(value) === index;
           }
    
           var unique = d.filter(onlyUnique);

           for(var i = 0 ;i <= 18 ; i ++){
                if(cookies.get('auth_').chiffre.includes(i+'') === true){

                    var tableau=cookies.get('auth_').chiffre;
                    var d=0;

                    for(var b=0;b < tableau.length ;b++){
                        if(tableau[b]+"" === i+""){
                            d=d+1;
                        }
                    }

                    if(d === this.maxCount()){
                        a.push({x: i , y :this.countApi()});
                    }else{
                        a.push({x: i , y :this.pourcent(this.maxCount(),d)});
                    }

                }else{
                    a.push({x: i, y : 0})
                }
           }

           this.state.data.datasets[0].data=a;
           this.getChart();

    }

    findMAx=()=>{

        let formData= new FormData();
        formData.append("text","1");
        const url= 'https://www.cogniperf.com/api/max.php';
        axios.post(url,formData)
            .then((res)=>
            {               
                this.setState({max: res.data});     
                this.element();
            })
    }

    componentDidMount=()=>{
        this.findMAx();
    }

    getChart=()=>{

        let formData= new FormData();
        formData.append("text","ko");
        const url= 'https://www.cogniperf.com/api/chart_chiffre.php';
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
export default withCookies(ChartChiffre);
