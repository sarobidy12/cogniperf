import React, { Component } from 'react';
import $ from 'jquery'
import {Redirect,Link} from 'react-router-dom';
import ChartChart from '../../chart/reflexe/index';
import Bottom from '../../../licence/index';
import { withCookies, Cookies } from 'react-cookie';
import MetaTags from 'react-meta-tags';


class Reflexe extends Component{
    constructor(props){
        super(props);
        this.state={
            time: 0,
            state:1,
            on:1,
            test:1,
            vie:3,
            start:1,
            alltime:[],
            redirect:false,
        }
    }

    top = () =>{
        const { cookies } = this.props;

        if(this.state.vie <= 0 ){

            this.setState({
                state: 0,
                on:0,
                start: 0
            });

                document.getElementById('home_container').style.display='none';
                document.getElementById('reflexe').style.display='none';
                document.getElementById('tot').style.display='none';
                document.getElementById('roum').style.display='block';
                document.getElementById('home').style='background-color:#26C4EC';

        if(!cookies.get('lo_')){
            this.save()
        }

       }else{

        if(this.state.vie > 1){
                        
                this.setState({
                    state: 0,
                    on:0,
                    vie: this.state.vie -1
                });

                document.getElementById('reflexe').style.display='none';
                document.getElementById('tot').style.display='block';
                document.getElementById('home').style='background-color:#26C4EC';

        }else{

         
            if(cookies.get('lo_')){
                this.save()
            }else{
                   
            this.setState({
                state: 0,
                on:0,
                start: 0
            });
                    
                document.getElementById('home_container').style.display='none';
                document.getElementById('reflexe').style.display='none';
                document.getElementById('tot').style.display='none';
                document.getElementById('home').style='background-color:#26C4EC';
                document.getElementById('roum').style.display='block';
                
            }

        }
    }

 }

 componentWillMount=()=>{
   window.scrollTo(0,0);
   document.addEventListener("keydown",this.onkeypress)
 }

 onkeypress=(event)=>{

    if(event.keyCode == 32 && event.target == document.body) {

        event.preventDefault();
        if(document.getElementById('befor').style.display === 'block'){
            this.top();
        }else{
            this.pup();
        }
      }

 }

 componentDidMount=()=>{

    var url = window.location.pathname;
    var categorie = url.split('/');
    var element = decodeURI(categorie[2]);

    sessionStorage.setItem('test',element);
    document.title = 'Cogniperf - '+element;

        document.getElementById('home').style='cursor:pointer';
      $('#home_container').hide();
      $("#home_container").fadeIn(800,()=>{
      });
      $('home_container').addClass('up');
    }

    Start= ()=>{

    var url = window.location.pathname;
    var categorie = url.split('/');
    var element = decodeURI(categorie[2]);

    if(element=== 'Temps-de-Réaction'){

      $('#home').css('cursor','pointer')

            document.getElementById('home').style='cursor:pointer';
            document.getElementById('home').style='background-color:red';
            document.querySelector('#reflexe h1').innerHTML="Attendez que le fond soit vert.";
            document.getElementById('home_container').style.display='none';
            document.getElementById('tot').style.display='none';
            document.getElementById('reflexe').style.display='block';
            document.getElementById('befor').style.display='block';

            this.setState({
                state: 1,
                on:1
            });

            var rand = Math.floor(Math.random() * 2500) + 100;
            setTimeout(()=>{

                    if(document.getElementById('befor')){
                        document.getElementById('befor').style.display='none';
                    }

                if(this.state.state != 0){

                        if(document.querySelector('#reflexe h1')){

                                    if(window.screen.width < 768){
                                        document.querySelector('#reflexe h1').innerHTML="Maintenant appuyer sur quelque chose";   
                                                             document.getElementById('home').style='background-color:green';
                                    }else{
                                        document.querySelector('#reflexe h1').innerHTML="Maintenant appuyer sur Espace"; 
                                           document.getElementById('home').style='background-color:green';
                                    }

                        }

                    this.incrument();

                }
            },rand);
        }
    }

