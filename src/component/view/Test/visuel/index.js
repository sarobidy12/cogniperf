import React , { Component } from 'react';
import ChartVisuel from '../../chart/visuel/index';
import { Redirect,Link } from 'react-router-dom';
import Bottom from '../../../licence/index'
import { withCookies, Cookies } from 'react-cookie';
import MetaTags from 'react-meta-tags';

class Visuel extends Component {

 constructor(propos){

     super(propos);
     this.state={
         niveau:1,
         cage:3,
         coup:3,
         vie:3,
         cages:[],
         radom:[],
         remove:[],
         change:0,
         next: 3,
         cageRadom:1,
         block:1,
         redirect:false
     }
 }

 result=()=>{

    const { cookies } = this.props;
    if(!cookies.get('lo_')){
        return  <div id='result_test'>
                    <h1>
                    Connectez-vous pour voir vos résultats .
                    </h1>
                    <center>
                        <Link onClick={()=>{ this.restart() }} id='btn_restart_test'>Recommencer </Link>
                    </center>
                    <center>
                        <Link to='/inscription' id='btn_restart_test'>S'inscrire</Link>
                    </center>
                    <center>
                        <Link to='/se-connecter' id='btn_restart_test'>Se connecter</Link>
                    </center>
                </div>

    }
}


 componentDidMount=()=>{
    var url = window.location.pathname;
    var categorie = url.split('/');
    var element = decodeURI(categorie[2]);
    
    sessionStorage.setItem('test',element);
    document.title = 'Cogniperf - '+element;

 }

 componentWillMount=()=>{
    window.scrollTo(0,0);
 }

 cage=()=>{

     var nbr = this.state.cage *  this.state.cage;
     var list = [];

     for(var i = 0; i < nbr; i++){
        list.push(<div className='cage' id={i} onClick={this.nbr.bind(this.props.cage,i)}></div>)
     }

     this.setState({
        cages:list
     })
     
}

cageChange = ()=>{
    const { cookies } = this.props;

    setTimeout(()=>{
        if( this.state.vie > 0){
            var cageTotal= this.state.cage*this.state.cage;
            var array= this.state.radom;
            var apt=[];
            for(var i =0;i<this.state.cage;i++){
                var ap = Math.floor(Math.random() * (cageTotal - 2) + 1)+'';
                if(array.includes(ap+'') === false){
                    apt.push(ap);
                }else{
                    apt.push(Math.floor(Math.random() * (cageTotal - 2) + 1)+'');
                }
            }
            for(var i=0;i<this.state.cage;i++){
                document.getElementById(apt[i]).classList.add('animate_up');
            }
            this.setState({
                radom: apt,
                remove:[]
            });
        }else{
            document.getElementById('home_container').style.display='none';
            document.getElementById('visuel').style.display='none';
            document.getElementById('roum').style.display='block';
            this.setState({
                cage:3,
                coup:3,
                vie:3,
                change:1,
                next: 3,
                cageRadom:1
            });
            this.cage();


            if(cookies.get('lo_') != null){
                this.save()
            }

        }
        },950);
 }

