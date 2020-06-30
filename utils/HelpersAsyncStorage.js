import { AsyncStorage } from 'react-native';

const HelpersAsyncStorage = {
  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
     console.log(error);
     
    }
  },

  get: async (key) => {
    let value = null;
    try {
      value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
      }
    } catch (error) {
      console.log(error);
    }
    return value
  }
}

export default HelpersAsyncStorage