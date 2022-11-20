/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, redirect, useNavigate } from 'react-router-dom';

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
    background-position: center;
`
const LoginSection = css`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default function Login(){
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | undefined>();
    const [userPw, setUserPw] = useState<string | undefined>();
    const [isLogin, setIsLogin] = useState(false);
    const UserLogin = async(id:string | undefined, pw:string | undefined) => {
        const response = await(await fetch(`https://k7c104.p.ssafy.io/api/admin/auth/login`, {
            method:'post',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "password": pw,
                "userId": id
            })
        }).then((res) => {
            if(res.status == 400){
                alert("로그인할 수 없습니다. 아이디나 비밀번호를 다시 한 번 확인해주세요.")
            }else if(res.status == 200){
                return res.json()
            }
        })
        .then((data) => {
            localStorage.setItem("accessToken", `Bearer ${data.accessToken}`)
            navigate("/admin");
        }))
        // .json()
        return response
    }

    return(
        <main css={Main}>
            <section css={Background} />
            <section css={LoginSection}>
                <div style={{marginBottom:20}}>
                    <img src='img/logo_gradient.png' width={150} height={150}/>
                    <section css={Greeting}>
                        <h3>안녕하세요, 관리자님!</h3>
                    </section>
                </div>
                <Form style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Form.Group style={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', marginBottom:20}}>
                    <Form.Label style={{marginRight:35, marginBottom:0}}>아이디</Form.Label>
                    <Form.Control type="email" placeholder="아이디를 입력해주세요." 
                    onChange={(e)=>{setUserId(e.target.value)}} style={{width:'250px'}} />
                    </Form.Group>
                    <Form.Group style={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%'}}>
                    <Form.Label htmlFor="inputPassword5" style={{marginRight:20, marginBottom:0}}>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        onChange={(e)=>{setUserPw(e.target.value)}}
                        style={{width:'250px'}}
                    />
                    </Form.Group>
                </Form>
                <Button variant="dark" className="mt-5" 
                onClick={()=>{UserLogin(userId, userPw)
                }}>로그인</Button>
            </section>
        </main>
    )
}