/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UserLogin = async(id:string | undefined, pw:string | undefined) => {
    const response = await(await fetch(`http://k7c104.p.ssafy.io:8080/api/admin/auth/login`, {
        method:'post',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "password": pw,
            "userId": id
        })
    })).json()
    return response
}

const Main = css`
    display: grid;
    font-family: 'SUIT Variable';
    width:100vw;
    height:100vh;
    grid-template-columns: 1fr 1fr;
`

const Greeting = css`
    margin: 20px 0;
`

const Background = css`
    background-image: url("img/main_book2.gif");
    background-size:cover;
`

export default function Login(){
    const [userId, setUserId] = useState<string | undefined>();
    const [userPw, setUserPw] = useState<string | undefined>();

    return(
        <main css={Main}>
            <section css={Background} />
            <section>
                <img src='img/logo_gradient.png' width={150} height={150}/>
                <section css={Greeting}>
                    <h3>안녕하세요, 관리자님!</h3>
                </section>
                <Form style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Form.Group style={{display:'flex', flexDirection:'row', width:'500px'}}>
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="email" placeholder="아이디를 입력해주세요." 
                    onChange={(e)=>{setUserId(e.target.value)}} style={{width:'350px'}} />
                    </Form.Group>
                    <Form.Group style={{display:'flex', flexDirection:'row', width:'500px'}}>
                    <Form.Label htmlFor="inputPassword5">비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        onChange={(e)=>{setUserPw(e.target.value)}}
                        style={{width:'350px'}}
                    />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={()=>{UserLogin(userId, userPw)}}>로그인</Button>
            </section>
        </main>
    )
}