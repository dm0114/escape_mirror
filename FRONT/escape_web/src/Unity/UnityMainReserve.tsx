import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";


const UnityMainReserve = () => {

    const { unityProvider } = useUnityContext({
        loaderUrl: "/Builds/Main/Reservation/Reservation.loader.js",
        dataUrl: "/Builds/Main/Reservation/Reservation.data",
        frameworkUrl: "/Builds/Main/Reservation/Reservation.framework.js",
        codeUrl: "/Builds/Main/Reservation/Reservation.wasm"
    })

    return (
        <>
        <Unity unityProvider={unityProvider} style={{width:'100vw', height:'100vh'}} />
        </>
    )
}

export default UnityMainReserve