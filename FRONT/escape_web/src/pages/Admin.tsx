/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import React, { useEffect, useState } from 'react';
import LeftNav from "@components/LeftNav";
import { BsFillCameraFill } from 'react-icons/bs';
import { useQuery } from "@tanstack/react-query";
import { getStore, putStore } from "../api/admin";
import Form from 'react-bootstrap/Form';
import onFileUpload from '../api/AWS';
import Button from 'react-bootstrap/Button';

export const Main = css`
    display:flex;
`

export const CafeSection = css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin-top:40px;
    padding: 0 60px;
    width:100vw;
`

const CafeTitle = css`
    font-size:25px;
    font-weight: 600;
    margin-bottom: 20px;
`

const CafeArticle = css`
    display: flex;
    flex-direction: column;
    width:100%;
`

export const CafeManageSection = css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    background-color: white;
    margin: 20px 0;
    padding: 0 40px;
    border-radius: 15px;
`

export const CafeManageHeader = css`
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 700;
`

export const CameraIcon = css`
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

export const InputImg = css`
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

const SelectDiv = css`
    display:flex;
    /* justify-content: center; */
`

interface RegionListType {
    [key:string] : string[];
}

const RegionLittleList: RegionListType = {
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

    const {data, refetch} = useQuery(["Admin"], getStore)
    const [fileName, setFileName] = useState<string>();
    const [choiceRegion, setChoiceRegion] = useState<string>();
    const [choiceLittleRegion, setChoiceLittleRegion] = useState<string>();
    const [littleRegion, setLittleRegion] = useState<string[]>();
    const [changeAddress, setChangeAddress] = useState<string>();
    const [changeTel, setChangeTel] = useState<string>();
    const [changeName, setChangeName] = useState<string>();
    const [changeSNS, setChangeSNS] = useState<string>();
    const [storeId, setStoreId] = useState<number>();

    useEffect(()=>{
        if(choiceRegion){
            setLittleRegion(RegionLittleList[choiceRegion])
        }
    }, [choiceRegion])

    useEffect(()=>{
        if(data){
            setChangeAddress(data[0].address)
            setChangeTel(data[0].tel)
            setChangeName(data[0].storeName)
            setChangeSNS(data[0].homepage)
            setStoreId(data[0].storeId)
            setFileName(data[0].storeImg)
        }
    }, [data])

    return(
        <>
        {data !== undefined ? 
            <main css={Main}>
            <LeftNav />
            <section css={CafeSection}>
                {/* <header css={CafeTitle}>{data[0].storeName} 관리</header> */}
                <div style={{display:'flex', width:'100%', maxWidth:'1300px'}}>
                    <article css={CafeArticle} style={{marginRight:'10px'}}>
                        <section css={CafeManageSection}>
                            <header css={CafeManageHeader}>대표 사진</header>
                            <div style={{position:'relative'}}>
                                <label htmlFor="uploadCafeImage" css={CameraIcon} >
                                    <BsFillCameraFill size={30} color="white" />
                                </label>
                                <input type="file" id="uploadCafeImage" css={InputImg} onChange={e=>
                                    {
                                        onFileUpload(e)
                                        const temp = e.target.value.replace(" ", "+").split("\\")
                                        setFileName(temp[2])
                                    }}
                                    />
                                <div />
                                {
                                    fileName ? <img src={`https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${fileName}`} 
                                    css={css`
                                        width:300px;
                                        height:300px;
                                        border-radius: 15px;
                                        filter: brightness(50%);
                                    `} />
                                    :
                                    <img src={`https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${data[0].storeImg}`} 
                                    css={css`
                                        width:300px;
                                        height:300px;
                                        border-radius: 15px;
                                        filter: brightness(50%);
                                    `} />
                                }
                                
                            </div>
                        </section>
                        <section css={CafeManageSection}>
                            <header css={CafeManageHeader}>카페명</header>
                            <Form.Control type="text" value={changeName} onChange={(e)=>setChangeName(e.target.value)} 
                            style={{width:'100%'}}/>
                            {/* <input css={Input} /> */}
                        </section>
                    </article>
                    <article css={CafeArticle}>
                        <section css={CafeManageSection}>
                            <header css={CafeManageHeader}>지역</header>
                            <div css={SelectDiv}>
                                <Form.Select onChange={(e) => {setChoiceRegion(e.target.value)}}
                                style={{marginRight:10}}>
                                    <option>대분류</option>
                                    {RegionList.map((item) => <option key={item}>{item}</option>)}
                                </Form.Select>
                                {choiceRegion && littleRegion ? 
                                    <Form.Select onChange={(e) => {setChoiceLittleRegion(e.target.value)}}>
                                        <option>중분류</option>
                                        {littleRegion.map((item) => <option key={item}>{item}</option>)}
                                    </Form.Select>
                                    :
                                    <Form.Select>
                                        <option>중분류</option>
                                        <option>...</option>
                                    </Form.Select>
                                }
                            </div>
                        </section>
                        <section css={CafeManageSection}>
                            <header css={CafeManageHeader}>카페 주소</header>
                            <Form.Control type="text" value={changeAddress} onChange={(e)=>setChangeAddress(e.target.value)} />
                            {/* <input css={Input} /> */}
                        </section>
                        <section css={CafeManageSection}>
                            <header css={CafeManageHeader}>연락처</header>
                            <Form.Control type="text" value={changeTel} onChange={(e)=>setChangeTel(e.target.value)} />
                        </section>
                        <section css={CafeManageSection}>
                            <header css={CafeManageHeader}>홈페이지</header>
                            <Form.Control type="text" value={changeSNS} onChange={(e)=>setChangeSNS(e.target.value)}
                            style={{width:'100%'}} />
                        </section>
                        <Button style={{marginLeft:'auto', marginRight:40, marginTop:10}} variant="outline-danger"
                        onClick={()=>{
                        putStore(storeId, changeAddress, changeSNS, choiceRegion, choiceLittleRegion, fileName, changeName, changeTel)
                    .then((res) => {
                        if(res){
                            alert("수정이 완료되었습니다.")
                            refetch()
                        }
                    })}}
                        >카페 정보 수정</Button>
                    </article>
                </div>
            </section>
            </main>
            :null
        }
        </>
    )
}