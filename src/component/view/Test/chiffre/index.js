import React , { Component } from 'react';
import {Link,Redirect } from 'react-router-dom'
import ChartChiffre from '../../chart/chiffre/index';
import Bottom from '../../../licence/index'
import { withCookies, Cookies } from 'react-cookie';
import MetaTags from 'react-meta-tags';

class Index extends Component {

    constructor(props){
        super(props);

        this.state ={
            fullName: 0,
            id:1,
            rand: Math.floor(Math.random() * ((9 - 0) + 1)),
            redirect:false
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

    reset =()=>{

        this.setState({
            id  : 1,
            rand: Math.floor(Math.random() * ((9 - 0) + 1))
        });

        setTimeout(() => {
            document.getElementById('home_container').style.display='none';
            document.getElementById('rondom').style.display='none';
            document.getElementById('resultat').style.display='none';
            document.getElementById('form').style.display='block';
            document.getElementById('chiffre').focus();

        }, 3000);

        document.getElementById('home_container').style.display='none';
        document.getElementById('resultat').style.display='none';
        document.getElementById('rondom').style.display='block';

    }

    result=()=>{

        const { cookies } = this.props;
        if(!cookies.get('lo_')){
            return  <div id='result_test'>
                        <h1>
                        Connectez-vous pour voir vos résultats .
                        </h1>
                        <center>
                            <Link onClick={()=>{ this.reset() }} id='btn_restart_test'>Recommencer </Link>
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

    rand = ()=>{

        var id= this.state.id + 1;
        var u= Math.pow(10,id) +1 ;
        var y= Math.pow(10,this.state.id) - 1;

            this.setState({
                rand : Math.floor(Math.random() * ((u - y) +1))
            });

    }

    start = () =>{
        document.getElementById('home_container').style.display='none';
        document.getElementById('rondom').style.display='block';

        setTimeout(() => {
            document.getElementById('home_container').style.display='none';
            document.getElementById('rondom').style.display='none';
            document.getElementById('form').style.display='block';
            document.getElementById('chiffre').focus();
        }, 3000);

    }

    handleSubmit = (event) =>{

        event.preventDefault();

        if(document.getElementById('chiffre').value !== ''){

        document.getElementById('chiffre').value='';

        const data =  this.state.fullName*1;
        const id =  this.state.rand;

        if(data === id){

            this.setState({
                id: this.state.id +1
            });

           this.rand();

                document.getElementById('home').classList.add('success');
                setTimeout(()=>{
                    document.getElementById('home').classList.remove('success');
                },3000);
                document.getElementById('form').style.display='none';
                document.getElementById('home_container').style.display='none';
                document.getElementById('rondom').style.display='block';

            setTimeout(() => {
                document.getElementById('home_container').style.display='none';
                document.getElementById('rondom').style.display='none';
                document.getElementById('form').style.display='block';
                document.getElementById('chiffre').focus();
            }, 3000);

        }else{
            document.getElementById('home').classList.add('error');
            setTimeout(()=>{
                document.getElementById('home').classList.remove('error');
            },100);
            document.getElementById('form').style.display='none';
            document.getElementById('home_container').style.display='none';
            document.getElementById('resultat').style.display='block';
            document.getElementById('rondom').style.display='none';
            const { cookies } = this.props;

            if(cookies.get('lo_')){
                this.save()
            }
        }
    }
}

    handleInputChange= (event) =>{

        event.preventDefault();
        this.setState({
            fullName: event.target.value,
        });

    }

    componentWillUnmount=()=>{
            if( this.state.id >= 0){
                sessionStorage.setItem('point',this.state.id - 1);
            }
    }

    save=()=>{
        this.setState({
            redirect : true
        })
    }
    renderRedirect=()=>{
        var url = window.location.pathname;
        var categorie = url.split('/');
        var element = encodeURI(categorie[2]);

        var redirection= '/tableau-de-bord-quiz/'+element;
        
            if(this.state.redirect){
                return <Redirect to={redirection} />
            }
    }


    render(){

        const {rand} = this.state;

        return (

        <div>

          <MetaTags>
            <meta property="og:description" content="Essayez de rappeler le plus long numéro possible." />
            <meta property="og:title" content="Mémoire numérique" />
            <meta property="og:image" content="/img/6.png" />
          </MetaTags>
                {this.renderRedirect()}

                    <div className='home' id='home'>
                <div id='particle'>

                </div>

                        <div id='home_container' className='up'>
                                <center>
                                    <img src='/img/6.png' />
                                <h1>Mémoire numérique</h1>
                                <p>
                                Essayez de rappeler le plus long numéro possible.
                                </p>

                                <button id='btn_start' onClick={()=> {this.start()} }>Commencer</button>
                                </center>
                        </div>

                        <div id='rondom'>
                            <center>
                                <b>{ rand }</b>
                            </center>

                            <div class='io'>
                                <div class='iop'></div>
                            </div>

                        </div>

                        <div id='resultat'>
                            {this.result()}
                        </div>
                        <div id='form'>
                            <p>Quel était le chiffre ?</p>
                            <form  onSubmit={this.handleSubmit}>
                                    <input type='tel' onChange={this.handleInputChange}  placeholder=' ' id='chiffre' name='text' />
                                    <center>
                                        <button>Soumettre</button>
                                    </center>
                            </form>
                        </div>
                </div>

            <div className='container_r'>
                    <div className='container_ro'>
                        <h1>Statistique </h1>
                                <ChartChiffre  />
                    </div>

                    <div className='container_ro'>
                      <h1>À propos du test</h1>
                    <b>
               La personne moyenne ne peut se souvenir de manière fiable que des nombres à 7 chiffres, mais il est possible de faire beaucoup mieux en utilisant des techniques mnémoniques. Quelques liens utiles sont fournis ci-dessous
                    </b>
                    <br/>
                    <br/>
                    <Link to='https://fr.wikipedia.org/wiki/Mnemonic_major_system'>Système majeur mnémonique</Link>
                      <br/>
                      <br/>
                    <Link to='https://en.wikipedia.org/wiki/Dominic_system'>Système Dominique</Link>
                      <br/>
                      <br/>
                    <Link to='https://en.wikipedia.org/wiki/Katapayadi_system'>Système Katapayadi</Link>
                      <br/>
                      <br/>
                    <Link to='https://en.wikipedia.org/wiki/Mnemonic'>Dispositifs mnémoniques</Link>
                        <br/>
                      <br/>
                    </div>
            </div>

            <br />
            <br />
            <div id='olll'>
                <Bottom />
            </div>
         </div>


        )
    }

}
export default withCookies(Index);
