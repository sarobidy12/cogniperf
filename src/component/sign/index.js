import React , { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import Bouttom from '../licence/index';

class sign extends Component {

    constructor(props){
        super(props);
        this.state={
            isLoggerdIn : false,
            nom:'',
            prenom:'',
            mail:'',
            password:'',
            password2:'',
            element:[],
            message:'',
            cgu:false,
            redirect:false
        }
    }


    componentDidMount=()=>{
        window.scrollTo(0,0);
        document.title = 'Cogniperf.com - S\'inscrire';
     }

    componentClicked= ()=>{
        console.log('click');
    }

 handSubmit=events=>{

    events.preventDefault();

    if(this.state.cgu){
    document.getElementById('check').style='background-color:transparent';
        
        document.getElementById('ioirl').style.display='none';
        document.getElementById('resll').style.display='block';
        document.getElementById('resll').innerHTML="<div><img src='/img/loader.gif'/></div>";

        if(this.state.password === this.state.password2){
            
            if(this.state.password.length >= 6){
 
                    let formData= new FormData();
                    formData.append("text",[this.state.nom, this.state.prenom,this.state.mail,this.state.password]);
                    const url= 'https://www.cogniperf.com/api/sign.php';
        
                    axios.post(url,formData)
                    .then((res)=>{
                        if(res.data === 'add'){

                            var rand=Math.floor(Math.random() * ((99999 - 9999)));
                            sessionStorage.setItem('c_',rand)
                            let formData= new FormData();
                            formData.append("text",[this.state.nom, this.state.prenom,this.state.mail,rand]);
                            const url= 'https://www.cogniperf.com/api/send_mail_comfirmation.php';
                
                            axios.post(url,formData)
                            .then((res)=>{
                            
                                if(res.data === 'ok'){

                                    this.setState({
                                        redirect:true
                                    })
                                 }
                                })

                        }else{
                            document.getElementById('err_login').style.display='block';
                            document.getElementById('err_login').innerHTML=res.data;
                            document.getElementById('ioirl').style.display='block';
                            document.getElementById('resll').style.display='none';
                        }
                    })
        }else{
            document.getElementById('ioirl').style.display='block';
            document.getElementById('resll').style.display='none';
             document.getElementById('err_login').style.display='block';
             document.getElementById('err_login').innerHTML='les mot de passe sont trop court , il doit comporte minumun 6 caractère';
        }
    }else{
        document.getElementById('ioirl').style.display='block';
        document.getElementById('resll').style.display='none';
         document.getElementById('err_login').style.display='block';
         document.getElementById('err_login').innerHTML='les mot de passe sont pas identique';
    }
}else{
    document.getElementById('check').style='background-color:red;color:white;padding:1vh 0.5vh ;border-radius:1vh;margin:1vh 0 1vh 0';
}
}
nom= e=>{
    e.preventDefault();
    this.setState({
        nom:e.target.value
    });
}

 prenom= e=>{
    e.preventDefault();
    this.setState({
        prenom:e.target.value
    });
 }

 mail= e=>{
    e.preventDefault();
    this.setState({
        mail:e.target.value
    });
 }

 password= e=>{
    e.preventDefault();
    this.setState({
        password:e.target.value
    });
 }

 password2= e=>{
    e.preventDefault();
    this.setState({
        password2:e.target.value
    });
 }

 cgu=e=>{
    this.setState({
        cgu:!this.state.cgu
    });
    console.log(this.state.cgu);

 }

 responseFacebook = response=>{

     var name = response.name;
     var apt = name.split(' ');

    this.setState({
            nom:apt[1],
            prenom:apt[0],
            mail:response.email,
    })

    document.getElementById('pasword').focus();
 }

 Redirect =()=>{
    if(this.state.redirect)
    {
        sessionStorage.setItem('register',this.state.mail);
        return <Redirect to='/verification-inscription'/>
    }
 }

 responseGoogle = (response) => {

    console.log(response);

    var name = response.profileObj.name;
     var apt = name.split(' ');

      this.setState({
              nom:apt[1],
              prenom:apt[0],
              mail:response.profileObj.email,
      })

      document.getElementById('pasword').focus();

}

    text=()=>{
        if(sessionStorage.getItem('point') != null){
            return "S'inscrire pour avoir mes resultat.";
        }else{
            return " S'inscrire";
        }
    }

 render(){
    let fbContent;
        fbContent=(
            <FacebookLogin
                appId="188933402177127"
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
                cssClass="btn_facebook"
                textButton="Se connecter avec Facebook"
                icon="fa fa-facebook-square"
            />
        )
    const {nom} = this.state;
    const {prenom} = this.state;
    const {mail} = this.state;

    return (
        <div>
                {this.Redirect()}

                <div id="sign">
                <center>
                    <h1>
                        {this.text()}
                    </h1>
                    <p>Avez-vous déjà un compte ? <Link to='/se-connecter'>Se connecter</Link> </p>
                    <div className='head_login'>
                        {fbContent}
                        <GoogleLogin
                            clientId="799924690004-3n6l4rkr2j0kg4k4ktkg96fphgtcvocj.apps.googleusercontent.com"
                            buttonText='Se connecter avec Google'
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className='btn_login'
                        />

                    </div>
                        </center>

                       <div id='err_login'></div>

                    <form onSubmit={(e)=>{this.handSubmit(e)}}>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Prénom</label>
                            <input type="text" class="form-control" onChange={this.prenom} value={prenom} id="Prenom"/>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Nom</label>
                            <input type="text" class="form-control" onChange={this.nom} value={nom} id="nom"/>
                        </div>

                       
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" class="form-control" onChange={this.mail}  value={mail} id="mail"/>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputPassword1">Mot de passe</label>
                            <input type="password" class="form-control" onChange={this.password} id="pasword" />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputPassword1">Confirmé le mot de passe</label>
                            <input type="password" class="form-control"  onChange={this.password2} id="pasword2"/>
                        </div>
                        <div id='check'>
                        <span> <input type="checkbox" onChange={this.cgu} id='cgu' /></span>
                              <label for="cgu"><b className='litle'>j'ai lu et j'accepte la <Link to='/politique-de-confidentialité'> Politique de confidentialité</Link>
                                  </b> </label>
                        </div>
                        <button id="ioirl"  class="btn btn-primary">S'inscrire</button>
                        <center>
                            <div id="resll"></div>
                        </center>
                    </form>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <div id='olll'>
                <Bouttom />
            </div>
        </div>

    );
 }
}

export default sign;