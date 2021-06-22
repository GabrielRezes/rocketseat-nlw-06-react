import {useContext} from 'react';
import {useHistory} from 'react-router-dom';

import illustrationImg from '../assets/img/illustration.svg';
import logoIng from '../assets/img/logo.svg';
import googleIconImg from '../assets/img/google-icon.svg'

import {Button} from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';

import '../styles/auth.scss';

export function Home () {
    const history = useHistory();
    const { user , signInWithGoogle } = useContext(AuthContext)

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');         
    }

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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button className="button" type="submit">
                            Entrar na sala 
                        </Button>                   
                    </form>
                </div>
            </main>
        </div>
    )
}