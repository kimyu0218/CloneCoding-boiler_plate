import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types'; // 액션 종류

// reducer: 상태를 변화시키는 로직이 있는 함수
export default function user(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        default:
            return state;
    }
}