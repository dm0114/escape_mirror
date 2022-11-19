import { SecureState } from '../store/SecureStore';
const BASE_URL = "http://k7c104.p.ssafy.io:8080/api";

export const getRegionAssign = async({queryKey}) => {
    let [_, selectRegion, selectLittleRegion] = queryKey;
    const ResRegion = new URLSearchParams({
        region: `${selectRegion}/${selectLittleRegion}`
    });
    const response = await (await fetch(`${BASE_URL}/mainpage/transfer?${ResRegion}`, {
        headers:{
            Authorization : await SecureState.getData('accessToken')
        }
    })).json()
    return response
}

export const getSearchAssign = async({queryKey}) => {
    let [_, searchKeyword] = queryKey;
    const SearchWord = new URLSearchParams({
        searchWord: `${searchKeyword}`
    })
    const response = await (await fetch(`${BASE_URL}/mainpage/transfer/search?${SearchWord}`, {
        headers:{
            Authorization : await SecureState.getData('accessToken')
        }
    })).json()
    return response
}

export const postAssign = async(reserveId) => {
    const response = await (await fetch(`${BASE_URL}/mainpage/transfer`, {
        method:'put',
        headers:{
            Authorization : await SecureState.getData('accessToken'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "reservationId": reserveId
          })
    })).json()
    console.log("response", response)
    return response
}