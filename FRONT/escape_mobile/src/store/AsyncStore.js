import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storing string value
 */
const setData = async (value) => {
  try {
    await AsyncStorage.setItem('refresh', value)

  } catch (e) {
    // saving error
  }
}

/**
 * Reading string value
 */
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('refresh')
    if(value !== null) {
      // value previously stored
      console.log(value);
    }
  } catch(e) {
    // error reading value
  }
}

export const AsyncState = {setData, getData}