    Stop =()=>{

        const { cookies } = this.props;

    var url = window.location.pathname;
    var categorie = url.split('/');
    var element = decodeURI(categorie[2]);

    if(decodeURI(element) === 'Temps-de-Réaction'){

        this.setState({
            state: 0,
            on:0,
            time: this.state.time - 3,
        });

       if(this.state.vie <= 0 ){

            this.setState({
                start: 0
            });

            document.getElementById('home_container').style.display='none';
            document.getElementById('reflexe').style.display='none';
            document.getElementById('home').style='background-color:#26C4EC';
            document.getElementById('roum').style.display='block';
            if(cookies.get('lo_')){
                this.save()
            }

       }else if(this.state.test > 4){
            this.setState({
                state: 0,
                on:0,
                start: 0
            });

            document.getElementById('home_container').style.display='none';
            document.getElementById('reflexe').style.display='none';
            document.getElementById('home').style='background-color:#26C4EC';
            document.getElementById('roum').style.display='block';
            if(cookies.get('lo_')){
                this.save()
            }

       }else{

            $('#home').css('cursor','pointer');
            document.getElementById('tot').style.display='none';
            document.getElementById('home').style='cursor:pointer';
            document.querySelector('#reflexe h1').innerHTML="Attendez que le fond soit vert.";
            document.getElementById('home').style='background-color:#26C4EC';

                    var data =this.state.alltime;
                    data.push(this.state.time);

                    this.setState({
                        state: 0,
                        on:0,
                        test: this.state.test +1,
                        alltime:data

                    });


            if(this.state.state == 1 && this.state.time== 0){
                document.getElementById('home_container').style.display='none';
                document.getElementById('reflexe').style.display='none';
                document.getElementById('time').style.display='none';
            }else{
                document.getElementById('home_container').style.display='none';
                document.getElementById('reflexe').style.display='none';
                document.getElementById('time').style.display='block';
            }

            this.incrument();

       }

    }
}

    incrument = () =>{

        if(this.state.state == 1){
            setTimeout(()=>{
                        this.setState({
                            time : this.state.time + 1
                        })
                        this.incrument();
            },1);
        }

    }

    Restart = () =>{

    var url = window.location.pathname;
    var categorie = url.split('/');
    var element = decodeURI(categorie[2]);
    if(decodeURI(element) === 'Temps-de-Réaction'){

        if(this.state.start == 1){

                    $('#home').css('cursor','pointer')
                    document.getElementById('tot').style.display='none';
                    document.getElementById('home').style='cursor:pointer';
                    document.getElementById('home_container').style.display='none';
                    document.getElementById('reflexe').style.display='block';
                    document.getElementById('befor').style.display='block';

                        this.setState({
                            time: 0,
                            state: 1,
                            on:1
                        });

                        if(document.querySelector('#reflexe h1')){
                            document.querySelector('#reflexe h1').innerHTML="Attendez que le fond soit vert.";
                        }

                        document.getElementById('home').style='background-color:red';
                        var rand = Math.floor(Math.random() * 2500) + 300;

                            setTimeout(()=>{

                                if(document.getElementById('befor')){
                                    document.getElementById('befor').style.display='none';
                                }


                                    if(this.state.state != 0){

                                        if(window.screen.width < 768){
                                            if(document.querySelector('#reflexe h1')){
                                                document.querySelector('#reflexe h1').innerHTML="Maintenant appuyer sur quelque chose";                        document.getElementById('home').style='background-color:green';
                                            }
                                        }else{
                                            if(document.querySelector('#reflexe h1')){
                                                document.querySelector('#reflexe h1').innerHTML="Maintenant appuyer sur Espace";                        document.getElementById('home').style='background-color:green';
                                            }
                                        }

                                        if(document.getElementById('home')){
                                            document.getElementById('home').style='background-color:green';
                                        }

                                        if(document.getElementById('home_container')){
                                            document.getElementById('home_container').style.display='none';
                                        }

                                        if(document.getElementById('reflexe')){
                                            document.getElementById('reflexe').style.display='block';
                                        }

                                        this.incrument();

                                }

                            },rand);
                            document.getElementById('reflexe').style.display='block';
                            document.getElementById('time').style.display='none';
                            document.getElementById('home_container').style.display='none';

        }

        }

}

    pup =()=>{
        if(this.state.time == 0 && this.state.state == 1 ){
            this.Start();
        }else if(this.state.time != 0 && this.state.state == 1){
                this.Stop();
        }else{
            this.Restart();
        }
    }

    save=()=>{
        this.setState({
            redirect:true
        })
    }

    componentWillUnmount=()=>{

        document.removeEventListener("keydown",this.onkeypress)
        document.getElementById('reflexe').display='none';
        this.setState({
          active:0
        });

        var length =this.state.alltime.length
        var total=0;
         for(var i=0;i< length;i++){
            total= total + this.state.alltime[i];
         }

        var result= Math.round(total / length)*1;

        if(result != 0){
            sessionStorage.setItem('point',result);
        }

    }

    renderRedirection=()=>{
        
        var url = window.location.pathname;
        var categorie = url.split('/');
        var element = decodeURI(categorie[2]);
        var redirection= '/tableau-de-bord-quiz/'+element;
        
            if(this.state.redirect){
                return <Redirect to={redirection} />
            }

    }


    allTime=()=>{

        var length =this.state.alltime.length
        var total=0;
         for(var i=0;i< length;i++){
            total= total + this.state.alltime[i];
         }

         var result= Math.round(total / length)*1;

            return <b>{result}</b>;
    }

