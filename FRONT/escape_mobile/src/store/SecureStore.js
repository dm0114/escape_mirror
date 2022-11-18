import * as SecureStore from 'expo-secure-store';

const setData = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
}

const getData = async (key) => {
  console.log(await SecureStore.getItemAsync(key))
  return await SecureStore.getItemAsync(key);
}

export const SecureState = {setData, getData}