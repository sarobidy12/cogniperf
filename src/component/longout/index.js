import React , { Component } from 'react';
import { Link , Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie'
;
import { GoogleLogout } from 'react-google-login';
class Loungput extends Component {
constructor(props){
    super(props);
    this.state={
        redirect :false
    }
}
 
componentDidMount=()=>{

    this.setState({
        redirect: true,
        block:1
    })
    
    sessionStorage.clear();
    if(window.screen.width <= 768){

        document.getElementById('sidebar').classList.remove('openSidebar');
        document.getElementById('sidebar').classList.add('close');

            setTimeout(()=>{
                document.getElementById('closeSide').style.display='none';
                document.getElementById('sidebar').style='left:-80%'
                document.getElementById('sidebar').classList.remove('close');
            },1);

    }
    
}

componentWillUnmount=()=>{
    const { cookies } = this.props;
    cookies.remove('lo_');
    cookies.remove('auth_');
    
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
    return <Redirect  to='/se-connecter' />

}

}
export default withCookies(Loungput);