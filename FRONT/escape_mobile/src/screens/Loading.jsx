import React, {useState, useCallback, useEffect} from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import { getMyInfo } from '../apis/MyPage';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

const Loading = () => {

    const navigation = useNavigation();

    // const [appIsReady, setAppIsReady] = useState(false);
    // const onLayoutRootView = useCallback(async () => {
    //     if (appIsReady) {
    //     // This tells the splash screen to hide immediately! If we call this after
    //     // `setAppIsReady`, then we may see a blank screen while the app is
    //     // loading its initial state and rendering its first pixels. So instead,
    //     // we hide the splash screen once we know the root view has already
    //     // performed layout.
    //     await SplashScreen.hideAsync();
    //     }
    // }, [appIsReady]);

    // useEffect(() => {
    //     async function prepare() {
    //     try {
    //         // Pre-load fonts, make any API calls, DB접근 등
    //         await Font.loadAsync({
    //         "SUIT-Bold": require("./src/assets/fonts/SUIT-Bold.otf"),
    //         "SUIT-ExtraBold": require("./src/assets/fonts/SUIT-ExtraBold.otf"),
    //         "SUIT-ExtraLight": require("./src/assets/fonts/SUIT-ExtraLight.otf"),
    //         "SUIT-Light": require("./src/assets/fonts/SUIT-Light.otf"),
    //         "SUIT-Medium": require("./src/assets/fonts/SUIT-Medium.otf"),
    //         "SUIT-Regular": require("./src/assets/fonts/SUIT-Regular.otf"),
    //         "SUIT-SemiBold": require("./src/assets/fonts/SUIT-SemiBold.otf"),
    //         Classic: require("./src/assets/fonts/Cafe24Classictype.ttf"),
    //         });
    //     } catch (e) {
    //         console.warn(e);
    //     } finally {
    //         // Tell the application to render
    //         setAppIsReady(true);
    //     }
    //     }

    //     prepare();
    // }, []);

    // if (!appIsReady) {
    //     return null;
    // }

    const [ready, setReady] = useState(false);
    const [userInfo, setUserInfo] = useState(false);
    const onFinish = () => setReady(true);
    const { data:UserInfo } = useQuery(['myInfo'], getMyInfo)
    const startLoading = async () => {
        await Font.loadAsync({
            "SUIT-Bold": require("../assets/fonts/SUIT-Bold.otf"),
            "SUIT-ExtraBold": require("../assets/fonts/SUIT-ExtraBold.otf"),
            "SUIT-ExtraLight": require("../assets/fonts/SUIT-ExtraLight.otf"),
            "SUIT-Light": require("../assets/fonts/SUIT-Light.otf"),
            "SUIT-Medium": require("../assets/fonts/SUIT-Medium.otf"),
            "SUIT-Regular": require("../assets/fonts/SUIT-Regular.otf"),
            "SUIT-SemiBold": require("../assets/fonts/SUIT-SemiBold.otf"),
            "Classic": require("../assets/fonts/Cafe24Classictype.ttf")
            });
        if(UserInfo){
            setUserInfo(true)
        }
    };

    if(!ready){
        return(
            <AppLoading
            startAsync={startLoading}
            onFinish={onFinish}
            onError={console.error} />
        )
    }
    return navigation.navigate('TabViewExample')
}

export default Loading;