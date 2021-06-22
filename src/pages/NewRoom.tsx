import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import illustrationImg from '../assets/img/illustration.svg';
import logoIng from '../assets/img/logo.svg';

import { Button } from '../components/Button'

import '../styles/auth.scss';

export function NewRoom () {
    // const { user } = useContext(AuthContext);    

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao -vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoIng} alt="Letmeask"/>
                    <h2>Criar uma Nova Sala</h2>                    
                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button className="button" type="submit">
                            Criar na sala 
                        </Button>                   
                    </form>
                    <p>Quer entrar em uma sala existe?<Link to="/">Clique Aqui</Link> </p>
                </div>
            </main>
        </div>
    )
}