import { useEffect, useState } from "react";
import Header from "./components/Header";
import { checkAuth } from "./side/api";
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth';
import Main from './components/Main';
import Register from './components/Register';
import Test from './components/Test';

function App() {
  const [auth, setAuth] = useState(false);
  const [login, setLogin] = useState("");

  useEffect(() => {
    checkAuth().then(res => {
      if (res.data.message !== 'Not authorized') {
        setLogin(res.data.email);
        setAuth(true);
      }
    })
  }, [auth])

  return (
    <>
      <Header auth={auth} setAuth={setAuth} login={login} setLogin={setLogin} />
      <Routes>
        {!auth && <Route path="/login" element={<Auth setAuth={setAuth} />} />}
        {auth && <Route path="/login" element={<Navigate to="/" />} />}
        {auth && <Route path="/" element={<Main login={login} />} />}
        <Route path="/register" element={<Register />} />
        {auth && <Route path="/:id/" element={<Test />} />}
      </Routes>
    </>
  );
}

export default App;
