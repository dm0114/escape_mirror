/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import React from 'react';
import LeftNav from "@components/LeftNav";
import { BsFillCameraFill } from 'react-icons/bs';

const Main = css`
    display:flex;
`

const CafeSection = css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin-top:50px;
    padding: 0 60px;
`

const CafeTitle = css`
    font-size:25px;
    font-weight: 600;
    margin-bottom: 20px;
`

const CafeImage = css`
    background-image: url("https://image-se.ycrowdy.com/20210405/CROWDY_202104051821240238_4rDmV.png");
    background-size: cover;
    background-position: center center;
    width:300px;
    height:300px;
    border-radius: 10px;
`

const CafeArticle = css`
    display: flex;
    flex-direction: column;
`

const CafeManageSection = css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    background-color: white;
    margin: 20px 0;
    padding: 30px 40px;
    border-radius: 15px;
`

const CafeManageHeader = css`
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 500;
`

const CameraIcon = css`
    z-index: 1;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 100px;
    padding:20px;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    &:hover{
        background-color: rgba(0, 0, 0, 0.8);
    }
`

const InputImg = css`
    display: none;
    position: relative;
    z-index: 0;
`

const Input = css`
    padding:10px;
    height:20px;
    width:275px;
    background-color: rgb(233, 233, 233);
    border:0;
    outline:none;
    border-radius: 10px;
`

const TextArea = css`
    width:300px;
    height:200px;
    border-radius: 10px;
`

export default function Admin(){
    return(
        <main css={Main}>
        <LeftNav />
        <section css={CafeSection}>
            <header css={CafeTitle}>비밀의화원 광주점 관리</header>
            <div style={{display:'flex'}}>
                <article css={CafeArticle} style={{marginRight:'50px'}}>
                    <section css={CafeManageSection}>
                        <header css={CafeManageHeader}>대표 사진</header>
                        <div style={{position:'relative'}}>
                            <label htmlFor="uploadCafeImage" css={CameraIcon} >
                                <BsFillCameraFill size={30} color="white" />
                            </label>
                            <input type="file" id="uploadCafeImage" css={InputImg} />
                            <div css={CafeImage} />
                        </div>
                    </section>
                    {/* 추후 주소 검색 API 사용 */}
                    <section css={CafeManageSection}>
                        <header css={CafeManageHeader}>카페 주소</header>
                        <input css={Input} />
                    </section>
                </article>
                <article css={CafeArticle}>
                    <section css={CafeManageSection}>
                        <header css={CafeManageHeader}>지역</header>
                        <select>
                            <option>서울</option>
                            <option></option>
                        </select>
                    </section>
                    <section css={CafeManageSection}>
                        <header css={CafeManageHeader}>카페 설명</header>
                        <textarea css={TextArea}></textarea>
                    </section>
                    <section css={CafeManageSection}>
                        <header css={CafeManageHeader}>연락처</header>
                        <input css={Input} />
                    </section>
                    <section css={CafeManageSection}>
                        <header css={CafeManageHeader}>SNS</header>
                        <div>
                            <input placeholder="SNS명" />
                            <input placeholder="SNS 주소" />
                        </div>
                    </section>
                </article>
            </div>
        </section>
        </main>
    )
}