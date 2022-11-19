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
    return response
  };