 start = ()=>{
    document.getElementById('home_container').style.display='none';
    document.getElementById('visuel').style.display='block';
    this.cage();
    this.cageChange();
}

restart = ()=>{
    document.getElementById('home_container').style.display='none';
    document.getElementById('visuel').style.display='block';
    document.getElementById('roum').style.display='none';
    this.setState({
        niveau:1,
    });
    var nbrcage= this.state.cage * this.state.cage;

    this.cageChange();
        if(window.screen.width <= 414){
            for(var i=0;i<nbrcage;i++){
                document.getElementById(i+'').style='width:15vh;height :15vh;margin: 0 1vh 1vh 1vh;';
            }
        }else{
            for(var i=0;i<nbrcage;i++){
                    document.getElementById(i+'').style='width: 17.324vh;height : 17.324vh;margin: 0 1vh 1vh 0;';
            }
        }

    setTimeout(()=>{
        this.setState({
            change:0,
        })
    },900);
}

newCage =()=>{

        this.setState({
            cage: this.state.cage + 1,
            cageRadom:1
        });

        var nbrcage= this.state.cage * this.state.cage;
        this.cage();
        this.cageChange();

        if(window.screen.width <= 414){

            var width = Math.sqrt(2025 / nbrcage) -1 ;

            for(var i=0;i<nbrcage;i++){
                document.getElementById(i+'').style='width:'+width+'vh;height :'+width+'vh';
            }
        
        }else{
            var width = Math.sqrt(3025 / nbrcage) -1 ;

            for(var i=0;i<nbrcage;i++){
                document.getElementById(i+'').style='width:'+width+'vh;height :'+width+'vh';
            }
        
        }
        
        this.setState({
            next: this.state.next + 3
        });
}

cageChangePlus= ()=>{
    if(this.state.change ===  0 && this.state.vie >= 0){
        setTimeout(()=>{
            var array= this.state.radom;
            var cageTotal= this.state.cage*this.state.cage;
            var apt=[];
            var b=this.state.cage + this.state.cageRadom;
            for(var i =0;i<b;i++){
                apt.push(Math.floor(Math.random() * (cageTotal - i))+'');
            }

            for(var i=0;i<b;i++){
                document.getElementById(apt[i]).classList.add('animate_up');
            }
            this.setState({
                radom: apt,
                remove:[],
                cageRadom:this.state.cageRadom+1
            });

        },950);
    }
}
next= ()=>{

    if(this.state.change == 0){

            if(this.state.niveau == this.state.next){
                    this.newCage();
            }else{
                this.cageChangePlus();
            }

            this.setState({
                niveau: this.state.niveau +1 ,
                change:1
            });

            setTimeout(()=>{
                var nbrcage= this.state.cage * this.state.cage;
                for(var i=0;i<nbrcage;i++){
                    document.getElementById(i+'').classList.remove('op');
                }
            },900);

            setTimeout(()=>{
                  this.setState({
                    change: 0,
                    block:1
                });
            },900);

    }
}

nbr=(events,i)=> {


    if(this.state.block != 0){

        if(this.state.radom.length != 0 ){

            if(this.state.coup > 0){

                var array= this.state.radom;
                var remove = this.state.remove;

                if(remove.includes(events+'') == false){
                    remove.push(events+'');
                    var radom =  this.state.radom.filter((items)=>{
                        return items != events
                    });

                    this.setState({
                        radom:radom
                    });
                }

                this.setState({
                    remove: remove
        });

            if(this.state.coup >= 0){


                if(array.includes(events+'') === true){
                    document.getElementById(events).classList.add('animate_op');
                }else{
                    if(document.getElementById(events).classList[2] =='animate_op'){
                        return false;
                    }else{
                        this.setState({
                            coup: this.state.coup -1,
                        });
                        document.getElementById(events).classList.add('animate_on');
                    }
            }
    }

}

    setTimeout(()=>{

        if(this.state.coup <= 0 ){

                setTimeout(()=>{
                    this.CageNull();
                },300);
                if(this.state.change == 0){
                    setTimeout(()=>{
                        this.reset();
                    },500);
                }

        }else if(this.state.radom.length == 0 ){
                setTimeout(()=>{
                    this.CageNull();
                },300);
                setTimeout(()=>{
                    this.next();
                },600);
        }

    },600);
   }
}

}

CageNull =()=>{

        this.setState({
            block:0
        });

        var nbrcage= this.state.cage * this.state.cage;
        var uo = this.state.remove;

        for(var o =0 ;o < uo.length ;o++){
            document.getElementById(uo[o]+'').classList.add('op');
        }
        for(var i=0;i<nbrcage;i++){
            document.getElementById(i+'').classList.remove('animate_up');
            document.getElementById(i+'').classList.remove('animate_on');
            document.getElementById(i+'').classList.remove('animate_op');
        }

}

reset =()=>{

    if(this.state.change ==  0 && this.state.vie > 0){


            setTimeout(()=>{
                var nbrcage= this.state.cage * this.state.cage;
                for(var i=0;i<nbrcage;i++){
                    document.getElementById(i+'').classList.remove('op');
                }
            },900);

            this.cage();
            this.cageChange();

            this.setState({
                change:1,
                vie: this.state.vie -1

            });
                setTimeout(()=>{
                    this.setState({
                        coup: 3,
                        change:0,
                        block:1
                    });
                },1300);
    }
}



componentWillUnmount=()=>{

    if(this.state.vie >= 1 ){
        sessionStorage.setItem('point',this.state.niveau -1);
    }

}

save=()=>{
    this.setState({
        redirect:true
    });
}

renderRedirection=()=>{
    var url = window.location.pathname;
    var categorie = url.split('/');
    var element = decodeURI(categorie[2]);
    var redirection= '/tableau-de-bord-quiz/'+element;
    
        if(this.state.redirect){
            return <Redirect to={redirection} />
        }
        
}

render(){
    const element = React.createElement('h1',{},'Test de mémoire visuelle');
    const {cages}= this.state;
    const {vie}= this.state;
    const {niveau}= this.state;
    return (
<div>

          <MetaTags>
            <meta property="og:description" content="À chaque niveau, il aura plusieurs tuiles. Essayez de rappeler tous les carrés qui change en blanc. Si vous avez réussi, les nombres de carrés augmentent. Si vous échouez, vous recommencez. Attention vous n'avez que trois essais." />
            <meta property="og:title" content="Test de mémoire visuelle" />
            <meta property="og:image" content="/img/9.png" />
          </MetaTags>
        <div className='home'>
        {this.renderRedirection()}
             <div id='home_container' className='up'>
                <center>
                    <img src='/img/9.png'/>
                        {element}
                        <p>
                        À chaque niveau, il aura plusieurs tuiles. Essayez de rappeler tous les carrés qui change en blanc. Si vous avez réussi, les nombres de carrés augmentent. Si vous échouez, vous recommencez. Attention vous n'avez que trois essais.
                        </p>
                    <button id="btn_start" onClick={()=>{this.start()}}>Commencer</button>
                </center>
            </div>
            <div id='visuel'>

                <center>
                    <h2>Essai | {vie}</h2>
                </center>
                <div id='all_cage'>
                    <center>
                        {cages}
                    </center>
                </div>

            </div>

             <div id='roum'>
                                <center>
                                    {this.result()}
                                </center>
            </div>

            </div>

            <div className='container_r'>
                    <div className='container_ro'>
                        <h1>Statistique </h1>
                                <ChartVisuel />
                    </div>

                    <div className='container_ro'>
                      <h1>À propos du test</h1>
                    <b>
                        À chaque niveau, un certain nombre de tuiles clignotent en blanc Mémorisez-les et reprenez-les après la réinitialisation des tuiles !.<br/>
                        Les niveaux deviennent progressivement plus difficiles, pour défier vos compétences.<br/>
                        Si vous manquez 3 tuiles à un niveau, vous perdez une essais.<br/>
                        Vous avez trois vies <br/>
                        Allez aussi loin que vous le pouvez !
                    </b>
                    </div>
            </div>
         
            <div id='olll'>
                      <Bottom />
                  </div>
        </div>
    );
    }
}

export default  withCookies(Visuel);