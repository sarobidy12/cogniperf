import React , { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import Chiffre from '../chartDasbord/chiffre/index'
import Auditif from '../chartDasbord/audio/index'
import Dactylo from '../chartDasbord/dactylo/index'
import Reaction from '../chartDasbord/reflexe/index'
import Memoire_verbal from '../chartDasbord/verbal/index'
import Memoire_visuel from '../chartDasbord/visuel/index'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import moment from 'moment';
import GetEvolution from './getEvolution';
import Moment from 'react-moment';
import 'moment/locale/fr';
import axios from 'axios';
import Bouttom from '../../licence/index';

class Dasboard_test extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);
        this.state={
            id:null,
            nom:null,
            prenom:null,
            email:null,
            redirect :false,
            id_categorie:null,
            url:null,
            point:null,
            add:1,
        }
    }

getChart=()=>{

    var url = window.location.pathname;
    var categorie = url.split('/');
    const element = decodeURI(categorie[2]);
 
    if( element === 'Mémoire-des-chiffres'){
        return <Chiffre />
    }else if(element === 'Fréquences-Auditives'){
        return <Auditif />
    }else if(element === 'Temps-de-Réaction'){
        return <Reaction />
    }else if(element === 'Dactylographie'){
        return <Dactylo />
    }else if(element === 'Mémoire-des-mots'){
        return <Memoire_verbal />
    }else if(element === 'Mémoire-visuelle'){
        return <Memoire_visuel />
    }
}

chiffre = ()=>{

    const { cookies } = this.props;
    var url = window.location.pathname;
    var categorie = url.split('/');
    const element = decodeURI(categorie[2]);

    if(element === 'Mémoire-des-chiffres'){
        let a= []
        if(Array.isArray(cookies.get('auth_').chiffre)){
           for(var i=0;i <  cookies.get('auth_').chiffre.length ; i++){
                a.push(cookies.get('auth_').chiffre[i]);
           }
        }
        a.push(sessionStorage.getItem('point'));
        return a;
    }else{
        return cookies.get('auth_').chiffre;
    }

}


reflexe = ()=>{

    const { cookies } = this.props;

    var url = window.location.pathname;
    var categorie = url.split('/');
    const element = decodeURI(categorie[2]);

    if(element === 'Temps-de-Réaction'){
        let a= []
        if(Array.isArray(cookies.get('auth_').reflexe)){
           for(var i=0;i <  cookies.get('auth_').reflexe.length ; i++){
                a.push(cookies.get('auth_').reflexe[i]);
           }
        }
        a.push(sessionStorage.getItem('point')*1);
        return a;
    }else{
        return cookies.get('auth_').reflexe;
    }

}

auditif = ()=>{
    const { cookies } = this.props;
    var url = window.location.pathname;
    var categorie = url.split('/');
    const element = decodeURI(categorie[2]);

    if(element === 'Fréquences-Auditives'){
        let a= []
        if(Array.isArray(cookies.get('auth_').auditif)){
           for(var i=0;i <  cookies.get('auth_').auditif.length ; i++){
                a.push(cookies.get('auth_').auditif[i]);
           }
        }
        a.push(sessionStorage.getItem('point'));
        return a;
    }else{
        return cookies.get('auth_').auditif;
    }

}


Memoire_visuel = ()=>{
    const { cookies } = this.props;

    var url = window.location.pathname;
    var categorie = url.split('/');
    const element = decodeURI(categorie[2]);

    if(element === 'Mémoire-visuelle'){
        let a= []
        if(Array.isArray(cookies.get('auth_').memoire_visuel)){
           for(var i=0;i <  cookies.get('auth_').memoire_visuel.length ; i++){
                a.push(cookies.get('auth_').memoire_visuel[i]);
           }
        }
        a.push(sessionStorage.getItem('point'));

        return a;
    }else{
        return cookies.get('auth_').memoire_verbal;
    }


}

memoire_verbal = ()=>{

    const { cookies } = this.props;
    var url = window.location.pathname;
    var categorie = url.split('/');
    const element = decodeURI(categorie[2]);

    if(element === 'Mémoire-des-mots'){
        let a= []
        if(Array.isArray(cookies.get('auth_').memoire_verbal)){
           for(var i=0;i <  cookies.get('auth_').memoire_verbal.length ; i++){
                a.push(cookies.get('auth_').memoire_verbal[i]);
           }
        }
        a.push(sessionStorage.getItem('point'));
        return a;
    }else{
        return cookies.get('auth_').memoire_verbal;
    }

}


