/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import React, { useEffect, useState } from 'react';
import { Main, CafeSection, CafeManageHeader } from './Admin';
import LeftNav from '@components/LeftNav';
import { useQuery } from '@tanstack/react-query';
import { getThemeDetail, getThemeInfo } from '../api/admin';
import Modal from 'react-bootstrap/Modal';
import onFileUpload from '../api/AWS';
import Button from 'react-bootstrap/Button';
import { BsFillCameraFill } from 'react-icons/bs';
import {CameraIcon, InputImg, CafeManageSection} from '../pages/Admin';
import Form from 'react-bootstrap/Form';
import { putTheme } from "../api/admin";

const cafeGrid = css`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width:900px;
`

const themeTitle = css`
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 5px;
`

const Circle = css`
    border-radius: 100px;
    padding:10px;
    width:40px;
    height:40px;
    display:flex;
    justify-content: center;
    align-items: center;
`

const DEDiv = css`
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        font-weight: 600;
        margin-bottom: 0;
    }
`

const ModalSection = css`
    display:flex;
    justify-content: space-between;
    margin-top: 10px;
`

const ThemeManage = css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    background-color: white;
    /* margin: 20px 0;
    padding: 0 40px; */
    border-radius: 15px;
`

const ThemeHeader = css`
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
`
interface timeObject {
    themeTimeId:number,
    time:string
}
interface selectItemType {
    capacity:string,
    content:string,
    difficaulty:number, 
    genre:string,
    leadtime:number,
    price:string,
    themeId:number,
    themeImg:string,
    themeTitle:string,
    reservationtime:timeObject[]
}

const FormDiv = css`
    display:flex;
    align-items:center;
    p{
        margin-bottom: 0;
    }
