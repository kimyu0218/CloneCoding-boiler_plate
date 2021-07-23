// 랜딩 페이지
import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 

function LandingPage(props) {

    useEffect(() => { // (LandingPage에 들어오자마자 실행)
        axios.get('/api/hello')
        .then(response => console.log(response.data)) // 서버에서 돌아오는 response 출력
    }, [])

    const onClickHandler = () => { // 로그아웃 버튼 클릭시
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/login") // 로그아웃 성공시 로그인 페이지로 로드
                } else {
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })
    }

    return ( // 시작 페이지
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
            <br />
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
