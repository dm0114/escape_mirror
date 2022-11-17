import { SecureState } from '../store/SecureStore';
const BASE_URL = "http://k7c104.p.ssafy.io:8080/api";
const Token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbTEwODAyQGdtYWlsLmNvbSIsInJvbGVzIjoiVXNlciIsInVzZXJJZCI6MSwiaXNzIjoiZXNjYXBlZGljdGlvbmFyeS5jb20iLCJpYXQiOjE2NjgyMjgzMTcsImV4cCI6MTY2ODMxNDcxN30.YZ7W2p59mKkiaxyPGLzBAb3_oAaS6J8gFMO4ZvEt91M'
// const token = await SecureStore.getItemAsync('secure_token');

export const getRegionCafeList = async (specificRegion, name, page) => {
    // let [_, specificRegion, name, page] = queryKey;
    const keyword = `${name}/${specificRegion}`;
    const RegionCafe = new URLSearchParams({
        region: `${name}/${specificRegion}`
    });
    const PageNum = new URLSearchParams({
        page:page
    })
    const response = await (await fetch(`${BASE_URL}/book/store?${RegionCafe}&${PageNum}`, {
        headers:{
            Authorization : await SecureState.getData('accessToken')
        }
    })).json()

    return response
  }

export const getCafeThemeList = async ({ queryKey }) => {
    let [_, storeId] = queryKey;
    const cafeTheme = new URLSearchParams({
        storeId:storeId
    })
    const response = await (await fetch(`http://k7c104.p.ssafy.io:8080/api/book/theme?${cafeTheme}`, {
        headers:{
            Authorization : await SecureState.getData('accessToken')
        }
    })).json()

    return response
}