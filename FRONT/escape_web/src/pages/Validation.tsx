/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { postValidation } from '../api/validation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


interface IReqBody {
  clear: string,
  clearTime: string,
  reservationId: number,
  themeId: number,
  usedHint: string,
  userNicknames: []
}

export default function Validation() {
  const navigate = useNavigate();
  const params = useLocation().state;
  console.log('params', params)

  const [inputs, setInputs] = useState<IReqBody>({
    clear: '',
    clearTime: '',
    reservationId: params[0],
    themeId: params[1],
    usedHint: '',
    userNicknames: []
  });

  // GET
  const { isLoading, data, status, refetch } = useQuery(
    ["postReservation", inputs],
    postValidation, {
    enabled: false
  }
  );

  useEffect(() => {
    console.log(data);
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
    <main css={Main}>
      <h1 css={Title}>{params[2]}</h1>
      <Form css={Container}>
        <Form.Group css={Section}>
          <Form.Label css={Label} htmlFor="clear">클리어 여부</Form.Label>
          <Form.Control type="number" id="clear" name="clear" required
            onChange={onChange} value={(clear)} placeholder='ex)1' />
          <Form.Text className="text-muted" >
            클리어 했다면 1을, 클리어 하지 못했다면 0을 입력해주세요.
          </Form.Text>
        </Form.Group>

        <Form.Group css={Section}>
          <Form.Label css={Label} htmlFor="clearTime">클리어 타임</Form.Label>
          <Form.Control type="string" id="clearTime" name="clearTime" required
            onChange={onChange} value={clearTime} placeholder='ex)80:50' />
          <Form.Text className="text-muted" >
            80:50은 80분 50초를 의미합니다.
          </Form.Text>
        </Form.Group>

        <Form.Group css={Section}>
          <Form.Label css={Label} htmlFor="usedHint">사용한 힌트</Form.Label>
          <Form.Control type="number" id="usedHint" name="usedHint" required
            onChange={onChange} value={usedHint} placeholder='ex)1' />
        </Form.Group>

        <Form.Group css={Section}>
          <Form.Label css={Label} htmlFor="userNicknames">닉네임</Form.Label>
          <Form.Control type="string" id="userNicknames" name="userNicknames" required
            onChange={onChange} value={userNicknames} placeholder='ex)명탐정' />
        </Form.Group>
        <Button onClick={() => { refetch().then(() => { navigate(`/admin/reservation`) }) }}>인증하기</Button>
      </Form>
    </main>
  )
}

const Main = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`
const Title = css`
  font-weight: bold;
  margin: 30px;
`
const Section = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
`
const Container = css`
`

const Label = css`
  font-weight: bold;
`