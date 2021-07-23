import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

// action: 상태 변화를 일으킬 때마다 참조하는 객체
// (dispatch에 의해 스토어에 전달됨)

// 1. 로그인
export function loginUser(dataToSubmit) {
    // 서버에 제출 (server의 index.js 참고)
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}
// 2. 회원 가입
export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}
// 3. 인증
export function auth() {

    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}