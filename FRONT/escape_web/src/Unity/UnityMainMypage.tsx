import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";


const UnityMainMypage = () => {

    const { unityProvider } = useUnityContext({
        loaderUrl: "/Builds/Main/Mypage/MyPage.loader.js",
        dataUrl: "/Builds/Main/Mypage/MyPage.data.unityweb",
        frameworkUrl: "/Builds/Main/Mypage/MyPage.framework.js.unityweb",
        codeUrl: "/Builds/Main/Mypage/MyPage.wasm.unityweb"
    })

    return (
        <>
        <Unity unityProvider={unityProvider} style={{width:'100vw', height:'100vh'}} />
        </>
    )
}

export default UnityMainMypage