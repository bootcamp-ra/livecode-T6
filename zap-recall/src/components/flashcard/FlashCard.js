import React from 'react';
import Icon from "../shared/Icon"
import setinha from '../../assets/img/setinha.png';


//Card Desvirado
function Card ({ title, index, tapCard, status }) {

    return (
        <div className={`flashcard ${status}`} onClick={() => tapCard(index)}>
            { title }
            <Icon status={status}/>
        </div>
    )
}

//Pergunta e Resposta
function CardQuestion ({ question, answer, zap, index }) {

    const [flipped, setFlipped] = React.useState(false);

    return (
        <>
            {!flipped ? (
                <div className="flashcard aberto">
                    { question }
                    <img src={setinha} alt="icon" className="icone" onClick={() => setFlipped(true)}/>
                </div>
            ) : (
                <div className="flashcard aberto resposta">
                    { answer }
                    <div>
                        <div className="button error" onClick={() => zap(index, 'error')}>Não lembrei</div>
                        <div className="button almost" onClick={() => zap(index, 'almost')}>Quase não lembrei</div>
                        <div className="button zap" onClick={() => zap(index, 'correct')}>Zap!</div>
                    </div>
                </div>
            )}
        
        </>
        
    )
}

export default function FlashCard ({
    title,
    tap,
    index,
    tapCard,
    question,
    answer,
    status,
    zap,
}) {


    return (
        <>
            { !tap ? (
                <Card
                    key={index}
                    title={title}
                    index={index}
                    tapCard={tapCard}
                    status={status}
                    />) : (
                    <CardQuestion
                        question={question}
                        answer={answer}
                        zap={zap}
                        index={index}
                    />)}

        </>
    )
}