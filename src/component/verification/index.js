import React , { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';

class verifivation extends Component {

    constructor(props){
        super(props);
        this.state={
            code:null,
            code_exact:null,
            id:null,
            nom:null,
            prenom:null,
            email:null,
        }
    }

    componentDidMount=()=>{
        this.setState({
            code_exact: sessionStorage.getItem('c_'),
            email: sessionStorage.getItem('register')
        });
    }
    
  
    handleInputChange= (event) =>{

        event.preventDefault();
        this.setState({
            code: event.target.value,
        });

    }

    getUse=()=>{

        const { cookies } = this.props;
    
            let formData= new FormData();
            formData.append("text",sessionStorage.getItem('register'));
            const url= 'https://www.cogniperf.com/api/comfirm_user.php';
            axios.post(url,formData)
            .then((res)=>{

                if(!cookies.get('lo_')){
                    cookies.set('lo_',{
                        id:res.data[0],
                        nom:res.data[1],
                        prenom:res.data[2]
                    });
                }

                if(sessionStorage.getItem('test') != null){
                    var data= sessionStorage.getItem('test');
                }else{
                    var data= 'cogniperf.com';
                }
                
                    let formData= new FormData();
                    formData.append("text",[res.data[1],res.data[2],sessionStorage.getItem('register'),data]);
                    const url= 'https://www.cogniperf.com/api/activeCampaign.php';
                    axios.post(url,formData)
                    .then((res)=>{

                        if(res.data === 'activeCampaign'){
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
                
                    })
            })
    
    }

        redirect=()=>{
    
            if(this.state.redirect){
    
                      return <Redirect to='/' />
    
            }

        }

        redirectDasb=()=>{
    
            if(this.state.redirectDasb){
                    
                const app= sessionStorage.getItem('test');
                return <Redirect to={'/tableau-de-bord-quiz/'+app} />
            }
    
        }
    


    handleSubmit= (event) =>{

        document.getElementById('ioirl').style.display='none';
        document.getElementById('resll').style.display='block';
        document.getElementById('resll').innerHTML="<div><img src='/img/loader.gif'/></div>";

        event.preventDefault();
        
                if(sessionStorage.getItem('c_')*1 === this.state.code*1){
                        this.getUse();
                }else{
                    document.getElementById('ioirl').style.display='block';
                    document.getElementById('err_login').style.display='block';
                    document.getElementById('resll').style.display='none';
                        document.getElementById('err_login').innerHTML="Code incorrect";
                }

    }

 render(){

    const {email} = this.state
    return (
        <div>
            
            {this.redirect()}
            {this.redirectDasb()}
            <div id='verification'>

            <center>
            <img src='/img/verification.png'/>

                <h1>
                    Confirmation de l'inscription
                </h1>
                <b>
                    un code comfirmation a été envoyé à l'adresse mail </b><br/>{email}
                    <div id='err_login'></div>

                <form  onSubmit={this.handleSubmit}>

                        <div class="form-group">
                            <input type="text" class="form-control" onChange={this.handleInputChange}  placeholder="###"/>
                        </div>
                        <button id="ioirl" class="btn btn-primary">comfirmer</button>
                        <div id="resll"></div>    
                </form>
 


            </center>

        </div>
        </div>


    );
 }
}

export default withCookies(verifivation);