const BASE_URL = "http://k7c104.p.ssafy.io:8080/api";
const Token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbTEwODAyQGdtYWlsLmNvbSIsInJvbGVzIjoiVXNlciIsImlzcyI6ImVzY2FwZWRpY3Rpb25hcnkuY29tIiwiaWF0IjoxNjY4MDU5MjYzLCJleHAiOjE2NjgxNDU2NjN9.12H9MZGW96Aps04r9L4tRHZZM1GGWadiz9EVMyT0crE'

export const getRegionCafeList = async ({ queryKey }) => {
    let [_, specificRegion, name] = queryKey;
    const keyword = `${name}/${specificRegion}`;
    const RegionCafe = new URLSearchParams({
        region: `${name}/${specificRegion}`
    });


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
    const response = await (await fetch(`${BASE_URL}/book/theme?${cafeTheme}`, {
        headers:{
            Authorization : Token
        }
    })).json()

    return response
}