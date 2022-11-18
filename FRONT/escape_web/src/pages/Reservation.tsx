import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { reservationApi } from "../api/reservation";
import moment from "moment-timezone";
import { useNavigate } from 'react-router-dom';
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
  
  // GET
  const { isLoading, data , status, refetch } = useQuery(
    ["GetReservation", reservationDay, storeId],
    reservationApi.getReservation
  );
  useEffect(() => {console.log(data), [data]})

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

  useEffect(() => {console.log(putRes);
  },[putRes])
  useEffect(() => {console.log(deleteRes);
  },[deleteRes])

  return isLoading 
  ? <>로딩 중...</> 
  : <>
      <h1>{data.storeName}</h1>
      <div style={{width: '100vw', display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: "space-between",}}>
        {Days.map((item, idx) => {          
          return (
            <button key={idx} onClick={() => {getFunction(item)}}>
              <h2>{item.slice(5,)}</h2>
              <div>
              </div>
              <hr/>
            </button>
          )
        })}
      </div>
      {data.themeReservationList.map((el: any) => {
                return (
                  <div key={el.themeId}>
                    <p>{el.themeId}</p>
                    <h3>{el.themeName}</h3>
                    <div>
                      {el.timeReservationDto.map((elem: any, idx: number) => {
                        return (
                          <div key={idx}>
                            <h4>{elem.reservationId}</h4>
                            {elem.accept ? <p>'승인 완료'</p> : <p>'승인 대기'</p>}
                            <button onClick={() => {putFunction(elem.reservationId)}}>승인</button>
                            <button onClick={() => {deleteFunction(elem.reservationId)}}>거부</button>
                            <button onClick={() => {navigate(`/admin/validation`, {state: [elem.reservationId, el.themeId]});}}>도장 찍기</button>
                            <p>{elem.reservationTime}</p>
                            <p>{elem.reservationTimeId}</p>
                            <p>{elem.status}</p>
                            <p>{elem.userName}</p>
                          </div>
                        )
                      })}
                    </div>

                    
                  </div>
                )
              })}
    </>
}