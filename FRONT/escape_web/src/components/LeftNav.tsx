/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import React from 'react';
import { Link } from 'react-router-dom';

const NavBack = css`
    display:flex;
    flex-direction: column;
    align-items: baseline;
    padding: 50px 100px 50px 60px;
    background-color: white;
    h1 {
        margin:0;
    }
`

const CafeName = css`
    margin: 50px 0 30px 0;
`

const NavMenu = css`
    text-decoration: none;
    color:black;
    font-size: 20px;
    font-weight: 500;
`

export default function LeftNav(){
    return(
        <>
        <aside css={NavBack}>
            <h1>Logo</h1>
            <h2 css={CafeName}>비밀의화원 광주점</h2>
            <Link to="/admin" css={NavMenu}>
                <p>카페 관리</p>
            </Link>
            <Link to="/admin/theme" css={NavMenu}>
                <p>테마 관리</p>
            </Link>
            <Link to="/admin/reservation" css={NavMenu}>
                <p>예약 관리</p>
            </Link>
        </aside>
        </>
    )
}