    pop=()=>{

        document.getElementById('roum').style.display='none';
        document.getElementById('reflexe').style.display='block';
            setTimeout(()=>{
                this.setState({
                    time: 0,
                    state:1,
                    on:1,
                    test:1,
                    vie:3,
                    start:1,
                    alltime:[],
                    redirect:false,
                })
            },100);

            document.querySelector('#reflexe h1').innerHTML="Attendez que le fond soit vert.";
            document.getElementById('home').style='background-color:red';
            var rand = Math.floor(Math.random() * 2500) + 500;
            setTimeout(()=>{
                document.getElementById('befor').style.display='none';
                    if(this.state.state != 0){
                        if(window.screen.width < 768){
                            document.querySelector('#reflexe h1').innerHTML="Maintenant appuyer sur quelque chose";                        document.getElementById('home').style='background-color:green';
                        }else{
                            document.querySelector('#reflexe h1').innerHTML="Maintenant appuyer sur Espace";                        document.getElementById('home').style='background-color:green';
                        }
                        this.incrument();
                    }
            },rand);
    }


    begin =(a)=>{
        if(a === 1){
            if(window.screen.width < 768){
               return ' Appuyez n\'importe où pour commencer '
            }else{
               return ' Appuyez sur espace pour commencer '

            }

        }else if(a === 2){

            if(window.screen.width < 768){
                return ' Appuyez pour continuer '
             }else{
                return ' Appuyez sur espace pour continuer '

             }

        }else if(a === 3){
            if(window.screen.width < 768){
                return ' Appuyez pour ressayer '
             }else{
                return ' Appuyez sur espace pour ressayer'

             }
        }
    }

    result=()=>{
        const { cookies } = this.props;
        if(!cookies.get('lo_')){
            return  <div id='result_test'>
                        <h1>
                        Connectez-vous pour voir vos résultats .
                        </h1>
                        <center>
                            <Link onClick={()=>{ this.pop() }} id='btn_restart_test'>Recommencer </Link>
                        </center>
                        <center>
                            <Link to='/inscription' id='btn_restart_test'>S'inscrire</Link>
                        </center>
                        <center>
                            <Link to='/se-connecter' id='btn_restart_test'>Se connecter</Link>
                        </center>
                    </div>

        }
    }
    render(){
        const {time} = this.state;
        const {vie} = this.state;
        const {test} = this.state;
        return(
            <div>

          <MetaTags>
            <meta property="og:description" content="Quand le fond devient vert, essayez de réagir le plus vite possible." />
            <meta property="og:title" content="Test de temps de réaction" />
            <meta property="og:image" content="/img/2.png" />
          </MetaTags>
                {this.renderRedirection()}
                {this.allTime()}


                <div id='befor' onClick={()=>{this.top()}}>
                        </div>
                <div className='home pointed' id='home' onClick={()=>{this.pup()}}>
                <div id='particle'>

                        </div>

                        <div id='home_container' className='up'>
                            <center>
                                <img src='/img/2.png'/>
                            </center>
                            <h1>Test de temps de réaction </h1>
                            <p>
                            Quand le fond devient vert, essayez de réagir le plus vite possible.<br/>
                            </p>
                            <p  className='opacity'>
                            {this.begin(1)}
                            </p>
                        </div>

                        <div id='reflexe'>
                            <center>
                                <ul>
                                        <li>.</li>
                                        <li>.</li>
                                        <li>.</li>
                                </ul>

                                <br />
                                <br />
                                <br />

                                <h1>Attendez que le fond soit vert. </h1>
                            <div className='vie'>Essai | {vie}</div>
                            </center>
                        </div>

                        <div id='time'>
                            <center>
                            <img src='/img/krono.png'/>
                                <h1> Votre temps <br /><b>{time}</b> Ms </h1>
                                <p className='opacity'>{this.begin(2)}</p>

                            </center>
                        </div>

                        <div id='tot'>
                            <center>
                            <img src='/img/soon.png'/>
                                    <h1>Trop tot</h1>
                                    <p className='opacity'>{this.begin(3)}</p>
                            </center>
                        </div>
                    <div id='roum'>
                        <center>
                            {this.result()}
                        </center>
                    </div>
                    </div>

                    <div className='container_r'>
                    <div className='container_ro'>
                        <h1>Statistique </h1>
                        <ChartChart/>
                    </div>

                    <div className='container_ro'>
                    <h1>À propos du test</h1>
                    <b>
                        il s'agit d'un outil simple pour mesurer votre temps
                        de réaction .<br/><br/>

                        En plus de mesurer votre temps de réaction, ce test affecté par la latence de votre
                        ordinateur et de votre moniteur .L'utilisation d'un ordinateur rapide et un moniteur à faible
                        latence / haut débit améliorera votre score.<br/><br/>
                        Si vous le souhaitez, vous pouvez suivre vos scores et consulter l'historique complet de vos temps de réaction.
Effectuez au moins 5 clics, puis enregistrez.

                    </b>
                    </div>
                    </div>
                    <br />
                     <br />
                     <br />
                     <br />
                     
            <br />
            <br />
                    <div id='olll'>
                      <Bottom />
                  </div>

                     </div>

        )
    }
}

export default withCookies(Reflexe);
