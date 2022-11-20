/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import React from 'react';
import { Link } from "react-router-dom";

const Background = css`
    position: relative;
    width:100vw;
    height:100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const UnityImage = css`
    background-image: url("img/main_book2.gif");
    background-size:cover;
    background-position: center;
    width:100vw;
    height:100vh;
    opacity: 0.5;
`

const logoImage = css`
    position: absolute;
    z-index: 10;
    width:500px;
`

const loginAdmin = css`
    position: absolute;
    z-index: 12;
    color:white;
    top:50px;
    right:50px;
    
`

export default function Home(){
    return(
        <>
        <main css={Background}>
            <Link to="/login">
                <p css={loginAdmin}>관리자 로그인</p>
            </Link>
            <img src="img/logo_another.png" css={logoImage}/>
            <section css={UnityImage} />
        </main>
        </>
    )
}