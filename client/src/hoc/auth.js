// hoc (higher-order component) : 컴포넌트를 받아서 새로운 컴포넌트 반환
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

// Component: Landing Page, Login Page, Register Page...
export default function (SpecificComponent, option, adminRoute = null) {

    // option
    // null    =>  아무나 출입이 가능한 페이지
    // true    =>  로그인한 유저만 출입이 가능한 페이지
    // false   =>  로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        // backend에 request를 보내서 상태 알아오기
        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
                
                // (isAuth: 로그인한 경우 true)
                if (!response.payload.isAuth) { //로그인 하지 않은 상태
                    if (option) {
                        props.history.push('/login') // 로그인 페이지 로드
                    }
                } 
                else { //로그인 한 상태 
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else { 
                        if (option === false)
                            props.history.push('/') // 시작 페이지 로드
                    }
                }
            }) // auth 액션 실행
        }, [])

        return ( // 컴포넌트 출력
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}