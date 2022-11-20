import { Unity, useUnityContext } from "react-unity-webgl";
import React, { useEffect, useState } from 'react';
import { sep } from "path";

export default function Test(){
    const { unityProvider } = useUnityContext({
        loaderUrl: "Build/Main/Book/Book.loader.js",
        dataUrl: "Build/Main/Book/Book.data",
        frameworkUrl: "Build/Main/Book/Book.framework.js",
        codeUrl: "Build/Main/Book/Book.wasm"
      })

    const [plz, setPlz] = useState(false)

    useEffect(()=>{setPlz(true)}, [])
    return(
        <>
            {
                plz ? 
                <>
                <p>아</p>
                    <Unity unityProvider={unityProvider} style={{width:'100vw', height:'100vh'}} />
                </>
                :
                null
            }
        </>
    )
}