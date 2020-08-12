import React , { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import Bouttom from '../../licence/index';
import { withCookies, Cookies } from 'react-cookie';
import $ from 'jquery';
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Index extends Component {

    componentWillUnmount=()=>{
        $('html').removeAttr("scroll-behavior");
    }

    componentDidMount =()=>{
        const { cookies } = this.props;
        window.scrollTo(0,0);
        document.title = 'Cogniperf - Testez votre cerveau';
        $('html').css('scroll-behavior','smooth');
    }
 
     render=()=>{
        return (
            <div>

                <div id='scroll'>

                <div className='home'>
            <div id='particle'>
            <Particles
    params={{
	    "particles": {
	        "number": {
	            "value": 160,
	            "density": {
	                "enable": false
	            }
	        },
	        "size": {
	            "value": 3,
	            "random": true,
	            "anim": {
	                "speed": 4,
	                "size_min": 0.3
	            }
	        },
	        "line_linked": {
	            "enable": false
	        },
	        "move": {
	            "random": true,
	            "speed": 1,
	            "direction": "top",
	            "out_mode": "out"
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "bubble"
	            },
	            "onclick": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        },
	        "modes": {
	            "bubble": {
	                "distance": 250,
	                "duration": 2,
	                "size": 1,
	                "opacity": 0
	            },
	            "repulse": {
	                "distance": 400,
	                "duration": 4
	            }
	        }
	    }
	}} />
</div>

                <div id='home_container' className='up'>
                        <center>
                                <img src='/img/home.png'/>
                                <h1>Testez votre cerveau </h1>
                                <p>Mesurez vos capacités et suivez vos statistiques </p>

                                <div id='btn_scroll' onClick={()=>{ 

                                        if(window.screen.width <= 414){
                                            document.getElementById('scroll').scrollTo(0,565)  
                                        }else{
                                            document.getElementById('scroll').scrollTo(0,630)                                       
                                        }
                                    }}>
                                <img src='/img/down.png'/> 
                                </div>
                               
                            </center>
                        </div>
                </div>

                <div className='container'>
                    <Link to='/quiz/Mémoire-des-chiffres'>
                        <div className='test red'  >
                        <center>
                    <img src='/img/Memoire-des-chiffres.png'/>
                                </center>
                                <h1>Mémoire des chiffres</h1>
                                <p>Essayez de rappeler le plus long chiffre possible.</p>
                        </div>
                    </Link>

                   <Link to='/quiz/Temps-de-Réaction'>
                        <div className='test yellow' >
                        <center>
                    <img src='/img/Temps-de-Reaction.png'/>
                                </center>
                                <h1>Temps de Réaction</h1>
                                <p>Testez vos réflexes visuels.</p>
                        </div>
                   </Link>

                   <Link to='/quiz/Mémoire-des-mots'>
                        <div className='test green' >
                                <center>
                            <img src='/img/Memoire-des-mots.png'/>
                                </center>
                                <h1>Mémoire des mots</h1>
                                <p> Essayez de rappeler si vous avez déjà vu ce mot.
                                </p>
                        </div>
                    </Link>

                    <Link to='/quiz/Mémoire-visuelle'>
                        <div className='test blue' >
                                <center>
                            <img src='/img/Memoire-visuelle.png'/>
                                </center>
                                <h1>Mémoire visuelle</h1>
                                <p>Essayez de rappeler tous les carrés qui change en blanc.</p>
                        </div>
                    </Link>

                    <Link to='/quiz/Fréquences-Auditives'>
                        <div className='test violet' >
                                <center>
                            <img src='/img/Frequences-Auditives.png'/>
                                </center>
                                <h1>Fréquences  Auditives</h1>
                                <p>Test de la perte auditive en écoutant un son à haute fréquence.</p>
                        </div>
                    </Link>

                    <Link to='/quiz/Dactylographie'>
                        <div className='test marron' >
                                <center>
                            <img src='/img/Dactylographie.png'/>
                                </center>
                                <h1>Dactylographie</h1>
                                <p>Combien de mot par minute pouvez-vous taper?</p>
                        </div>
                    </Link>
                    <br />

                <div id='olll'>
                    <Bouttom />
                </div>
                </div>
                </div>
                </div>

        )
    }

}
export default withCookies(Index);
