import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/img/logo.svg';
import deleteImg from '../assets/img/delete.svg';
import checkImg from '../assets/img/check.svg';
import answerImg from '../assets/img/answer.svg';

import { Question} from '../components/Question'
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import { useRoom } from '../hooks/useRoom';


import '../styles/room.scss';
import { database } from '../services/firebase';
import { async } from 'q';

type RoomParams = {
    id: string;
}

export function AdminRoom () {

    // const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title} = useRoom(roomId);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })
        history.push('/');
    }

    async function handleDeleteQuestion (questionId: string) {
        if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAskAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }
    async function handleHighLightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        });
    }
    
    
    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask"/>
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                    
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 &&  <span>{questions.length} perguntas</span> } 
                </div>
    
                <div className="question-list">
                    {questions.map(question => {
                        return(
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighLighted={question.isHighLighted}
                            >
                                {!question.isAnswered && (
                                <> 
                                    <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAskAnswered(question.id)}
                                    >
                                        <img src={checkImg} alt="Marcar pergunta como respondida"/>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleHighLightQuestion(question.id)}
                                    >
                                        <img src={answerImg} alt="Dar destaque a pergunta"/>
                                    </button>
                                </>    
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Deletar perguntar"/>
                                </button>
                            </Question>
                        );
                    })}             
                </div>
            </main>
        </div>
    );
}