import React , { Component } from 'react';
import { Redirect ,Link} from 'react-router-dom';
import ChartVerbal from '../../chart/verbal/index';
import axios from 'axios';
import Bottom from '../../../licence/index';
import { withCookies, Cookies } from 'react-cookie';
import MetaTags from 'react-meta-tags';


class Verbal extends Component {

    constructor(props){
        super(props);
        this.state={
            coup:3,
            mot:null,
            point:1,
            passe:null,
            incrument:0,
            random : Math.floor(Math.random() * (3 - 0)),
            block:0,
            WordAll:null,
            deslabel:false
        }
    }
    
    componentWillUnmount=()=>{
        if( this.state.point > 0){
            sessionStorage.setItem('point',this.state.point+'');
        }
    }

    mathRand=()=>{

        var rand = Math.floor(Math.random() * (3 - 0));

        if( rand != 0 ){

            return rand*1;

        }else{

            return 2;

        }

    }

    componentWillMount=()=>{
        window.scrollTo(0,0);
    }
    
    componentDidMount=()=>{

        var url = window.location.pathname;
        var categorie = url.split('/');
        var element = decodeURI(categorie[2]);
        sessionStorage.setItem('test',element);
        document.title = 'Cogniperf - '+element;

            let formData= new FormData();
            formData.append("text","ko")
            const urlad= 'https://www.cogniperf.com/api/verbal.php';
            axios.post(urlad,formData)
             .then(res=>

                    this.setState({
                         deslabel:true,
                         WordAll: res.data,
                    }),
                 )
    }

    deslabel=()=>{

        if(this.state.deslabel === false){
            return <button id='com'>Chargement ... </button>;
        }else{
            return <button id='com' id="btn_start" onClick={()=>{this.start()}}>Commencer</button>;
        }

    }

    componentWillUpdate=()=>{
        this.GetWordPass();
        this.stop();
    }

    GetWordPass=()=>{

            if(this.state.incrument == this.state.random){
                if(this.state.block ==  0){

                    this.setState({
                        incrument:0,
                        random : this.mathRand(),
                        passe: this.state.mot,
                        block : 1
                    })

                }
            }

    }

    stop= ()=>{

        const { cookies } = this.props;

        if(window.location.pathname  == encodeURI('/quiz/Mémoire-des-mots')){


                if(this.state.coup <= 0){

                    setTimeout(()=>{
                        this.setState({
                            coup:3,
                    });

                    if( document.getElementById('verbal')){
                        document.getElementById('verbal').style.display='none';
                        if( document.getElementById('resultat')){
                            document.getElementById('resultat').style.display='block';

                            if(cookies.get('lo_') != null){
                                this.save()
                            }
                        }
                    }

            },100);

                }


        }

    }

    plus=()=>{

        this.setState({
            incrument: this.state.incrument + 1
        })

    }

    getWord=()=>{

                if(this.state.incrument == this.state.random ){

                    if(this.state.block ==  1 ){


                        this.setState({
                            incrument:0,
                            random : this.mathRand(),
                            mot: this.state.passe,
                            block : 0
                        })

                    }

                }else{

                        this.generateText()

                }

    }

    view = ()=>{

        this.plus();

        if(this.state.coup > 0){

           this.getWord();

           if(this.state.passe == this.state.mot){

               var o = 1;
               var a = 0;

           }else {

               var o = 0;
               var a = -1;

            this.setState({
                incrument:0,
                random : this.mathRand(),
                block : 0
            })


           }
        setTimeout(()=>{
            this.setState({
                point: this.state.point + o,
                coup: this.state.coup + a
            })
        },5)
        }

}

    new = ()=>{

        this.plus();
        this.getWord();

    if(this.state.passe === this.state.mot && this.state.block == 0){
            var o = 0;
            var a = -1;
        }else {
            var o = 1;
            var a = 0;
        }
        setTimeout(()=>{
                this.setState({
                    point: this.state.point + o,
                    coup: this.state.coup + a
                })
        },5)

    }

    generateText= ()=>{

        setTimeout(()=>{
            if(this.state.coup > 0){
                var random = Math.floor(Math.random() * (180 - 2) + 1);
                this.setState({
                    mot: this.state.WordAll[random]
                })
            }
        },50)
       
         
    }

    start = ()=>{
           this.setState({
                    rondom:this.mathRand(),
                    coup:3,
                    mot:null,
                    point:0,
                    incrument:0,
                    block : 0
            });
        document.getElementById('home_container').style.display='none';
        document.getElementById('verbal').style.display='block';
        document.getElementById('resultat').style.display='none';
        this.generateText();

    }


    save=()=>{
        sessionStorage.setItem('point',this.state.point);
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

    result=()=>{
        const { cookies } = this.props;

        if(!cookies.get('lo_')){
            return  <div id='result_test'>
                        <h1>
                        Connectez-vous pour voir vos résultats.
                        </h1>
                        <center>
                            <Link onClick={()=>{ this.start() }} id='btn_restart_test'>Recommencer </Link>
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
    

render(){
    const {mot} = this.state;
    const {point} = this.state;
    const {coup} = this.state;
    return (
            <div>

        <MetaTags>
            <meta property="og:description" content=" Pendant ce quiz vous verrez plusieurs mots un à la fois. Si vous avez revu Le mot pendant le test cliquer sur VU. Si c'est un nouveau mot cliquez sur NOUVEAU. Attention vous n'avez que trois essais." />
            <meta property="og:title" content="Test de mémoire verbale" />
            <meta property="og:image" content="/img/10.png" />
          </MetaTags>
        {this.renderRedirection()}
        {this.stop()}

        <div className='home'>

                <div id='home_container' className='up'>
                        <center>
                                    <img src='/img/10.png'/>
                                        <h1> Test de mémoire verbale</h1>
                                        <p>
                                        Pendant ce quiz vous verrez plusieurs mots un à la fois. Si vous avez revu Le mot pendant le test cliquer sur VU. Si c'est un nouveau mot cliquez sur NOUVEAU. Attention vous n'avez que trois essais.
                                       </p>
                                       {this.deslabel()}
                                    </center>
                </div>

     <div id='verbal'>
     <center>
                        <div>
                          <center>
                             <h3> Essai  | {coup} </h3>
                          </center>
                          <br/>
                        </div>
                         <h1 className='verbal'>{mot}</h1>
                            <button onClick={()=>{this.view()}}>Vu </button>
                            <button onClick={()=>{this.new()}}>Nouveau</button>
    </center>
    </div>

        <div id='resultat'>
                <center>
                            {this.result()}
                </center>
        </div>
        </div>
        <div className='container_r'>
                    <div className='container_ro'>
                        <h1>Statistique </h1>
                            <ChartVerbal />
                    </div>

                    <div className='container_ro'>
                     <h1>À propos du test</h1>
                    <b>
                        Ce test mesure le nombre de mots que vous pouvez conserver simultanément dans la mémoire à court
                        terme .<br/><br/>
                        Le nombre de mots dont vous souvenir augmente continuellement , jusqu'à ce que vous ne puissez
                        plus les garder dans la tête.<br/><br/>
                        Allez aussi longtemps que vous le pouvez. Vous avez 3 jusqu'à la fin  de la partie .<br/><br/>
                        Votre scrore est le nombre de tours que vous avez duré.
                    </b>
                    </div>
                     </div>
                     <br />
                     <br />
                     <br />
                     <br />
                        <br />
                        <br />
                        <br />
                        <br />
                         <div id='olll'>
                      <Bottom />
                  </div>
        </div>
    )
}
}

export default withCookies(Verbal);