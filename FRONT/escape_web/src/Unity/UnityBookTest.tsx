import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";


const UnityBookTest = () => {

    const { unityProvider } = useUnityContext({
        loaderUrl: "/Builds/Main/Book2/Book.loader.js",
        dataUrl: "/Builds/Main/Book2/Book.data",
        frameworkUrl: "/Builds/Main/Book2/Book.framework.js",
        codeUrl: "/Builds/Main/Book2/Book.wasm"
    })

    return (
        <>
        <Unity unityProvider={unityProvider} style={{width:'100vw', height:'100vh'}} />
        </>
    )
}

export default UnityBookTest