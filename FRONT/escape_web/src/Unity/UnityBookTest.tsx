import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";


const UnityBookTest = () => {

    const { unityProvider } = useUnityContext({
        loaderUrl: "/Builds/Main/Book2/Book2.loader.js",
        dataUrl: "/Builds/Main/Book2/Book2.data",
        frameworkUrl: "/Builds/Main/Book2/Book2.framework.js",
        codeUrl: "/Builds/Main/Book2/Book2.wasm"
    })

    return (
        <>
        <Unity unityProvider={unityProvider} style={{width:'100vw', height:'100vh'}} />
        </>
    )
}

export default UnityBookTest