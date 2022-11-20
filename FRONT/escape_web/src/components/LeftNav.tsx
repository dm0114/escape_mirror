/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getStore } from "../api/admin";
import navLogo from '../logo_name.png';
import { useNavigate } from "react-router-dom";

const NavBack = css`
    display:flex;
    flex-direction: column;
    align-items: baseline;
    padding: 50px 50px 50px 50px;
    background-color: #F5F5F5;
    width:300px;
    min-height: 100vh;
    h1 {
        margin:0;
    }
`

const CafeName = css`
    margin: 30px 0 30px 0;
    font-size: 20px;
    font-weight: 700;
    color:#384460;
`

const NavMenu = css`
    display:flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    color:#384460;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 35px;
    p {
        margin-bottom: 0;
        margin-left: 15px;
    }
`

export default function LeftNav(){
    // const {data} = useQuery(["Admin"], getStore)
    const [cafeName, setCafeName] = useState<string | null>();
    useEffect(()=>{
        setCafeName(localStorage.getItem("CafeName"))
    }, [])

    const navigate = useNavigate();

    return(
        <>
        <aside css={NavBack}>
            <img src={navLogo} width={200} height={45} onClick={()=>{navigate("/login")}}/>
            <p css={CafeName}>{cafeName}</p>
            <Link to="/admin" css={NavMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#384460" className="bi bi-shop-window" viewBox="0 0 16 16">
            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
            </svg>
                <p>카페 관리</p>
            </Link>
            <Link to="/admin/theme" css={NavMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#384460" className="bi bi-bag-fill" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
            </svg>
                <p>테마 관리</p>
            </Link>
            <Link to="/admin/reservation" css={NavMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#384460" className="bi bi-calendar-check" viewBox="0 0 16 16">
            <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
                <p>예약 관리</p>
            </Link>
            {/* <Link to="/admin/validation" css={NavMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#384460" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
            </svg>
                <p>도장 찍기</p>
            </Link> */}
        </aside>
        </>
    )
}