import './../css/header.css'
import { NavLink } from 'react-router-dom';

function Header({ auth, setAuth, login, setLogin }) {
    return (
        <div className="header">
            <NavLink to="/" className='title'>Tests</NavLink>
            <div className='auth_list'>
                {auth && <div>{login}</div>}
                {auth ? <NavLink onClick={() => {
                    setLogin("");
                    setAuth(false);
                    localStorage.setItem('token', "")
                }} to="login" className="auth_list_element">Logout</NavLink> : <NavLink to="login" className="auth_list_element">Login</NavLink>}
                <NavLink className="auth_list_element" to="register">Registration</NavLink>
            </div>
        </div>
    );
}

export default Header;
