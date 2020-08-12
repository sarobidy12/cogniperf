import React , { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Link,Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { withCookies, Cookies } from 'react-cookie';

import axios from 'axios';
import Bouttom from '../licence/index';

class login extends Component{

  constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            redirect:false,
            redirectcomfirm:false,
            redirectDasb:false,
            id:null,
            nom:null,
            prenom:null
        }
  }

  redirect=()=>{

    const { cookies } = this.props;

    if(this.state.redirect){

        if(!cookies.get('lo_')){
            cookies.set('lo_',{
                id:this.state.id,
                nom:this.state.nom,
                prenom:this.state.prenom
            });
        }
         
        return <Redirect to='/' />

        }
    }
    redirectDasb=()=>{
        const { cookies } = this.props;

        if(this.state.redirectDasb){
            
            if(!cookies.get('lo_')){
                cookies.set('lo_',{
                    id:this.state.id,
                    nom:this.state.nom,
                    prenom:this.state.prenom
                });
            }
            
            const app= sessionStorage.getItem('test');
            return <Redirect to={'/tableau-de-bord-quiz/'+app} />
        }

    }

componentWillUnmount=()=>{
    const { cookies } = this.props;
}

componentDidMount=()=>{
    const { cookies } = this.props;

      window.scrollTo(0,0);

      document.title = 'Cogniperf.com - Se connecter';

      if(document.getElementById('nom').value === ''){
          
        this.setState({
            email: sessionStorage.getItem('register')
        });

      }
       
    if(cookies.get('lo_')){
        this.setState({
            redirect: true
      });
        
    }else{

        this.setState({
            email: sessionStorage.getItem('register')
        });

        if(sessionStorage.getItem('register') != null){
            document.getElementById('pasword').focus();
        }

    }

 }

getUse=()=>{

    const { cookies } = this.props;

        let formData= new FormData();
        formData.append("text",this.state.email);
        const url= 'https://www.cogniperf.com/api/user.php';
        axios.post(url,formData)
        .then((res)=>{

            this.setState({
                id:res.data[0],
                nom:res.data[1],
                prenom:res.data[2],
            })

            setTimeout(()=>{
                if(sessionStorage.getItem('test') != null & sessionStorage.getItem('point') != null){
                    this.setState({
                        redirectDasb:true
                    });
                }
                else
                {
                    this.setState({
                        redirect:true
                    });
                }
            },100);
        })

}

getUserName=()=>{
        let formData= new FormData();
        formData.append("text",this.state.email);
        const url= 'https://www.cogniperf.com/api/user.php';
        axios.post(url,formData)
        .then((res)=>{

            this.setState({
                id:res.data[0],
                nom:res.data[1],
                prenom:res.data[2],
            })

            setTimeout(()=>{
                var rand=Math.floor(Math.random() * ((99999 - 9999)));
                sessionStorage.setItem('c_',rand)
                let formData= new FormData();
                formData.append("text",[this.state.nom, this.state.prenom,this.state.email,rand]);
                const url= 'https://www.cogniperf.com/api/send_mail_comfirmation.php';
    
                axios.post(url,formData)
                .then((res)=>{

                        if(res.data === 'ok'){
                                this.setState({
                                    redirectcomfirm:true
                                })
                        }
                })

            },100);
            
        })
}

