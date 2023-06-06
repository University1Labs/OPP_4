import { useEffect, useState } from "react";
import Question from "./Question";
import { useParams } from "react-router-dom";
import { number } from './../side/api';

function Test() {
    const { id } = useParams();
    const [question, setQuestion] = useState(1);
    const [maxNumber, setNumber] = useState(0);
    useEffect(() => {
        number(id).then(res => {
            setNumber(res.data);
        });
    }, []);
    return (
        <Question testId={id} number={question} setNumber={setQuestion} maxNumber={maxNumber} />
    )
}
export default Test;