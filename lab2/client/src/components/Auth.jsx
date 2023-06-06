import React from 'react'
import { useState } from 'react'
import { Login } from '../side/api'
import './../css/auth.css'

function Auth({ setAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    function login(email, password) {
        const data = { email: email, password: password };
        Login(data).then(res => {
            if (res.data.message === "Wrong password" || res.data.message === "Wrong email") {
                setError("Wrong email or password");
            }
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                setAuth(true);
            }
        }).catch(e => setError("Error"));
    }
    return (
        <div className='auth'>
            <div className='auth_title'>Login</div>
            <div>
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
                        login(email, password);
                    }}>Enter</button>
                </div>
            </div>
            <div style={{ paddingTop: '10px', color: 'red' }}>{error}</div>
        </div>
    )
}

export default Auth;