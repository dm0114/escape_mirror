const BASE_URL = "http://k7c104.p.ssafy.io:8080/api";
const Token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbTEwODAyQGdtYWlsLmNvbSIsInJvbGVzIjoiVXNlciIsInVzZXJJZCI6MSwiaXNzIjoiZXNjYXBlZGljdGlvbmFyeS5jb20iLCJpYXQiOjE2NjgyMjgzMTcsImV4cCI6MTY2ODMxNDcxN30.YZ7W2p59mKkiaxyPGLzBAb3_oAaS6J8gFMO4ZvEt91M'

export const getRegionCafeList = async ({ queryKey }) => {
    let [_, specificRegion, name] = queryKey;
    const keyword = `${name}/${specificRegion}`;
    const RegionCafe = new URLSearchParams({
        region: `${name}/${specificRegion}`
    });

    console.log(specificRegion, name)
    const response = await (await fetch(`${BASE_URL}/book/store?${RegionCafe}`, {
        headers:{
            Authorization : Token
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
            Authorization : Token
        }
    })).json()

    return response
}