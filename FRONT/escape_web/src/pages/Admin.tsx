/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import React from 'react';
import LeftNav from "@components/LeftNav";
import { BsFillCameraFill } from 'react-icons/bs';
import { useQuery } from "@tanstack/react-query";
import { getStore } from "../api/admin";
import Form from 'react-bootstrap/Form';

const Main = css`
    display:flex;
`

const CafeSection = css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    /* margin-top:20px; */
    padding: 0 60px;
`

const CafeTitle = css`
    font-size:25px;
    font-weight: 600;
    margin-bottom: 20px;
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

const RegionLittleList = {
    // 서울
    '서울':[
        '강남',
        '홍대',
        '신촌',
        '건대',
        '대학로',
        '강북',
        '신림', 
        '기타'
    ],
    // 경기
    '경기':[
        '부천', 
        '일산',
        '수원',
        '안양',
        '인천',
        '기타'
    ],
    // 충청 
    '충청':[
        '대전',
        '천안',
        '청주',
        '기타'
    ],
    // 경상 
    '경상':[
        '대구',
        '부산',
        '기타'
    ],
    // 전라 
    '전라':[
        '전주',
        '광주',
        '기타'
    ],
    // 강원 
    '강원':['전체'],
    // 제주 
    '제주':['전체']
}
const RegionList = ['서울', '경기', '충청', '경상', '전라', '강원', '제주']    

export default function Admin(){


    const {data} = useQuery(["Admin"], getStore)

    return(
        <>
        {data !== undefined ? 
            <main css={Main}>
            <LeftNav />
            <section css={CafeSection}>
                {/* <header css={CafeTitle}>{data[0].storeName} 관리</header> */}
                <div style={{display:'flex'}}>
                    <article css={CafeArticle} style={{marginRight:'50px'}}>
                        <section css={CafeManageSection}>
                            <header css={CafeManageHeader}>대표 사진</header>
                            <div style={{position:'relative'}}>
                                <label htmlFor="uploadCafeImage" css={CameraIcon} >
                                    <BsFillCameraFill size={30} color="white" />
                                </label>
                                <input type="file" id="uploadCafeImage" css={InputImg} />
                                <div />
                                <img src={`https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${data[0].storeImg}`} 
                                css={css`
                                    width:300px;
                                    height:300px;
                                    border-radius: 15px;
                                    filter: brightness(50%);
                                `} />
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
                            <div>
                                <Form.Select onChange={(item) => console.log(item.target.value)}>
                                    {RegionList.map((item) => <option>{item}</option>)}
                                </Form.Select>
                            </div>
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
            :null
        }
        </>
    )
}