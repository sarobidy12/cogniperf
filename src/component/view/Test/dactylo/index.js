import React, { Component } from 'react';
import {Link,Redirect } from 'react-router-dom'
import ChartDactylo from '../../chart/dactylo/index';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Bottom from '../../../licence/index'
import { withCookies, Cookies } from 'react-cookie';
import MetaTags from 'react-meta-tags';


class dactylo extends Component {

  constructor(props){
    super(props);
    this.state={
      text:   "Un jour, un jeune explorateur venu de Saturne passa près de celle-ci. Il fut attiré par cette belle couleur et décida d'y séjourner quelque temps. Il n'avait jamais vu de telles étendues d'eau bleues. Il en était si émerveillé qu'il ne pouvait pas s'empêcher de les contempler à longueur de journée. Ainsi, il décida de ramener quelques gouttes d'eau pour les montrer aux habitants de sa planète.",
      div:null,
      seconds:0,
      second:60,
      minute:1,
      point:0,
      state:1,
      word:0,
      augmenter:null,
      active:0,
      on:0,
      file:1,
      score:0

    }

  }

  componentDidMount=()=>{

    var url = window.location.pathname;
    var categorie = url.split('/');
    var element = decodeURI(categorie[2]);
    sessionStorage.setItem('test',element);
    document.title = 'Cogniperf - '+ element;

}

  pourCentage=()=>{

    if(this.state.text != null){
      var total=this.state.text.length;
      var vrai = this.state.word;
      var x= (vrai * 100)/total;
      return Math.round(x)+' %';
    }

}

  componentWillMount=()=>{
    window.scrollTo(0,0);

  }

  regus= ()=>{
      setTimeout(()=>{
            this.setState({
              state:0,
              on:0
            });
      },1);

    }

  incrument =()=>{

      const { cookies } = this.props;
      
        if(this.state.state === 1){

          if(this.state.minute === 0){

            this.regus();
            document.getElementById('dactylo').style.display='none';
            document.getElementById('roum').style.display='block';

            if(cookies.get('lo_')){
              this.save()
            }

          }else if(this.state.augmenter  === (this.state.text.length*1 -1)){

            this.regus();

            document.getElementById('dactylo').style.display='none';
            document.getElementById('roum').style.display='block';

           if(cookies.get('lo_')){
                this.save()
            }

          }else if(this.state.second === 0){
            setTimeout(()=>{
              this.setState({
                second : 60,
                minute: this.state.minute -1
               });
            },1000);

          }

          this.getwortparminute()

              setTimeout(()=>{
                this.setState({
                  second : this.state.second - 1,
                  seconds: this.state.seconds + 1
              });

            this.incrument();
            },1000);
       }
     }

     getwortparminute=()=>{

       setTimeout(()=>{

         var score = this.state.word *5 /  this.state.seconds ;

           this.setState({
            score: Math.round(score),
            point :this.pourCentage()
           });

         },100);

    }

  visualViewport=()=>{
     if(this.state.on == 1){


      if(window.screen.width > 768){

        if(this.state.state == 0){
          document.getElementById('continus').style.display='block';
          document.getElementById('dactylo').style.display='none';
          document.getElementById('dactere').style.display='none';
          setTimeout(()=>{
            this.setState({
              state:1
            });
           },1);

        }

      }else{

          document.getElementById('home_container').style.display='none';
          document.getElementById('dactylo').style.display='none';
          document.getElementById('dactere').style.display='block';
          setTimeout(()=>{
            this.setState({
              state:0
            });
           },1);
     }
  }
}
 start = () =>{

   document.getElementById('home_container').style.display='none';
   document.getElementById('dactylo').style.display='block';


   var text=  this.state.text;

     var text_leng= text.length;
     var afficher= []

      for(var i = 0 ; i <text_leng; i++){
        afficher.push(React.createElement('span',{className:'items',id : i},text.charAt(i)));
      }

        this.setState({
          div: afficher,
          active:1,
          on:1
        });


      this.incrument()

 }

 recontinus=()=>{

  document.getElementById('continus').style.display='none';
  document.getElementById('dactylo').style.display='block';

  this.setState({
    state: 1
  });

  this.incrument()

 }

 Restart=()=>{

  document.getElementById('home_container').style.display='none';
  document.getElementById('roum').style.display='none';
  document.getElementById('dactylo').style.display='block';

  var text=  this.state.text;
  var text_leng= text.length;

  var afficher= []

  for(var i = 0 ; i <text_leng; i++){
    afficher.push(React.createElement('span',{className:'items',id : i},text.charAt(i)));
    document.getElementById(i+'').classList.remove('opp');
    document.getElementById(i+'').style='background-color:transparent';
  }

  this.setState({
    div: afficher,
    seconds:0,
    second:60,
    minute:1,
    point:0,
    state:1,
    augmenter:null,
    active:1,
    on:1,
    word:0
  });


  setTimeout(()=>{
    this.incrument()
  },5)

 }

