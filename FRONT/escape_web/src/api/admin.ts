const BASE_URL = "https://k7c104.p.ssafy.io/api/admin";
import { QueryFunctionContext } from '@tanstack/react-query';

export const getStore = async () => {
    
    const response = await (
      await fetch(`${BASE_URL}/store`, {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json' 
        },
      })
    ).json();
    localStorage.setItem("CafeName", response[0].storeName)
    localStorage.setItem("storeId", response[0].storeId)

    return response
  };

export const putStore = async (storeId:number | undefined, changeAddress:string | undefined, changeHomepage:string | undefined, Region:string | undefined, LittleRegion:string | undefined, changeStoreImg:string | undefined, changeName:string | undefined, changeTel:string | undefined) => {
  const changeRegion = `${Region}/${LittleRegion}`
  const response = await (
    await fetch(`${BASE_URL}/store`, {
      method:'put',
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        "address": changeAddress,
        "homepage": changeHomepage,
        "region": changeRegion,
        "storeId": storeId,
        "storeImg": changeStoreImg,
        "storeName": changeName,
        "tel": changeTel
      })
    })
  ).json();
  return response
}

export const getThemeInfo = async ({ queryKey }: QueryFunctionContext<[string]>) => {
  const storeId = localStorage.getItem("storeId")
  const response = await(await fetch(`${BASE_URL}/theme?storeId=${storeId}`, {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json' 
    },
  })).json()
  return response
}

export const getThemeDetail = async (themeId:number) => {
  const response = await(await fetch(`${BASE_URL}/theme/${themeId}`, {
    headers: {
      Authorization: `${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json' 
    },
  })).json()
  return response
}

export const putTheme = async (capacity:string | undefined, content:string | undefined, difficulty:number | undefined, genre:string | undefined, leadtime:number | undefined, price:string | undefined, themeId:number | undefined, themeImg:string | undefined, themeTitle:string | undefined) => {

  const response = await (
    await fetch(`${BASE_URL}/theme`, {
      method:'put',
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        "capacity": capacity,
        "content": content,
        "difficulty": difficulty,
        "genre": genre,
        "leadtime": leadtime,
        "price": price,
        "themeId": themeId,
        "themeImg": themeImg,
        "themeTitle": themeTitle
      })
    })
  ).json();
  console.log(response)
  return response
}