import React , { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

class NavBar extends Component {

    constructor(props){
        super(props);
            this.state={
                redirect:false,
                block:1
            }
    }

    longOut=()=>{
        
        this.setState({
            block:1
        })
        
    }
 

    navResponse=()=>{
        document.getElementById('sidebar').classList.add('openSidebar');
        document.getElementById('closeSide').style.display='block';
        setTimeout(()=>{
            document.getElementById('sidebar').style='left:0%'
       },1500);
    }

    navResponseClose=()=>{

        document.getElementById('sidebar').classList.remove('openSidebar');
        document.getElementById('sidebar').classList.add('close');
        setTimeout(()=>{
            document.getElementById('closeSide').style.display='none';
            document.getElementById('sidebar').style='left:-80%'
            document.getElementById('sidebar').classList.remove('close');

       },1200);
    }

    navResponseRender=()=>{

        const { cookies } = this.props;
 
        if(this.state.block === 1){

    if(cookies.get('lo_')){

        return <div id='sidebar'>
            <li><Link onClick={()=>{this.navResponseClose()}} to='/'> <span><img className='img_span' src='/img/e.png'/></span>COGNIPERF</Link></li>
            <li><Link onClick={()=>{this.navResponseClose()}} to='/tableau-de-bord'><span><img  className='img_span' src='/img/i.png'/></span>TABLEAU DE BORD</Link></li>
            <li><Link onClick={()=>{this.longOut()}} to='/longOut'>DECONNEXION</Link></li>
        </div>

        }else{
      
        return <div id='sidebar'>
                <li><Link onClick={()=>{this.navResponseClose()}} to='/'><span><img  className='img_span' src='/img/e.png'/></span>COGNIPERF</Link></li>
                <li><Link onClick={()=>{this.navResponseClose()}} to='/tableau-de-bord'> <span><img  className='img_span' src='/img/i.png'/></span>TABLEAU DE BORD</Link></li>
                <li><Link onClick={()=>{this.navResponseClose()}} to='/inscription'>INSCRIVEZ-VOUS</Link></li>
                <li><Link onClick={()=>{this.navResponseClose()}} to='/se-connecter'>CONNEXION</Link></li>
            </div>
        }
    }
    }

    navResponseConnecter=()=>{
        if(this.state.block == 0){
            return <div id='sidebar'>
            <li><Link onClick={()=>{this.navResponseClose()}} to='/'> <span><img  className='img_span' src='/img/e.png'/></span>COGNIPERF</Link></li>
            <li><Link onClick={()=>{this.navResponseClose()}} to='/tableau-de-bord'><span><img  className='img_span' src='/img/i.png'/></span>TABLEAU DE BORD</Link></li>
            <li><Link  onClick={()=>{this.longOut()}} to='/longOut'><span><img className='img_span' src='/img/loungout.png'/></span>DECONNEXION</Link></li>
</div>
        }
    }

    navConnecter=()=>{
        if(this.state.block == 0){
        return <header id='header '>
        <div id='btn-response' onClick={()=>{ this.navResponse()}}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class='auto'>
            <ul className='menu'>
                <li><Link to='/'> <span><img  className='img_span' src='/img/e.png'/></span>COGNIPERF</Link></li>
                <li><Link to='/tableau-de-bord'><span><img  className='img_span' src='/img/i.png'/></span>TABLEAU DE BORD</Link></li>
            </ul>
            <ul className='count'>
                    <li><Link onClick={()=>{this.longOut()}} to='/longOut'><span><img className='img_span' src='/img/loungout.png'/></span>DECONNEXION</Link></li>
            </ul>
        </div>
    </header>
    }

    }
    navRender =()=>{

              
    const { cookies } = this.props;
 
    if(this.state.block === 1){

if(cookies.get('lo_')){

    return   <header id='header '>
            <div id='btn-response' onClick={()=>{ this.navResponse()}}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        <div class='auto'>
            <ul className='menu'>
                <li><Link to='/'> <span><img  className='img_span' src='/img/e.png'/></span>COGNIPERF</Link></li>
                <li><Link to='/tableau-de-bord'><span><img  className='img_span' src='/img/i.png'/></span>TABLEAU DE BORD</Link></li>
            </ul>
            <ul className='count'>
                    <li><Link onClick={()=>{this.longOut()}} to='/longOut'>DECONNEXION</Link></li>
            </ul>
        </div>
        </header>

}else{
        
    return <header id='header'>
                        <div id='btn-response' onClick={()=>{ this.navResponse()}}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                            <div class='auto'>
                                <ul className='menu'>
                                    <li id='cogniperf'><Link to='/'><span><img className='img_span' src='/img/e.png'/></span>COGNIPERF</Link></li>
                                    <li id='tableau'><Link to='/tableau-de-bord'> <span><img  className='img_span' src='/img/i.png'/></span>TABLEAU DE BORD</Link></li>
                                </ul>

                                <ul className='count'>
                                    <div id='oil'>
                                        <li><Link to='/inscription'>INSCRIVEZ-VOUS</Link></li>
                                        <li><Link to='/se-connecter'>CONNEXION</Link></li>
                                    </div>
                                </ul>
                            </div>
                        </header>
             
        }}
    }

    componentWillReceiveProps=()=>{

    const { cookies } = this.props;
        if(cookies.get('lo_')){
                this.setState({
                    block: 0
                })
        }
    }

 render(){

    return (
        <div>
              {this.navRender()}
              {this.navResponseRender()}
              {this.navConnecter()}
              {this.navResponseConnecter()}
              <div id='closeSide' onClick={()=>{this.navResponseClose()}}>

              </div>

        </div>


    );
 }
}

export default withCookies(NavBar);