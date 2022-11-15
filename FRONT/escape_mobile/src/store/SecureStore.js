import * as SecureStore from 'expo-secure-store';

const setData = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
}

const getData = async (key) => {
  return await SecureStore.getItemAsync(key);
  // console.log(result)
}

export const SecureState = {setData, getData}