dactylo = ()=>{

        const { cookies } = this.props;

        var url = window.location.pathname;
        var categorie = url.split('/');
        const element = decodeURI(categorie[2]);

        if(element === 'Dactylographie'){
            let a= [];
            if(Array.isArray(cookies.get('auth_').dactylo)){
               for(var i=0;i <  cookies.get('auth_').dactylo.length ; i++){
                    a.push(cookies.get('auth_').dactylo[i]);
               }
            }
            a.push(sessionStorage.getItem('point'));
            return a;
        }else{
            return cookies.get('auth_').dactylo;
        }

}


activiter = ()=>{
    const { cookies } = this.props;
    var now = moment();
    var url = window.location.pathname;
    var categorie = url.split('/');
    const element = decodeURI(categorie[2]);
        let a= [];

        if(Array.isArray(cookies.get('auth_').activiter)){
           for(var i=0;i <  cookies.get('auth_').activiter.length ; i++){
                a.push({
                    activiter : cookies.get('auth_').activiter[i].activiter,
                    date :  cookies.get('auth_').activiter[i].date,
                    point :  cookies.get('auth_').activiter[i].point,
                });
           }
        }

        a.push({
            activiter : element,
            date : new Date(),
            point :  sessionStorage.getItem('point'),
        });
        return a;

}
 
componentDidMount =()=>{
    const { cookies } = this.props;

 
    window.scrollTo(0,0);
    moment.locale('fr');
    var url = window.location.pathname;
    var categorie = url.split('/');

    const element = decodeURI(categorie[2]);

    this.setState({
        url: '/quiz/'+element
    })

    document.title = 'Cogniperf - Tableau de bord';
    this.setState({
        point: sessionStorage.getItem('point')
    })
    if(sessionStorage.getItem('point')){
        if(cookies.get('auth_')){
            cookies.set('auth_',{
                utilisateur:'Utilisateur inviter',
                date: cookies.get('auth_').date,
                chiffre:this.chiffre(),
                reflexe:this.reflexe(),
                auditif:this.auditif(),
                memoire_verbal:this.memoire_verbal(),
                memoire_visuel:this.Memoire_visuel(),
                dactylo:this.dactylo(),
                activiter: this.activiter()
            });

         }
    }

    if(cookies.get('lo_')){
        this.setState({
            email: cookies.get('lo_')
        })
    }else{
        this.setState({
            nom: 'Utilisateur ',
            prenom: 'Inviter',
            email: null
        });
    }
    
}

componentWillMount=()=>{
    this.getUse();
}

getCategorie=()=>{

        var url = window.location.pathname;
        var categorie = url.split('/');
        var element = decodeURI(categorie[2]);

            if(element === 'Mémoire-des-mots'){
                var data=3;
            }else if(element === 'Mémoire-visuelle'){
                var data=5;
            }else if(element === 'Mémoire-des-chiffres'){
                var data=1;
            }else   if( element === 'Temps-de-Réaction'){
                var data=2;
            }else if(element === 'Fréquences-Auditives'){
                var data=6;
            }else if(element === 'Dactylographie'){
                var data=4;

            }
                
                this.setState({
                    id_categorie:data
                });

                this.save();
      
}

getUse=()=>{

    const { cookies } = this.props;
     if(cookies.get('lo_') != null ){
            this.setState({
                id:cookies.get('lo_').id,
                nom:cookies.get('lo_').nom,
                prenom:cookies.get('lo_').prenom,
            })

            this.getCategorie()
    } 

}

point=()=>{

    if(sessionStorage.getItem('point') != null){
        return  <b>{sessionStorage.getItem('point')*1}</b>
    }
    
}

share=()=>{
    window.open('https://web.facebook.com/sharer/sharer.php?u=https://www.cogniperf.com?title='+this.title()+'/'+this.description()+'/'+this.state.nom+'/'+this.state.prenom+'/'+sessionStorage.getItem('test').replace("é",'e')+'/'+sessionStorage.getItem('point'),'sharer','toolbar=0,status=0,width=580,height=325');

//       window.open('https://www.facebook.com/dialog/feed?app_id=188933402177127&display=popup&link=https://www.cogniperf.com?title='+this.title()+'/'+this.description()+'/'+this.state.nom+'/'+this.state.prenom+'/'+sessionStorage.getItem('test').replace("é",'e')+'/'+sessionStorage.getItem('point'),'sharer','toolbar=0,status=0,width=580,height=325');
} 

button = ()=>{

    const { cookies } = this.props;

    if(sessionStorage.getItem('point') != null){

                    return <div className='button'>
                                <button id='share_fb' onClick={()=>{this.share()}}>
                                <span><img src='/img/facebook.png'/></span>   Partager sur facebook
                                </button>
                            </div>
            }
    }

