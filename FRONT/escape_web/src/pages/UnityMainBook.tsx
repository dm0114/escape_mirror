import React from 'react';
import Unity, {UnityContext} from "react-unity-webgl";

const unityContext = new UnityContext ( { 
    loaderUrl : "/Build/Main/Book/Book.loader.js" , 
    dataUrl : "/Build/Main/Book/Book.data" , 
    frameworkUrl : "/Build/Main/Book/Book.framework.js" , 
    codeUrl : "/Build/Main/Book/Bookwasm" , 
  } ) ;

const UnityMainBook = () => {

    return (
        <Unity unityContext={unityContext} />
    )
}

export default UnityMainBook