import React , { Component }from 'react';
import './App.css';

//import './../node_modules/bootstrap/dist/css/bootstrap.css';
import { BrowserRouter , Route } from 'react-router-dom';
import NavBar from './component/view/Nav/index';
import Index from './component/view/Index/index';
import Dasboard from './component/view/Dasboard/index';
import Dasboard_test from './component/view/Dasboard_test/index';
import verification from './component/verification/index';
import mdp from './component/mdp/index';
import reset from './component/mdp/reset';
import loungout from './component/longout/index';

//test chiffre
import chiffre from './component/view/Test/chiffre/index';
import reflexe from './component/view/Test/reflexe/index';
import dactylo from './component/view/Test/dactylo/index';
import auditif from './component/view/Test/auditif/index';
import visuel from './component/view/Test/visuel/index';
import verbal from './component/view/Test/verbal/index';

//login
import Facebook from'./component/login/index';
import sign from'./component/sign/index';

//bottom
import licence from'./component/licening/index';

//objet
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { TransitionGroup, CSSTransition } from "react-transition-group";


class App extends Component{
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentWillMount = ()=>{
    const { cookies } = this.props;

  
    let d= new Date();
    d.setTime(d.getTime()+ (60));

    if(!cookies.get('auth_')){
        cookies.set('auth_',{
              utilisateur:'Utilisateur inviter',
              date: new Date(),
              chiffre:null,
              reflexe:null,
              auditif:null,
              memoire_visuel:null,
              memoire_verbal:null,
              dactylo:null,
              activiter: null
      });
    }

  }
 
  render(){

 

  return (
      <div>
        <TransitionGroup>
              <CSSTransition
                timeout={{ enter: 300, exit: 300 }}
                classNames={'fade'}
              >
              <BrowserRouter>
                  <NavBar/>
                  <Route path="/" component={Index} exact />
                          <Route path="/tableau-de-bord" component={Dasboard} />
                          <Route path="/quiz/Mémoire-des-chiffres" component={chiffre} />
                          <Route path="/quiz/Temps-de-Réaction" component={reflexe} />
                          <Route path="/quiz/Mémoire-des-mots" component={verbal} />
                          <Route path="/quiz/Mémoire-visuelle" component={visuel} />
                          <Route path="/quiz/Fréquences-Auditives" component={auditif} />
                          <Route path="/quiz/Dactylographie" component={dactylo} />
                          <Route path="/tableau-de-bord-quiz/:ok" component={Dasboard_test} />
                          <Route path="/se-connecter" component={Facebook} />
                          <Route path="/inscription" component={sign} />
                          <Route path="/politique-de-confidentialité" component={licence} />
                          <Route path="/longOut" component={loungout} />
                          <Route path="/verification-inscription" component={verification} />
                          <Route path="/Réinitialiser-le-mot-de-passe" component={mdp} />
                          <Route path="/account/password-reset/:io" component={reset} />
                  </BrowserRouter>
              </CSSTransition>
        </TransitionGroup>
        </div>

    );
  }
}

export default withCookies(App);

