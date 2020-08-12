import React , { Component }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class mdp extends Component{

    
    constructor(props){
        super(props);
        this.state={
            email:null,
        }
    }

    componentDidMount=()=>{
        document.title = 'Cogniperf.com - Réinitialiser le mot de passe';
    }

    handleInputChange= (event) =>{

        event.preventDefault();
        this.setState({
            email: event.target.value,
        });

    }

    handleSubmit= (event) =>{

        document.getElementById('ioirl').style.display='none';
        document.getElementById('resll').style.display='block';
        document.getElementById('resll').innerHTML="<div><img src='/img/loader.gif'/></div>";
        event.preventDefault();
        
        let formData= new FormData();
        formData.append("text",this.state.email);

            const url= 'https://www.cogniperf.com/api/reset_password.php';
            axios.post(url,formData)
            .then((res)=>{
                    if(res.data === 'ok'){
                        document.getElementById('resert_password').innerHTML="<div><center> <img src='/img/cle.png' /><h1>Réinitialisation du mot de passe</h1> <br /><b>Un e-mail a été envoyé avec des instructions de réinitialisation du mot de passe.</b></center></div>";
                    }else{
                        document.getElementById('ioirl').style.display='block';
                        document.getElementById('resll').style.display='none';
                        document.getElementById('err_login').style.display='block';
                        document.getElementById('err_login').innerHTML=res.data;
                    }
            })
    }

    render(){

        return (
            <div>
                <div id='resert_password'>
                    <center>
                        <img src='/img/cle.png' />
                    
                        <h1>
                        Réinitialisation du mot de passe
                        </h1>
                        <b>
                        Saisissez l'adresse e-mail de votre compte. Si un compte existe avec cet e-mail, nous vous enverrons un message de réinitialisation du mot de passe.
                        </b>
                        <div id='err_login'></div>
                        <form  onSubmit={this.handleSubmit}>
<br />
                        <div class="form-group">
                            <label for="exampleInputEmail1">Votre address mail</label>
                            <input type="email" class="form-control" onChange={this.handleInputChange}  />
                        </div>

                        <button id="ioirl" class="btn btn-primary">Réinitialiser</button>
                        <div id="resll"></div>
                                        
                    </form>
                    </center>


                </div>
            </div>
            );
    }
}

export default mdp;

