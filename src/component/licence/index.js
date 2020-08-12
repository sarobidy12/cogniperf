import React , { Component }from 'react';
import { Link } from 'react-router-dom';

class Bottom_ extends Component{


    render(){
    return (
        <div>
             <center>
                 
                            <div id='bottom'>
                                <ul>
                                    <li>
                                        <b>cogniperf</b>
                                    </li>
                                    <li><Link to='/politique-de-confidentialité'>Politique de confidentialité</Link></li>
                                    <li><a href="mailto:contact@cogniperf.com">Nous contacter</a></li>
                                </ul>
                            </div>
                        </center>
        </div>
        );
    }
}

export default Bottom_;

