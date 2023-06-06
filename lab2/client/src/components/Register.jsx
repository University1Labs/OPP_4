import React from 'react';
import { reg } from './../side/api';
import './../css/auth.css';

function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    function register(email, password) {
        console.log(email, password);
        reg(email, password).then(res => {
            if (res.data.message === "User with this email has already registred") {
                setError("User with this email has already registred");
            }
            if (res.data.message[0].path === 'password') {
                setError("Password must have at least 4 symbols");
            }
            if (res.data.message[0].path === 'email') {
                setError("Write correct email");
            }
            if (res.data.message === "User has registred") {
                setError("Registration completed");
            }
        }).catch(e => setError("Error"));
    }
    return (
        <div className='auth'>
            <div className='auth_title'>Registration</div>
            <div className='auth_form'>
                <div className='auth_element'>
                    <input onChange={(e) => {
                        setEmail(e.target.value);
                    }} placeholder="email" type="text" />
                </div>
                <div className='auth_element'>
                    <input onChange={(e) => {
                        setPassword(e.target.value);
                    }} placeholder="password" type="password" />
                </div>
                <div className='auth_button'>
                    <button onClick={() => {
                        register(email, password);
                    }}>Enter</button>
                </div>
            </div>
            <div style={{ paddingTop: '10px', color: error === 'Registration completed' ? 'green' : 'red' }}>{error}</div>
        </div>
    )
}

export default Register;