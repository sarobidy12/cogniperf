import React , { Component }from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class mdp extends Component{

    constructor(props){
        super(props);
        this.state={
            email:null,
            mot1:null,
            mot2:null,
            redirect:false
        }
    }

    
    componentDidMount=()=>{
        document.title = 'Cogniperf.com - Réinitialiser le mot de passe';
    }

    
 Redirect =()=>{
    if(this.state.redirect)
    {
        sessionStorage.setItem('register',this.state.email);
        return <Redirect to='/se-connecter'/>
    }
 }
 
    handleSubmit=event=>{
        event.preventDefault();

        document.getElementById('ioirl').style.display='none';
        document.getElementById('resll').style.display='block';
        document.getElementById('resll').innerHTML="<div><img src='/img/loader.gif'/></div>";
        var url = window.location.pathname;
            var categorie = url.split('/');
            var element = encodeURI(categorie[3]);

            if(this.state.mot1 === this.state.mot2){
                if(this.state.mot1 != null){

                    if(this.state.mot1.length >= 6){
                                 let formData= new FormData();
                                 formData.append("text",[element,this.state.mot1]);
                                    const url= 'https://www.cogniperf.com/api/update_mdp.php';
                                    axios.post(url,formData)
                                    .then((res)=>{
                                        console.log(res.data)
                                            this.setState({
                                                email:res.data,
                                                redirect:true
                                            })
                                     })
                        }else{
                            document.getElementById('ioirl').style.display='block';
                            document.getElementById('resll').style.display='none';
                            document.getElementById('err_login').style.display='block';
                            document.getElementById('err_login').innerHTML='les mot de passe sont trop court , il doit comporte minumun 6 caractère';
                        }
                }

            }else{
                document.getElementById('ioirl').style.display='block';
                document.getElementById('resll').style.display='none';
                document.getElementById('err_login').style.display='block';
                document.getElementById('err_login').innerHTML='les mot de passe sont pas identique';
            }
            
    }

    mot1=(e)=>{
        e.preventDefault();
        this.setState({
            mot1:e.target.value
        })
    }

    mot2=(e)=>{
        e.preventDefault();
        this.setState({
            mot2:e.target.value
        })
    }

    render(){

        return (
            <div>
                {this.Redirect()}
                <div id='resert_password'>
                        <h1>
                        Réinitialisation du mot de passe
                        </h1>
                        <div id='err_login'></div>
                        <form onSubmit={(e)=>{this.handleSubmit(e)}}>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Nouveau mot de passe </label>
                                <input type="password" onChange={this.mot1} class="form-control" id="nom"/>
                            </div>

                            <div class="form-group">
                                <label for="exampleInputEmail1">Confirmation du nouveau mot de passe</label>
                                <input type="password" class="form-control" onChange={this.mot2} id="Prenom"/>
                            </div>
                            <button id="ioirl" class="btn btn-primary"> Nouveau mot de passe</button>
                            <center>
                            <div id="resll"></div>
                        </center>
                        </form>

                </div>
            </div>
            );
    }
}

export default mdp;

