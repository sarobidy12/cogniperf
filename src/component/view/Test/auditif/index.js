import React , { Component }from 'react';
import { Redirect,Link } from 'react-router-dom';
import ChartAudio from '../../chart/audio/index';
import Bottom from '../../../licence/index';
import { withCookies, Cookies } from 'react-cookie';
import MetaTags from 'react-meta-tags';

class Auditif extends Component{

    constructor(props){
        super(props);
        this.state = {
            frequence: 20000,
            state:1,
            redirect:false
        }

        this.contextAudio = new AudioContext();
        this.oscillator = this.contextAudio.createOscillator();
    }


  componentDidMount=()=>{

    var url = window.location.pathname;
    var categorie = url.split('/');
    var element = decodeURI(categorie[2]);

    sessionStorage.setItem('test',element);
    document.title = 'Cogniperf - '+element;

  }

  componentWillMount=()=>{

    window.scrollTo(0,0);

  }

    Start = () =>{
        document.getElementById('home_container').style.display='none';
        document.getElementById('auditif').style.display='block';
        this.oscillator.connect(this.contextAudio.destination);
        this.oscillator.type='sine';
        this.oscillator.frequency.setValueAtTime(this.state.frequence, this.contextAudio.currentTime);
         this.inscrument();
        this.oscillator.start();
    }

    inscrument = ()=>{
        if(this.state.state  == 1){

            setTimeout(() => {
                this.setState({
                        frequence  : this.state.frequence - 1,
                });

                if(this.state.frequence < 19300){
                    this.oscillator.frequency.setValueAtTime( this.state.frequence+700, this.contextAudio.currentTime + 1);
                }
                this.inscrument();
            }, 1);
        }

    }
    pauses =()=>{

        const { cookies } = this.props;

        this.setState({
            state: 0
        });
        this.inscrument();
        this.oscillator.disconnect();
        document.getElementById('auditif').style.display='none';
        document.getElementById('roum').style.display='block';
        setTimeout(()=>{
            this.setState({
                state: 1
            });
        },1);
        if(cookies.get('lo_')){
            this.save()
        }
    }

    Retart= ()=>{
        
            this.setState({
                 frequence: 20000,
            })

            document.getElementById('home_container').style.display='none';
            document.getElementById('roum').style.display='none';
            document.getElementById('auditif').style.display='block';
            setTimeout(()=>{
                    this.oscillator.connect(this.contextAudio.destination);
                    this.oscillator.type='sine';
                    this.oscillator.frequency.setValueAtTime( this.state.frequence, this.contextAudio.currentTime);
                    this.inscrument();
            },200);
    }


    componentWillUnmount=()=>{

        if(this.state.frequence !== 20000){
            sessionStorage.setItem('point',this.state.frequence+'');
        }

    }

    save=()=>{
        this.setState({
            redirect:true
        });
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

    result=()=>{
        const { cookies } = this.props;

        if(!cookies.get('lo_')){
            return  <div id='result_test'>
                        <h1>
                        Connectez-vous pour voir vos résultats .
                        </h1>
                        <center>
                            <Link onClick={()=>{ this.Retart() }} id='btn_restart_test'>Recommencer </Link>
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

    render()
    {

        const {frequence} = this.state;
        const {state} = this.state;

        return (
            <div>

          <MetaTags>
            <meta property="og:description" content=" Vous allez en entendre un son qui augmente de volume petit à petit. Dès que vous pouvez entendre le son appuyer sur J'ENTENDS LE SON ." />
            <meta property="og:title" content="Test de son auditif" />
            <meta property="og:image" content="/img/7.png" />
          </MetaTags>
                {this.renderRedirection()}
                <div className='home'>
                <div id='particle'>

                        </div>
                        <div id='home_container' className='up'>
                                <center>
                                    <img src='/img/7.png'/>
                                    <h1>Test de son auditif</h1>
                                    <p>                                   
                                    Vous allez en entendre un son qui augmente de volume petit à petit. Dès que vous pouvez entendre le son appuyer sur "J'ENTENDS LE SON".</p>
                                    <button id="btn_start" onClick={()=>{ this.Start() }}>Commencer</button>
                                </center>
                        </div>
                        <div id='auditif'>
                                <center>
                                    
                                    <img src='/img/7.png'/>
                                    <br/>

                                    <p>
                                     Vous allez entendre un son entre <br />
                                       <h2 className='opacity'> 20.000MHZ et 10MHz. </h2>
                                    </p>

                                <button id="btn_start" onClick={()=>{ this.pauses() }}>J'entends le son </button>
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

                    <h1>Statistique</h1>
                        <ChartAudio />
                    </div>

                    <div className='container_ro'>
                        <h1>À propos du test</h1>
                        <b>
                                La perte auditive haute fréquence est courante et a tendence à progresser avec l'âge.<br/><br/>
                                Ce test est mieux effectué avec un casque décent à un volume modéré .Les écouteurs, le volume,
                                le bruit de fond et d'autres facteurs peuvent affecter les résultats .<br/><br/>
                                Avertissement: ce n'est un test médical.Si vous n'êtes préoccupé par une perte auditive,
                                veuillez consulter un médecin.
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
        );
    }
}

export default withCookies(Auditif);