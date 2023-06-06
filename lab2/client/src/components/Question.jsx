import { useEffect, useState } from "react";
import { question, getAnswer, answer, getResult, finish, start } from './../side/api';
import './../css/question.css';

function Question({ testId, number, maxNumber, setNumber }) {
    const [questionInfo, setQuestion] = useState({});
    const [testCount, setTestCount] = useState(0);
    const [passed, setPassed] = useState(false);
    const [option, setOption] = useState([0, 0, 0, 0]);
    const [color, setColor] = useState(0);
    useEffect(() => {
        question(testId, number).then(res => {
            setQuestion(res.data);
        })
    }, [number]);
    useEffect(() => {
        getAnswer(testId, number).then(res => {
            const data = res.data;
            if (data.passed) {
                if (data.ok) {
                    setColor(2);
                }
                else {
                    setColor(1);
                }
            }
            switch (data.option) {
                case 0: {
                    setOption([0, 0, 0, 0]);
                    break;
                }
                case 1: {
                    setOption([1, 0, 0, 0]);
                    break;
                }
                case 2: {
                    setOption([0, 1, 0, 0]);
                    break;
                }
                case 3: {
                    setOption([0, 0, 1, 0]);
                    break;
                }
                case 4: {
                    setOption([0, 0, 0, 1]);
                    break;
                }
            }
        });
    }, [number, passed]);
    useEffect(() => {
        getResult(testId).then(res => {
            const data = JSON.parse(JSON.stringify(res.data));
            setTestCount(data.count);
            setPassed(data.passed);
        });
    }, [passed]);
    let choose = 0;
    option.forEach(element => {
        if (element > 0) {
            choose = 1;
        }
    })
    return (
        <div className="question">
            <div className="question_text">{questionInfo.text}</div>
            <div className="question_options">
                <div className="question_element">
                    {(option[0] && passed) == 1 ? <label className="question_option" style={{ color: color == 1 ? 'red' : 'green' }}>{questionInfo.optionA}</label> :
                        <label className="question_option">{questionInfo.optionA}</label>}
                    <input type="checkbox" className="question_input" checked={option[0]} onChange={() => {
                        if (!passed) {
                            setOption([1, 0, 0, 0]);
                        }
                    }} />
                </div>
                <div className="question_element">
                    {(option[1] && passed) == 1 ? <label className="question_option" style={{ color: color == 1 ? 'red' : 'green' }}>{questionInfo.optionB}</label> :
                        <label className="question_option">{questionInfo.optionB}</label>}
                    <input type="checkbox" className="question_input" checked={option[1]} onChange={() => {
                        if (!passed) {
                            setOption([0, 1, 0, 0]);
                        }
                    }} />
                </div>
                <div className="question_element">
                    {(option[2] == 1 && passed) ? <label className="question_option" style={{ color: color == 1 ? 'red' : 'green' }}>{questionInfo.optionC}</label> :
                        <label className="question_option">{questionInfo.optionC}</label>}
                    <input type="checkbox" className="question_input" checked={option[2]} onChange={() => {
                        if (!passed) {
                            setOption([0, 0, 1, 0]);
                        }
                    }} />
                </div>
                <div className="question_element">
                    {(option[3] == 1 && passed) ? <label className="question_option" style={{ color: color == 1 ? 'red' : 'green' }}>{questionInfo.optionD}</label> :
                        <label className="question_option">{questionInfo.optionD}</label>}
                    <input type="checkbox" className="question_input" checked={option[3]} onChange={() => {
                        if (!passed) {
                            setOption([0, 0, 0, 1]);
                        }
                    }} />
                </div>
            </div>
            {(!passed && choose > 0) &&
                <div className="button_block">
                    <button className="question_button" onClick={() => {
                        let currentOption = 0;
                        option.forEach((element, index) => {
                            if (element > 0) {
                                currentOption = index + 1;
                            }
                        })
                        answer(testId, number, currentOption)
                    }}>Answer</button>
                </div>
            }

            <div className="button_block">
                {
                    (number > 1) && <button className="question_button" onClick={() => {
                        setNumber(number - 1);
                    }}>Previos</button>
                }
                {
                    number < maxNumber && <button className="question_button" onClick={() => {
                        setNumber(number + 1);
                    }}>Next</button>
                }
            </div>
            <div className="button_block">
                {
                    !passed && <button className="question_button" onClick={() => {
                        finish(testId).then(res => {
                            setPassed(true);
                        });
                    }}>Finish</button>
                }
                {
                    passed && <button className="question_button" onClick={() => {
                        start(testId).then(res => {
                            setPassed(false);
                            setNumber(1);
                        });
                    }}>Start</button>
                }
            </div>
            {passed && <div className="test_result">Your result {testCount}/{maxNumber}</div>}
        </div>
    )
}

export default Question;