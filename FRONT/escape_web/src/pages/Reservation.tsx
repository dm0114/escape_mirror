/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { reservationApi } from "../api/reservation";
import moment from "moment-timezone";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LeftNav from "@components/LeftNav";



const nowTime = moment().tz('Asia/Seoul').format("YYYY-MM-DDTHH:mm:ss")

const KoTIme = () => {
  const now = new Date(nowTime) // 현재 시간
  const Days = [`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`];
  for (let i = 0; i < 6; i++) {
    var tmp = new Date(now.setDate(now.getDate() + 1));
    var day = tmp.getDate();
    Days.push(`${tmp.getFullYear()}-${tmp.getMonth() + 1}-${day}`);
  }
  return Days;
};

export default function Reservation() {
  const navigate = useNavigate();
  const Days = KoTIme();
  const [reservationId, setReservationId] = useState<number>(-1)
  const [reservationDay, setReservationDay] = useState<string>(Days[0])
  const storeId = 1
  // const [datePick, setDatePick] = useState<boolean>(false)
  // GET
  const { isLoading, data, status, refetch } = useQuery(
    ["GetReservation", reservationDay, storeId],
    reservationApi.getReservation
  );
  useEffect(() => { console.log(data), [data] })

  const getFunction = (reservationDayParam: string) => {
    setReservationDay(reservationDayParam)
    refetch()
  }

  // PUT
  const { data: putRes, status: putStatus, refetch: putRefetch } = useQuery(
    ["PutReservation", reservationId],
    reservationApi.putReservation, {
    enabled: false
  }
  );
  const putFunction = (reservationNum: number) => {
    setReservationId(reservationNum)
    putRefetch()
    console.log('풋');

  }

  // DELETE
  const { data: deleteRes, status: deleteStatus, refetch: deleteRefetch } = useQuery(
    ["DeleteReservation", reservationId],
    reservationApi.deleteReservation, {
    enabled: false
  }
  );
  const deleteFunction = (reservationNum: number) => {
    setReservationId(reservationNum)
    deleteRefetch()
    console.log('딜');
  }

  useEffect(() => {
    console.log(putRes);
  }, [putRes])
  useEffect(() => {
    console.log(deleteRes);
  }, [deleteRes])

  return isLoading
    ? <>로딩 중...</>
    : (
      <div css={Contain}>
        <LeftNav />
        <main css={Main}>
          {data && data !== undefined ?
            <>
              <h1 css={CafeTitle}>{data && data.storeName}</h1>
              <div style={{ width: '70vw', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-evenly", marginBottom: 50 }}>
                {Days.map((item, idx) => {
                  console.log('days', Days)
                  return (
                    <>
                      <button css={DateBtn} key={idx} onClick={() => { getFunction(item) }}>
                        <h2>{item.slice(5,)}</h2>
                        <div>
                        </div>
                        <hr />
                      </button>
                      {/* {datePick == true ?
                        <button css={DatePickBtn} key={idx} onClick={() => { getFunction(item), setDatePick(!datePick) }}>
                          <h2>{item.slice(5,)}</h2>
                          <div>
                          </div>
                          <hr />
                        </button>
                        :
                        <button css={DateBtn} key={idx} onClick={() => { getFunction(item), setDatePick(!datePick) }}>
                          <h2>{item.slice(5,)}</h2>
                          <div>
                          </div>
                          <hr />
                        </button>} */}

                    </>
                  )
                })}
              </div>
              <h3 css={reserveTitle}>예약 목록</h3>
              {data && data.themeReservationList.map((el: any) => {
                console.log('data', data)
                return (
                  <div css={ThemeContainer} key={el.themeId}>
                    {/* <p>{el.themeId}</p> */}
                    <Accordion defaultActiveKey="0" style={{ margin: 10 }}>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header css={ThemeTitle}>{el.themeName}</Accordion.Header>
                        <Accordion.Body css={ReserveLists}>
                          {/* <Row xs={1} md={5} className="g-4" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}> */}
                          <Container>
                            <Row xs={1} sm={3} xxl={4} >
                              {el.timeReservationDto.map((elem: any, idx: number) => {
                                console.log(el)
                                return (
                                  <Col >
                                    <Card css={ReserveList} key={idx}>
                                      <div css={TextList}>
                                        <p css={reserveId}>No.{elem.reservationId}</p>
                                        <p css={UserName}>{elem.userName}</p>
                                        <p css={UserTime}>{elem.reservationTime}</p>
                                      </div>
                                      {elem.accept ? <p css={OkTxt}>승인 완료</p> : <p css={IngTxt}>승인 대기</p>}
                                      <div css={BtnContainer}>
                                        <Button css={OkBtn} onClick={() => { putFunction(elem.reservationId) }}>  승인  </Button>
                                        <Button css={NoBtn} onClick={() => { deleteFunction(elem.reservationId) }}>  거부  </Button>
                                        <Button css={StempBtn} onClick={() => { navigate(`/admin/validation`, { state: [elem.reservationId, el.themeId, el.themeName] }) }}>도장 찍기</Button>
                                        {/* <p>{elem.reservationTimeId}</p>
                                          <p>{elem.status}</p> */}
                                      </div>
                                    </Card>
                                  </Col>
                                )
                              })}
                            </Row>
                          </Container>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                )
              })}
            </>
            : null
          }
        </main >
      </div>)
}

const Contain = css`
  display: flex;
`
const Main = css`
  display: flex;
  flex-direction: column;
  margin: 50px;
  width: 70vw;
`

const CafeTitle = css`
  margin: 30px 0 100px 0;
  font-weight: bolder;
  display: flex;
  justify-content: flex-start;
`
const reserveTitle = css`
  margin: 10px;
  font-weight: bolder;
  display: flex;
  justify-content: flex-start;
`

const DateBtn = css`
  border-radius: 10px;
  border: none;
  padding: 20px;
`

const DatePickBtn = css`
  border-radius: 10px;
  border: none;
  padding: 20px;
  background-color: #525151;
  color: white;
`
const ThemeTitle = css`
  /* font-weight: bold;

  display: flex;
  justify-content: flex-start; */

`
const ReserveLists = css`
  display:flex;
  flex-direction: row;
`

const ReserveList = css`
  display: flex;
  border: 1px solid black;
  border-radius: 15px;
  padding: 30px 50px;
  justify-content: center;
  align-items: center;
`

const OkTxt = css`
  color: green ;
  margin: 10px ;
`

const IngTxt = css`
  color:#ff5f3f;
  font-size:x-large;
  font-weight: bold;
  margin: 10px ;
`

const OkBtn = css`
  border-radius: 10px;
  border: none;
  padding: 7px;
  margin: 0 3px;
  background-color: #063f94;
  color: white;
  :hover{
  background-color: #00005e;
  }
`
const NoBtn = css`
  border-radius: 10px;
  border: none;
  padding: 7px;
  margin: 0 3px;
  background-color: #ff5f3f;
  color: white;
  :hover{
    background-color: #e63815;
  }
`
const StempBtn = css`
  border-radius: 10px;
  border: none;
  padding: 7px;
  margin: 0 3px;
  background-color: grey;
  :hover{
  background-color: #464343;
  }
`

const ThemeContainer = css`
  display: flex;
  flex-direction: column;
`

const UserName = css`
  font-size: x-large;
  font-weight: 800;
  margin: 5px;
`

const reserveId = css`
  margin: 0;
`

const UserTime = css`
  color: grey;
  margin: 0;
`
const TextList = css`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`

const BtnContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`