redirectcomfirm =()=>{
    if(this.state.redirectcomfirm)
    {
        sessionStorage.setItem('register',this.state.email);
        return <Redirect to='/verification-inscription'/>
    }
 }

 componentClicked= ()=>{
     
    console.log('click');
    document.getElementById('ioirl').style.display='none';
    document.getElementById('resll').style.display='block';
    document.getElementById('resll').innerHTML="<div><img src='/img/loader.gif'/></div>";
 }

 handchangeNom =event=>{
    event.preventDefault();
    this.setState({
        email: event.target.value
    })
 }

 handchangePassowrd =event=>{
    event.preventDefault();
    this.setState({
        password: event.target.value
    })
 }


 handSubmit =e=>{

    document.getElementById('ioirl').style.display='none';
    document.getElementById('resll').style.display='block';
    document.getElementById('resll').innerHTML="<div><img src='/img/loader.gif'/></div>";
    e.preventDefault();


     let formData= new FormData();
     formData.append("text",[this.state.email,this.state.password]);
   const url= 'https://www.cogniperf.com/api/login.php';

   axios.post(url,formData)
         .then((res)=>{
            if(res.data === 'login'){
               this.getUse();                             
            }else if(res.data === 'comfirme'){
               this.getUserName();
            }else{
                 document.getElementById('ioirl').style.display='block';
                 document.getElementById('resll').style.display='none';
                 document.getElementById('err_login').style.display='block';
                 document.getElementById('err_login').innerHTML=res.data;
             }
          });

 }

 responseFacebook = response=>{

    document.getElementById('ioirl').style.display='none';
    document.getElementById('resll').style.display='block';
    document.getElementById('resll').innerHTML="<div><img src='/img/loader.gif'/></div>";

    var name = response.name;
    var apt = name.split(' ');

        this.setState({
            nom:apt[1],
            prenom:apt[0],
                email:response.email,

        })

            setTimeout(() => {
                let formData= new FormData();
                formData.append("text",[this.state.nom,this.state.prenom,this.state.email]);
                const url= 'https://www.cogniperf.com/api/login_social.php';

                    axios.post(url,formData)
                        .then((res)=>{
                            if(res.data === 'login'){
                                if(sessionStorage.getItem('test') != null & sessionStorage.getItem('point') != null){
                                    this.setState({
                                        redirectDasb:true
                                    });
                                }
                                else
                                {
                                    this.setState({
                                        redirect:true
                                    });
                                }
                            }else{
                                document.getElementById('err_login').style.display='block';
                                document.getElementById('err_login').innerHTML=res.data;
                                document.getElementById('ioirl').style.display='block';
                                document.getElementById('resll').style.display='none';
                            }
                        })
                        .catch((err)=>{
                        document.getElementById('ioirl').style.display='block';
                        document.getElementById('resll').style.display='none';
                    })
            },100);
}

 responseGoogle = (response) => {

    document.getElementById('ioirl').style.display='none';
    document.getElementById('resll').style.display='block';
    document.getElementById('resll').innerHTML="<div><img src='/img/loader.gif'/></div>";

   var name = response.profileObj.name;
   var apt = name.split(' ');

    this.setState({
        nom:apt[1],
        prenom:apt[0],
        email:response.profileObj.email,
       
    })

    setTimeout(() => {

        let formData= new FormData();
        formData.append("text",[this.state.nom,this.state.prenom,this.state.email]);

        const url= 'https://www.cogniperf.com/api/login_social.php';

        axios.post(url,formData)
            .then((res)=>{

                if(res.data === 'login'){

                    if(sessionStorage.getItem('test') != null & sessionStorage.getItem('point') != null){
                                       
                        this.setState({
                            redirectDasb:true
                        });
                    }else{
                        this.setState({
                            redirect:true
                        });
                    }

                }         
                else{
                    document.getElementById('err_login').style.display='block';
                    document.getElementById('err_login').innerHTML=res.data;
                    document.getElementById('ioirl').style.display='block';
                    document.getElementById('resll').style.display='none';
                }
    
             })
        .catch((err)=>{
   
            document.getElementById('ioirl').style.display='block';
            document.getElementById('resll').style.display='none';
             
        })

    },100);
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
            textButton="connexion via Facebook"
            icon="fa fa-facebook-square"
        />
        )

    return (
        <div>
                   {this.redirect()}
                   {this.redirectDasb()}
                   {this.redirectcomfirm()}

                   <div id="sign">
                       <center>
                            <h1>
                               Se connecter
                           </h1>
                           <p>
                               Besoin d'un compte ?
                               <Link to='/inscription'> S'inscrire </Link>
                           </p>
                        <center>
                    <div className='head_login'>
                    {fbContent}
                    <br />
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
                       </center>
                       <div id='err_login'></div>
                    <form onSubmit={(e)=>{this.handSubmit(e)}}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" class="form-control" value={sessionStorage.getItem('register')} onChange={this.handchangeNom} id="nom"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Mot de passe</label>
                            <input type="password" class="form-control" onChange={this.handchangePassowrd} id="pasword" />
                        </div>

                        <Link to='/Réinitialiser-le-mot-de-passe' >
                        mot de passe oublié?
                        </Link>
                        <button id="ioirl" class="btn btn-primary">Se connecter</button>
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

export default withCookies(login);