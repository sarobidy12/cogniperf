import React , { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import moment from 'moment';
import Moment from 'react-moment';
import GetEvolutionDasborard from './evolution';
import 'moment/locale/fr'  ;
import {Link} from 'react-router-dom';
import Bouttom from '../../licence/index';
import axios from 'axios';
import MetaTags from 'react-meta-tags';

class Dasboard extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

    constructor(props){
        super(props);
        this.state={
            id:null,
            nom:'Utilisateur',
            prenom:'Inviter',
            email:null,
            redirect :false,
            id_categorie:false
        }
    }

    componentDidMount =()=>{
      const { cookies } = this.props;

      window.scrollTo(0,0);

        if(cookies.get('lo_') != null){
            this.setState({
                email: cookies.get('lo_')
            })
            setTimeout(()=>{
                this.getUse();
            },100);
        }else{
            this.setState({
                nom: 'Utilisateur ',
                prenom: 'Inviter',
            });
        }

      document.title = 'Cogniperf - Tableau de bord';
      this.getActiviter();
      this.getUse();
    }

    getUse=()=>{

        const { cookies } = this.props;
    
        if(cookies.get('lo_') != null ){
                this.setState({
                    nom:cookies.get('lo_').nom,
                    prenom:cookies.get('lo_').prenom,
                })
        }

    }

    getUniter=(val,element)=>{
        
            if(element === 'Temps-de-Réaction'){
                return val+' Ms';
            }else if(element === 'Fréquences-Auditives'){
                return val+' Hz';
            }else if(element === 'Dactylographie'){
                return val+' WPM';
            }else{
                return val+' Points';
            }
 
    }
    getName=(element)=>{
        var element = decodeURI(element);
    
        if(element === 'Mémoire-des-mots'){
            return ' Mémoire des mots';
        }else if(element === 'Mémoire-visuelle'){
            return 'Mémoire visuelle';
        }else if(element === 'Mémoire-des-chiffres'){
            return 'Mémoire des chiffres';
        }
        else{
            var element = decodeURI(element);
            return element.replace("-"," ");
        }

    }

    getActiviter= ()=>{

        const { cookies } = this.props;

        if(cookies.get('auth_').activiter){

            var a = [];

            var reverse =cookies.get('auth_').activiter.reverse();

            console.log(reverse);
            for(var i=0; i< cookies.get('auth_').activiter.length ; i++)
            {
            const img ='/img/'+reverse[i].activiter+'.png';
                a.push(
                    React.createElement('div',{},
                    <div className='ul_activiter'>
                    <ul>
                        <li><img src={img.replace("é",'e')} className='img_dasboard' /></li>
                        <li> <Link to={ '/quiz/'+decodeURI(reverse[i].activiter)}>{ this.getName(decodeURI(reverse[i].activiter))}</Link></li>
                        <li>
                            <Moment  fromNow>
                                {reverse[i].date}
                            </Moment>
                        </li>
                        <li>{ this.getUniter(reverse[i].point,reverse[i].activiter)}</li>
                    </ul>
                </div>
                    )
                )

            }
           return  <div className='Activiter'>
                    <h1>Flux  D'activité </h1>
                    {a}
                    </div>;

        }else{

            return <div id='uop'>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <b>Vous n'avez encore enregistré aucun score. </b>
            </div>
        }

    }

 render(){
    const { cookies } = this.props;
    const {nom} = this.state;
    const {prenom} = this.state;

    return (
        <div>

         <MetaTags>
            <meta property="og:title" content="tableau de bord" />
            <meta property="og:image" content="/img/home.png" />
          </MetaTags>
                <div id='body'>

                        <div className='getUser'>
                        </div>

                    <div id='paralax'>

                        <div className='user_dash'>
                            <center>
                                    <ul>
                                        <li>
                                                <h1>
                                                    {nom}
                                                </h1>
                                        </li>
                                        <li>
                                                <h2>
                                                    {prenom}
                                                </h2>
                                        </li>
                                    </ul>

                                    <em>
                                        Connectée <span>
                                                    <Moment  fromNow>
                                                        {cookies.get('auth_').date}
                                                    </Moment>
                                        </span>
                                    </em>
                                    <br/>
                                    <br/>
                                    </center>
                            </div>

                        <div className='users'>
                        <div>
                        <GetEvolutionDasborard/>
                </div>
                          {this.getActiviter()}
                            <Bouttom />
                </div>
        </div>
        </div>
                </div>
    );
 }
}

export default withCookies(Dasboard);
