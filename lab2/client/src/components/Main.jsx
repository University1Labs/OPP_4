import { useEffect, useState } from 'react';
import { Tests } from './../side/api';
import { NavLink } from 'react-router-dom';
import './../css/test.css';

function Main({ login }) {
    const [tests, setTests] = useState([]);
    useEffect(() => {
        Tests().then(res => {
            setTests(res.data);
        });
    }, []);

    return (
        <div className='testList'>
            {tests.map((test, index) => {
                return <NavLink className="testElement" key={index} to={`/${test._id}`}>{test.name}</NavLink>
            })}
        </div>
    )
}

export default Main;