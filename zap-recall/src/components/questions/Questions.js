import React from 'react';
import data from '../../data/index';
import logo from '../../assets/img/logo-pequeno.png';
import FlashCard from '../flashcard/FlashCard';
import Icon from '../shared/Icon';
import Footer from '../footer/Footer';

let questionsData = data.map(value => {
    return {
        ...value,
        tap: false,
        status: 'not_answer'
    }
})
questionsData = questionsData.sort(() => Math.random() - 0.5)

export default function Questions () {
   
    const [questions, setQuestions] = React.useState(questionsData);
    const [answer, setAnswer] = React.useState(0);
    const [queueAnswer, setQueueAnswer] = React.useState([]);


    function resultAnswes () {

        const result = queueAnswer.find(value => value === 'error');
        return (
            <>
                {result ? (<p>😥 Seu lixo</p>) : (<p>🥳 Ce é o bichão mermo hein</p>)}
            </>
        )
    }

    function tapCard (cardIndex) {
        let newQuestions = questions.map((value, index) => {
            if (index === cardIndex) {
                return {
                    ...value,
                    tap: true,
                }
            } else {
                return {
                    ...value,
                    tap: false,
                }
            }
        })

        setQuestions([...newQuestions]);
    }

    function zap (cardIndex, status) {
        let newQuestions = questions.map((value, index) => {
            if (index === cardIndex) {
                return {
                    ...value,
                    tap: false,
                    status: status,
                }
            } else {
                return {
                    ...value,
                    tap: false,
                }
            }
        })

        setQuestions([...newQuestions]);
        setAnswer(answer + 1);
       
        setQueueAnswer([...queueAnswer, status])
    }


    return (
        <div className="deck">
            <div className="header">
                 <img src={logo} alt=""/>
                 <h1>Zap Recall</h1>
            </div>
            <div className="main">
                { questions.map((value, index) => (
                    <FlashCard 
                        key={index}
                        title={`Pergunta ${index + 1}`}
                        tap={value.tap}
                        index={index}
                        tapCard={tapCard}
                        question={value.frente}
                        answer={value.verso}
                        status={value.status}
                        zap={zap}
                        />
                ))}
            </div>
            <Footer>
                { queueAnswer.length === 4 ? (
                    resultAnswes()
                ): (null)}
                { queueAnswer.map(value => {
                    if (value !== 'not_answer') {
                        return <Icon status={value} />
                    }
                })}
                <p>{answer}/{questions.length} CONCLUÍDOS</p>
            </Footer>
        </div>
    )
}