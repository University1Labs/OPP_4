import { authHost, host } from './../axios/axios';

export const checkAuth = () => {
    return authHost.get('/getUser');
}

export const Login = (data) => {
    return host.post("/login", { data });
}

export const reg = (email, password) => {
    return host.post('/register', { email, password });
}

export const Tests = () => {
    return authHost.get("/tests");
}

export const question = (testId, number) => {
    return authHost.post("/question", { testId, number });
}

export const number = (testId) => {
    return authHost.post("/number", { testId });
}

export const answer = (testId, number, option) => {
    return authHost.post("/answer", { testId, number, option });
}

export const getAnswer = (testId, number) => {
    return authHost.post("/getAnswer", { testId, number });
}

export const start = (testId) => {
    return authHost.post("/start", { testId });
}

export const finish = (testId) => {
    return authHost.post("/finish", { testId });
}

export const getResult = (testId) => {
    return authHost.post("/getResult", { testId });
}
