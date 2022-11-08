import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";


const UnityTest = () => {

    const { unityProvider } = useUnityContext({
        loaderUrl: "/Builds/test.loader.js",
        dataUrl: "/Builds/test.data.unityweb",
        frameworkUrl: "/Builds/test.framework.js.unityweb",
        codeUrl: "/Builds/test.wasm.unityweb"
    })

    return (
        <>
        <Unity unityProvider={unityProvider} style={{width:'100vw', height:'100vh'}} />
        </>
    )
}

export default UnityTest