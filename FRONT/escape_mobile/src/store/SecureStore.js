import * as SecureStore from 'expo-secure-store';

const setData = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
}

const getData = async (key) => {
<<<<<<< HEAD
  console.log(await SecureStore.getItemAsync(key))
  return await SecureStore.getItemAsync(key);
=======
  const result = await SecureStore.getItemAsync(key);
  console.log("token", result)
  return result


>>>>>>> 1c8cdf8582258c0dee0393cc16a6f3383b8612bb
}

export const SecureState = {setData, getData}