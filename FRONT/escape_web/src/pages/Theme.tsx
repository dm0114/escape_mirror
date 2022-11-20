/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import React, { useEffect, useState } from 'react';
import { Main, CafeSection, CafeManageHeader } from './Admin';
import LeftNav from '@components/LeftNav';
import { useQuery } from '@tanstack/react-query';
import { delTheme, delTime, getThemeDetail, getThemeInfo, postTime, putTime } from '../api/admin';
import Modal from 'react-bootstrap/Modal';
import onFileUpload from '../api/AWS';
import Button from 'react-bootstrap/Button';
import { BsFillCameraFill } from 'react-icons/bs';
import {CameraIcon, InputImg, CafeManageSection} from '../pages/Admin';
import Form from 'react-bootstrap/Form';
import { putTheme, postTheme } from "../api/admin";

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
    /* grid-template-columns: 1fr 1fr; */
    align-items:center;
    justify-content: center;
    margin-bottom: 20px;
    p{
        margin-bottom: 0;
        font-weight: 600;
        cursor: pointer;
    }
`
const FormGrid = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    const [nPrice, setNPrice] = useState<string[]>(['0', '0', '0', '0', '0']);
    const [nThemeId, setNThemeId] = useState<number>();
    const [nThemeImg, setNThemeImg] = useState<string>();
    const [nThemeTitle, setNThemeTitle] = useState<string>();
    const [nTime, setNTime] = useState<timeObject[]>();
    let PriceData:any = [];
    const [isTimeModal, setIsTimeModal]= useState(false);
    const handleClose = () => setIsShow(false);
    const [editTime, setEditTime] = useState<string>();
    const [editTimeId, setEditTimeId] = useState<number>();
    const [newTime, setNewTime] = useState<string>();
    const [isNewModal, setIsNewModal] = useState(false);

    const [newCapacity, setNewCapacity] = useState<string>();
    const [newContent, setNewContent] = useState<string>();
    const [newDifficult, setNewDifficult] = useState<number>();
    const [newGenre, setNewGenre] = useState<string>();
    const [newLeadTime, setNewLeadTime] = useState<number>();
    const [newPrice, setNewPrice] = useState<string[]>(['0', '0', '0', '0', '0']);
    const [newThemeId, setNewThemeId] = useState<number>();
    const [newThemeImg, setNewThemeImg] = useState<string>();
    const [newThemeTitle, setNewThemeTitle] = useState<string>();
    const [newReserveTime, setNewReserveTime] = useState<string[]>(['']);
    // const TimeForm = () => {
    //     return(
    //         <div style={{display:'flex', alignItems:'center'}}>
    //             <Form.Control type="text" placeholder="hh:mm" style={{width:100}} onChange={(e)=>{setNewReserveItem(e.target.value)}}/>
    //             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16"
    //             style={{marginLeft:10, cursor:'pointer'}} onClick={()=>{setNewReserveTime([...newReserveTime, newReserveItem])
    //             }}>
    //             <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    //             </svg>
    //         </div>
    //     )
    // }

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
        <>
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
        <Modal show={isTimeModal} onHide={() => setIsTimeModal(false)}>
        <Modal.Header closeButton>
        <Modal.Title>{nThemeTitle} 시간대 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <section style={{padding:20}}>
            {nTime !== undefined ? 
            <div css={FormGrid}>
            {nTime.map((item, index:number) => <div css={FormDiv}>
            <Form.Control type="text" placeholder={item.time} onChange={(e)=>{
                setEditTimeId(item.themeTimeId)
                setEditTime(e.target.value)
            }} style={{width:100, marginRight:10}}/>
            <p style={{color:'#4A6D39', marginRight:10}}
            onClick={()=>{putTime(editTimeId, editTime).then((res)=>{if(res){alert("수정 완료")}})}}>수정</p>
            <p style={{color:'#FC6847'}} onClick={()=>{
                delTime(item.themeTimeId).then((res) => {if(res){
                        alert("삭제 완료")
                        setIsTimeModal(false)}})
                }}>삭제</p>
            </div>)}
            <div css={FormDiv} style={{justifyContent:'flex-start', paddingLeft:19}}>
        <Form.Control type="text" placeholder="시간 입력" style={{width:100, marginRight:10}} onChange={(e)=>{setNewTime(e.target.value)}}/>                
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16"
                style={{cursor:'pointer'}} onClick={()=>{postTime(nThemeId, newTime).then((res)=>{if(res){
                    alert("추가 완료")
                    setIsTimeModal(false)}})}}>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </div>
            </div>
            : null}
            </section>
            {/* {nTime?.map((item) => console.log(item))} */}
        </Modal.Body>
        </Modal>
        </>
        
        : null}

    <Modal show={isNewModal} onHide={()=>{setIsNewModal(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>테마 등록</Modal.Title>
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
                            <div
                            css={css`
                                width:200px;
                                height:280px;
                                border-radius: 15px;
                                /* filter: brightness(50%); */
                                /* object-fit: cover; */
                            `} />
                        }

                    </div>
                </div>
            </div>
            <div>
            <section css={ThemeManage} style={{marginLeft:20, marginBottom:20}}>
                <header css={ThemeHeader}>테마명</header>
                <Form.Control type="text" value={newThemeTitle} onChange={(e)=>setNewThemeTitle(e.target.value)} 
                style={{width:'100%'}}/>
            </section>
            <section css={ThemeManage} style={{marginLeft:20, marginBottom:20}}>
                <header css={ThemeHeader}>설명</header>
                <Form.Control as="textarea" rows={5} value={newContent} onChange={(e)=>setNewContent(e.target.value)} 
                style={{width:'100%'}}/>
            </section>
            </div>
            </section>
            <section css={ModalSection}>
            <section css={ThemeManage}>
                <header css={ThemeHeader}>장르</header>
                <Form.Control type="text" value={newGenre} onChange={(e)=>setNewGenre(e.target.value)} 
                style={{width:'100%'}}/>
            </section>
            <section css={ThemeManage}>
                <header css={ThemeHeader}>인원</header>
                <Form.Control type="text" value={newCapacity} onChange={(e)=>setNewCapacity(e.target.value)} 
                style={{width:'100%'}}/>
            </section>
            </section>
            <section css={ModalSection}>
            <section css={ThemeManage}>
                <header css={ThemeHeader}>난이도</header>
                <Form.Control type="number" min={1} max={10} value={newDifficult} onChange={(e)=> setNewDifficult(Number(e.target.value))} 
                style={{width:'100%'}}/>
            </section>
            <section css={ThemeManage}>
                <header css={ThemeHeader}>소요시간</header>
                <Form.Control type="number" value={newLeadTime} onChange={(e)=>setNewLeadTime(Number(e.target.value))} 
                style={{width:'100%'}}/>
            </section>
            </section>
            <section css={ModalSection}>
            <section css={ThemeManage}>
                <header css={ThemeHeader}>시간대</header>
                <p style={{fontSize:15}}>시간대를 / 로 구분하여 입력해주세요.</p>
                <Form.Control as="textarea" style={{width:'440px'}} placeholder="ex) 10:30/11:30/12:30"
                onChange={(e)=>{
                    const temp = e.target.value
                    setNewReserveTime(temp.split("/"))
                }}></Form.Control>
            </section>
            </section>
            </Modal.Body>
            <Modal.Footer>
                        <Button onClick={()=>{
                            let price_string = '';
                            if(nPrice != undefined){
                                price_string = newPrice.join("/").replace("0", "");
                            }
                            postTheme(newCapacity, newContent, newDifficult, newGenre, newLeadTime, price_string, nThemeImg, newThemeTitle, newReserveTime)
                            .then((res) => {
                                if(res){
                                    alert("등록 성공")
                                    setIsNewModal(false)
                                    refetch()
                                }
                            })
                        }}>수정</Button>
            </Modal.Footer>
        </Modal>

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
                            <img src={`https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${item.themeImg}` } style={{width:200, height:270, objectFit:'cover', borderRadius:15, marginBottom:20}}
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
                            <p style={{color:'#FC6847', cursor:'pointer', fontSize:13}} onClick={()=>{delTheme(item.themeId).then((res)=>{if(res){
                                alert("삭제 완료")
                                refetch()
                            }})}}>삭제</p>
                        </div>
                    </article>)}
                    <article style={{position:'relative', display:'flex', flexDirection:'column', alignItems:'center', marginBottom:20}}>
                    <div css={
                                css`
                                    width:200px;
                                    height:265px;
                                    border:1px solid #394F6D;
                                    border-radius: 15px;
                                    display:flex;
                                    align-items: center;
                                    justify-content: center;
                                    background-color: white;
                                `
                            }
                            onClick={()=>{setIsNewModal(true)}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#394F6D" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                        </div>
                    </article>
                </section>
            </section>
        </main>
        </>
    )
}