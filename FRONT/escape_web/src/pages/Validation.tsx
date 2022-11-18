import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { postValidation } from '../api/validation';

interface IReqBody {
  clear: string,
  clearTime: string,
  reservationId: number,
  themeId: number,
  usedHint: string,
  userNicknames: []
}

export default function Validation() {
  const params = useLocation().state;


  const [inputs, setInputs] = useState<IReqBody>({
    clear: '',
    clearTime: '',
    reservationId: params[0],
    themeId: params[1],
    usedHint: '',
    userNicknames: []
  });

  // GET
  const { isLoading, data , status, refetch } = useQuery(
    ["postReservation", inputs],
    postValidation, {
      enabled: false
    }
  );

  useEffect(() => {console.log(data);
  }, [data])

  const { clear, clearTime, themeId, usedHint, userNicknames } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e: any) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, 
    });
  };  


  return (
    <>
      
        <label htmlFor="clear">클리어 여부</label>
        <input type="number" id="clear" name="clear" required
        size={10} onChange={onChange} value={(clear)}/>
        <br/>

        <label htmlFor="clearTime">클리어 타임</label>
        <input type="string" id="clearTime" name="clearTime" required
        size={10} onChange={onChange} value={clearTime}/>
        <br/>

        <label htmlFor="usedHint">사용한 힌트</label>
        <input type="number" id="usedHint" name="usedHint" required
        size={10} onChange={onChange} value={usedHint}/>
        <br/>

        <label htmlFor="userNicknames">닉네임</label>
        <input type="string" id="userNicknames" name="userNicknames" required
        size={10} onChange={onChange} value={userNicknames}/>

        <button onClick={() => {refetch()}}>꾹</button>
    </>
  )
}
