/* import libs */
import React, {Component} from 'react';
import { Well } from 'react-bootstrap';

export default class Home extends Component{
    render(){
        return (
            <Well>
                <h1>Info:</h1>
                <ul>
                    <li>Zařízení je ve vývoji, mohou se vyskytovat problémy s funkčností. Pokud k něčemu takovému dojde
                        opakovaně, poznamenejte si, prosím, jak se chyba projevila a co jí předcházelo,
                        aby bylo možné chybu odstranit. </li>
                    <li>V případě problémů se zařízením použijte e-mail: myotonometer at gmail.com</li>
                    <li>SIM (<a target="_blank" href="http://mtrsim.herokuapp.com/">start btn</a>)</li>
                </ul>
            </Well>
        );
    }
};