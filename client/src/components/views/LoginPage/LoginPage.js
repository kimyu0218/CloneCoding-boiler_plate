// 로그인 페이지
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {

    const dispatch = useDispatch(); // dispatch: 액션을 스토어에 전달

    // ("": 초기 상태)
    const [Email, setEmail] = useState("")       // email을 위한 state
    const [Password, setPassword] = useState("") // password를 위한 state

    // for 폼 값 입력
    const onEmailHandler = (event) => {
       setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    // for 제출
    const onSubmitHandler = (event) => {
        event.preventDefault(); // refresh 방지
        console.log('Email', Email)       // 이메일 출력
        console.log('Password', Password) // 비밀번호 출력

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body)) // (loginUser: action 중 하나)
            .then(response => {
                if (response.payload.loginSuccess) {
                    console.log("LoginSuccess!")
                    props.history.push('/')
                } else {
                    alert('Error˝')
                }
            }) // loginUser 액션 실행
    }
    
    return ( // 로그인 폼
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