 componentWillUpdate=()=>{
  this.visualViewport();
 }
 componentWillMount=()=>{
   window.scrollTo(0,0);
   window.addEventListener('keydown', function(e) {
      if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
      }
  });
   if(window.location.pathname == '/quiz/Dactylographie'){
      document.addEventListener("keydown",this.onkeyDown)
   }
 }
 componentWillUnmount=()=>{
    sessionStorage.setItem('point',this.state.score);
    document.removeEventListener("keydown",this.onkeyDown)
    this.setState({
      active:0
    });

 }

 onkeyDown=(event)=>{

   if(this.state.active == 1){

    const events = event.key;
        var tableau = [
            'Tab',
            'Enter',
            'Escape',
            'ArrowLeft',
            'ArrowDown' ,
            'ArrowRight',
            'ArrowUp' ,
            'Shift' ,
            'Control',
            'Alt'
        ]

   if(event.key == 'Backspace'){
       if(this.state.augmenter != null){
         if(document.getElementById((this.state.augmenter*1) +'').style.cssText == 'background-color: green;'){
          this.setState({
            word: this.state.word - 1
          })
         }

                   if(this.state.augmenter != 0){
                           document.getElementById(this.state.augmenter+'').style='background-color:transparent';

                             if(this.state.augmenter == (this.state.text.length*1 -1 )){
                                 document.getElementById((this.state.augmenter)+'').classList.remove('opp');
                             }else{
                                 document.getElementById((this.state.augmenter +1)+'').classList.remove('opp');
                             }
                           document.getElementById(this.state.augmenter+'').classList.add('opp');
                           if(this.state.augmenter >= 0){
                            this.setState({
                              augmenter: this.state.augmenter - 1
                          });
                   }

              }else if(this.state.augmenter*1 == 0){
                document.getElementById('0').style='background-color:transparent';
                document.getElementById('1').classList.remove('opp');
                document.getElementById('0').classList.add('opp');
                  this.setState({
                    augmenter: null
                  });
            }
     }
   }else if(tableau.includes(events+'') == false){

               if(this.state.augmenter < (this.state.text.length*1 -1 )){
                  if(this.state.augmenter == null){
                    this.setState({
                     augmenter: 0
                    });
                  }else{
                    this.setState({
                     augmenter: this.state.augmenter + 1
                    });
                  }
                }
                var data= this.state.augmenter+'';
                if(event.key == this.state.text.charAt(this.state.augmenter))
                {
                  document.getElementById(data).style='background-color:green';
                  this.setState({
                    word: this.state.word + 1
                  })
                }else{
                  document.getElementById(data).style='background-color:red';
                }



                  if(this.state.augmenter == (this.state.text.length)*1 -1 ){
                    document.getElementById(this.state.augmenter+'').classList.remove('opp');
                  }else{
                    document.getElementById((this.state.augmenter +1)+'').classList.add('opp');
                    document.getElementById(this.state.augmenter+'').classList.remove('opp');
                  }
         }

  }
}

 save=()=>{

  const { cookies } = this.props;

   this.setState({
       redirect:true
   });
 }

 renderRedirection=()=>{

  var url = window.location.pathname;
  var categorie = url.split('/');
  var element = categorie[2];
  var redirection= '/tableau-de-bord-quiz/'+element;
  
      if(this.state.redirect){
          return <Redirect to={redirection} />
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
                    <Link onClick={()=>{ this.Restart() }} id='btn_restart_test'>Recommencer </Link>
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


 render() {
    const element= React.createElement('h1',{},"Dactylo");
    const {div}= this.state;
    const {point}= this.state;
    const {minute}= this.state;
    const {second}= this.state;
    return (
      <div>

        
          <MetaTags>
            <meta property="og:description" content="Combien de mots par minute pouvez-vous taper pendant une minute ?." />
            <meta property="og:title" content="Dactylo" />
            <meta property="og:image" content="/img/11.png" />
          </MetaTags>
        {this.renderRedirection()}

            <div className='home' id='home'>
                <div id='home_container' className='up'>
                  <center>
                      <img src='/img/11.png'/>
                          {element}
                          <p>Combien de mots par minute pouvez-vous taper pendant une minute ?</p>
                      <button  id="btn_start"  onClick={()=>{this.start()}}>Commencer</button>
                  </center>
                </div>

                <div id='continus'>
                  <center>
                      <img src='/img/9.png'/>
                          {element}
                          <p>Un problem est survenu </p>
                      <button  id="btn_start"  onClick={()=>{this.recontinus()}}>Reprende</button>
                  </center>
                </div>

            <div id='dactylo'>

              <h1>{point}</h1>
                <div class='dact'>
                    {div}
                </div>
                <div class='time'>
                    {second}
                </div>
            </div>

            <div id='dactere'>
                <div class='dactere'>
                  Ce test est destiné à être effectué avec un clavier veuillez le faire sur un ordinateur de bureau ou un portable
                  (ou agrandisser la fenêtre de votre navigateur).
                </div>
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
                        <ChartDactylo />
                    </div>

                    <div className='container_ro'>
                    <h1>À propos du test</h1>
                    <b>
                        il s'agit d'un simple test de vitesse de frappe, de mesure
                        des mots par minute ou PWM.<br/><br/>
                        La mesure standard de PWM est (5* nombre de caractères)/(temps pris).Par cette mesure,
                        "renard brun rapide" est de 15 caractères , espaces compris .<br/><br/>
                        Le score enregistré est la précision WPM *.
                        <br/>
                        <br/>
                        <br/>
                    </b>
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
            <KeyboardEventHandler
              handleKeys={['ctrl+a']}
              onKeyEvent={(key, e) => e.preventDefault()
             } />
      </div>
    )
  }
}

export default withCookies(dactylo);
