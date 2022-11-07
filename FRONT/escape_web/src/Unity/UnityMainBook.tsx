import React, { useEffect } from 'react';
import {useState} from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
// import {} from '../public/Build/test.framework';
// import {} from '../../public/Build/test.framework';

const UnityMainBook = () => {

    const { unityProvider } = useUnityContext({
        loaderUrl: "/Build/Main/Book/Book.loader.js",
        dataUrl: "/Build/Main/Book/Book.data",
        frameworkUrl: "/Build/Main/Book/Book.framework.js",
        codeUrl: "/Build/Main/Book/Book.wasm"
    })

    return (
        <>
        <Unity unityProvider={unityProvider} style={{width:'100vw', height:'100vh'}} />
        </>
    )
}

export default UnityMainBook