save=()=>{

    console.log([this.state.id,this.state.point*1,this.state.id_categorie]);

    setTimeout(()=>{
        let formData= new FormData();
        formData.append("text",[this.state.id,this.state.point*1,this.state.id_categorie]);
        const url= 'https://www.cogniperf.com/api/add_point.php';
        axios.post(url,formData)
        .then((res)=>{
            
        })
    },100)

}

getUniterPoint=(val,element)=>{
    var element = decodeURI(element);
 
    if( element === 'Temps-de-Réaction'){
        return val+' ms';
    }else if(element === 'Fréquences-Auditives'){
        return val+' Hz';
    }else if(element === 'Dactylographie'){
        return val+'WPM';
    }else{
        return val+' point';
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
        }else if(element === 'Temps-de-Réaction'){
            return 'Temps de Réaction';
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

            for(var i=0; i< cookies.get('auth_').activiter.length ; i++)
            {
            const img ='/img/'+reverse[i].activiter+'.png';
                a.push(
                    React.createElement('div',{},
                    <div className='ul_activiter'>
                        <ul>
                            <li><img src={img.replace("é",'e')} className='img_dasboard' /></li>
                            <li> <Link to={ '/quiz/'+reverse[i].activiter}>{ this.getName(reverse[i].activiter)}</Link></li>
                            <li>
                                <Moment  fromNow>
                                    {reverse[i].date}
                                </Moment>
                            </li>
                            <li>{ this.getUniterPoint(reverse[i].point,reverse[i].activiter)}</li>
                        </ul>
                    </div>
                    )
                )
            }
            return a;
        }else{
            return <h1>Aucune activiter </h1>
        }

}



description=()=>{
    
    var url = window.location.pathname;

        var categorie = url.split('/');
        var element = decodeURI(categorie[2]);

        if(element === 'Mémoire-des-mots'){
            return 'Essayez de rappeler si vous avez déjà vu ce mot.';
        }else if(element === 'Mémoire-visuelle'){
          return 'Essayez de rappeler tous les carrés qui change en blanc.';
        }else if(element === 'Mémoire-des-chiffres'){
          return 'Essayez de rappeler le plus long chiffre possible.';
        }else   if( element === 'Temps-de-Réaction'){
            return 'Testez vos réflexes visuels.';
        }else if(element === 'Fréquences-Auditives'){
            return 'Test de la perte auditive en écoutant un son à haute fréquence.';
        }else if(element === 'Dactylographie'){
            return 'Combien de mot par minute pouvez-vous taper?';
        }
        
}

title=()=>{
    
    var url = window.location.pathname;
        var categorie = url.split('/');
        var element = decodeURI(categorie[2])

        if(element === 'Mémoire-des-mots'){
            return 'Test de mémoire verbal';
        }else if(element === 'Mémoire-visuelle'){
            return 'Test de mémoire visuel';
        }else if(element === 'Mémoire-des-chiffres'){
            return 'Test de mémoire des chiffres';
        }else   if( element === 'Temps-de-Réaction'){
            return 'Test de temps de réaction';
        }else if(element === 'Fréquences-Auditives'){
            return 'Test de son auditif';
        }else if(element === 'Dactylographie'){
            return 'Test de Dactylographie';
        }
 
        
}

getUniter=()=>{

    var url = window.location.pathname;
        var categorie = url.split('/');
        var element = decodeURI(categorie[2])
    if(element === 'Temps-de-Réaction'){
        return 'Ms';
    }else if(element === 'Fréquences-Auditives'){
        return 'Hz';
    }else if(element === 'Dactylographie'){
        return 'WPM';
    }else{
        return 'Points';
    }
}

 render(){
    const { cookies } = this.props;
    const {nom} = this.state;
    const {prenom} = this.state;
    const {url} = this.state;
    return (
        <div>
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
                        {this.button()}
                        </center>
                </div>
            <div className='users'>
                    <div className='gePoint'>
                        <h1>Resultat</h1>
                        <br/>
                       <b>
                            {this.point()}
                       </b>
                       <h2>
                           {this.getUniter()}
                        </h2>
                       <br/>
                       <p className='opacity'>
                           <Link to={url}>Faire le test</Link>
                       </p>
                    </div>

                 <div className='chart_all'>
                     {this.getChart()}
                 </div>


                 <div className='chart_all'>
                     <h1>Evolution </h1>
                     <GetEvolution />
                 </div>

                 <div className='Activiter'>
                     <div>
                        <h1>Flux  D'activité </h1>
                        {this.getActiviter()}
                    </div>
                 </div>

                 <Bouttom />

            </div>
            </div>
            </div>
            </div>
    );
 }
}

export default withCookies(Dasboard_test);