`


export default function Theme(){
    const {data, refetch} = useQuery(["themeInfo"], getThemeInfo)
    const [selectTheme, setSelectTheme] = useState<selectItemType>();
    const [isShow, setIsShow] = useState(false);
    const [nCapacity, setNCapacity] = useState<string>();
    const [nContent, setNContent] = useState<string>();
    const [nDifficult, setNDifficult] = useState<number>();
    const [nGenre, setNGenre] = useState<string>();
    const [nLeadTime, setNLeadTime] = useState<number>();
    const [nPrice, setNPrice] = useState<string[]>();
    const [nThemeId, setNThemeId] = useState<number>();
    const [nThemeImg, setNThemeImg] = useState<string>();
    const [nThemeTitle, setNThemeTitle] = useState<string>();
    const [nTime, setNTime] = useState<timeObject[]>();
    let PriceData:any = [];
    const [isTimeModal, setIsTimeModal]= useState(false);
    const handleClose = () => setIsShow(false);

    useEffect(()=>{
        if(selectTheme){
            setNCapacity(selectTheme.capacity)
            setNContent(selectTheme.content.replace("\\n\\n", " "))
            setNDifficult(selectTheme.difficaulty)
            setNGenre(selectTheme.genre)
            setNLeadTime(selectTheme.leadtime)
            const temp = selectTheme.price.split("/")
            temp.map((item:any, index:any) => {
                if(item != ''){
                    PriceData.push(temp[index].toString())
                }else{
                    PriceData.push(String(0))
                }
            })
            setNPrice(PriceData)
            setNThemeImg(selectTheme.themeImg)
            setNThemeTitle(selectTheme.themeTitle)
            setNTime(selectTheme.reservationtime)
        }
    }, [selectTheme])


    return(
        <>
        {selectTheme ? 
        <Modal show={isShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{nThemeTitle} 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{padding:30}}>
            <section css={ModalSection} style={{marginTop:0}}>
                <div style={{position:'relative', width:200}}>
                    <div>
                    <label htmlFor="uploadThemeImage" css={CameraIcon} >
                        <BsFillCameraFill size={30} color="white" />
                    </label>
                    <input type="file" id="uploadThemeImage" css={InputImg} onChange={e=>
                        {
                            onFileUpload(e)
                            const temp = e.target.value.replace(" ", "+").split("\\")
                            setNThemeImg(temp[2])
                        }}
                        />
                    <div />
                    <div css={
                                    css`
                                        width:200px;
                                        height:280px;
                                        background-position: center;
                                    `
                                }>
                        {
                            nThemeImg ? <img src={`https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${nThemeImg}`} 
                            css={css`
                                width:200px;
                                height:280px;
                                border-radius: 15px;
                                filter: brightness(50%);
                                object-fit: cover;
                            `} />
                            :
                            <img src={`https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${nThemeImg}`} 
                            css={css`
                                width:200px;
                                height:280px;
                                border-radius: 15px;
                                filter: brightness(50%);
                                object-fit: cover;
                            `} />
                        }

                    </div>
                </div>
            </div>
            <div>
            <section css={ThemeManage} style={{marginLeft:20, marginBottom:20}}>
                <header css={ThemeHeader}>테마명</header>
                <Form.Control type="text" value={nThemeTitle} onChange={(e)=>setNThemeTitle(e.target.value)} 
                style={{width:'100%'}}/>
            </section>
            <section css={ThemeManage} style={{marginLeft:20, marginBottom:20}}>
                <header css={ThemeHeader}>설명</header>
                <Form.Control as="textarea" rows={5} value={nContent} onChange={(e)=>setNContent(e.target.value)} 
                style={{width:'100%'}}/>
            </section>
            </div>
            </section>
            <section css={ModalSection}>
            <section css={ThemeManage}>
                <header css={ThemeHeader}>장르</header>
                <Form.Control type="text" value={nGenre} onChange={(e)=>setNGenre(e.target.value)} 
                style={{width:'100%'}}/>
            </section>
            <section css={ThemeManage}>
                <header css={ThemeHeader}>인원</header>
                <Form.Control type="text" value={nCapacity} onChange={(e)=>setNCapacity(e.target.value)} 
                style={{width:'100%'}}/>
            </section>
            </section>
            <section css={ModalSection}>
            <section css={ThemeManage}>
                <header css={ThemeHeader}>난이도</header>
                <Form.Control type="number" min={1} max={10} value={nDifficult} onChange={(e)=> setNDifficult(Number(e.target.value))} 
                style={{width:'100%'}}/>
            </section>
            <section css={ThemeManage}>
                <header css={ThemeHeader}>소요시간</header>
                <Form.Control type="number" value={nLeadTime} onChange={(e)=>setNLeadTime(Number(e.target.value))} 
                style={{width:'100%'}}/>
            </section>
            </section>
            <section css={ModalSection}>
            <section css={ThemeManage}>
                <header css={ThemeHeader}>가격</header>
                {nPrice ? 
                <>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', marginBottom:15}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <Form.Label style={{marginBottom:0, marginRight:13, fontWeight:500}}>1인</Form.Label>
                        <Form.Control type="text" value={nPrice[0]} style={{width:175, marginRight:15}}
                        onClick={()=>{console.log(nPrice)}}
                        onChange={(e)=>{
                            let tempPrice = e.target.value;
                            setNPrice([tempPrice, nPrice[1], nPrice[2], nPrice[3], nPrice[4]])
                        }}
                        />
                        <Form.Label style={{marginBottom:0, marginRight:10, fontWeight:500}}>2인</Form.Label>
                        <Form.Control type="text" value={nPrice[1]} style={{width:175}}
                        onChange={(e)=>{
                            let tempPrice = e.target.value;
                            setNPrice([nPrice[0], tempPrice, nPrice[2], nPrice[3], nPrice[4]])
                        }}/>
                    </div>
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', marginBottom:15}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <Form.Label style={{marginBottom:0, marginRight:10, fontWeight:500}}>3인</Form.Label>
                        <Form.Control type="text" value={nPrice[2]} style={{width:175, marginRight:15}}
                        onChange={(e)=>{
                            let tempPrice = e.target.value;
                            setNPrice([nPrice[0], nPrice[1], tempPrice, nPrice[3], nPrice[4]])
                        }}/>
                        <Form.Label style={{marginBottom:0, marginRight:10, fontWeight:500}}>4인</Form.Label>
                        <Form.Control type="text" value={nPrice[3]} style={{width:175}}
                        onChange={(e)=>{
                            let tempPrice = e.target.value;
                            setNPrice([nPrice[0], nPrice[1], nPrice[2], tempPrice, nPrice[4]])
                        }}/>
                    </div>
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', marginBottom:15}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <Form.Label style={{marginBottom:0, marginRight:10, fontWeight:500}}>5인</Form.Label>
                        <Form.Control type="text" value={nPrice[4]} style={{width:175, marginRight:15}}
                        onChange={(e)=>{
                            let tempPrice = e.target.value;
                            setNPrice([nPrice[0], nPrice[1], nPrice[2], nPrice[3], tempPrice])
                        }}/>
                    </div>
                </div>
                </>
                : null}
            </section>
            </section>
            </Modal.Body>
            <Modal.Footer>
                        <Button onClick={()=>{
                            let price_string = '';
                            if(nPrice != undefined){
                                price_string = nPrice.join("/").replace("0", "");
                            }
                            putTheme(nCapacity, nContent, nDifficult, nGenre, nLeadTime, price_string, nThemeId, nThemeImg, nThemeTitle)
                            .then((res) => {
                                if(res){
                                    setIsShow(false)
                                    refetch()
                                }
                            })
                        }}>수정</Button>
            </Modal.Footer>
        </Modal> 
        : null}
        {isTimeModal? 
            <Modal show={isTimeModal} onHide={() => setIsTimeModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>{nThemeTitle} 시간대 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                {nTime !== undefined ? 
                nTime.map((item, index:number) => <div css={FormDiv}>
                <Form.Control type="text" placeholder={item.time} onChange={(e)=>{
                    let obj = nTime;
                    obj.map((temp) => {
                        if(temp.themeTimeId === item.themeTimeId){
                            temp.time = e.target.value;
                        }
                    })
                    setNTime(obj)
                }} style={{width:300, marginRight:10}}/>
                <p>수정</p>
                <p>삭제</p>
                </div>)
                : null}
                </>
                {/* {nTime?.map((item) => console.log(item))} */}
            </Modal.Body>
            </Modal>
        : null}
        <main css={Main}>
            <LeftNav />
            <section css={CafeSection}>
                <p css={CafeManageHeader} style={{marginTop:15}}>현재 서비스 중인 테마 목록</p>
                <section css={cafeGrid}>
                    {data && data.map((item:any) => <article style={{position:'relative', display:'flex', flexDirection:'column', alignItems:'center', marginBottom:20}}>
                        <div css={
                                css`
                                    width:200px;
                                    height:280px;
                                    background-position: center;
                                `
                            }>
                            <img src={`https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${item.themeImg}` } style={{width:200, objectFit:'cover', borderRadius:15, marginBottom:20}}
                            />
                        </div>
                        <p css={themeTitle}>{item.themeTitle}</p>
                        <div css={DEDiv}>
                        <p style={{color:'#4A6D39', cursor:'pointer', fontSize:13}} 
                            onClick={()=>{
                                getThemeDetail(item.themeId).then((res)=> setSelectTheme(res))
                                setNThemeId(item.themeId)
                                setIsTimeModal(true)}}>시간대 수정</p>
                            <p>&nbsp; | &nbsp;</p>
                            <p style={{color:'#4A6D39', cursor:'pointer', fontSize:13}} 
                            onClick={()=>{
                                getThemeDetail(item.themeId).then((res)=> setSelectTheme(res))
                                setNThemeId(item.themeId)
                                setIsShow(true)}}>정보 수정</p>
                            <p>&nbsp; | &nbsp;</p>
                            <p style={{color:'#FC6847', cursor:'pointer', fontSize:13}}>삭제</p>
                        </div>

                    </article>)}
                </section>
            </section>
        </main>
        </>
    )
}