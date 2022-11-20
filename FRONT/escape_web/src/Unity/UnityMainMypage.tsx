import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";


const UnityMainMypage = () => {

    const { unityProvider } = useUnityContext({
        loaderUrl: "/Builds/Main/Mypage/MyPage.loader.js",
        dataUrl: "/Builds/Main/Mypage/MyPage.data",
        frameworkUrl: "/Builds/Main/Mypage/MyPage.framework.js",
        codeUrl: "/Builds/Main/Mypage/MyPage.wasm"
    })

    return (
        <>
        <Unity unityProvider={unityProvider} style={{width:'100vw', height:'100vh'}} />
        </>
    )
}

export default UnityMainMypage