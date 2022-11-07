import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";


const UnityMainBook = () => {

    const { unityProvider } = useUnityContext({
        loaderUrl: "/Builds/Main/Book/Book.loader.js",
        dataUrl: "/Builds/Main/Book/Book.data",
        frameworkUrl: "/Builds/Main/Book/Book.framework.js",
        codeUrl: "/Builds/Main/Book/Book.wasm"
    })

    return (
        <>
        <Unity unityProvider={unityProvider} style={{width:'100vw', height:'100vh'}} />
        </>
    )
}

export default UnityMainBook