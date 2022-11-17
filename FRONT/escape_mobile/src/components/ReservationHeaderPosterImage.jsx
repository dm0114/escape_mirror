import React, { useEffect, useRef } from 'react'
import { Animated, Image } from 'react-native';
import { useRecoilValue } from 'recoil';
import { LayoutData } from '../store/Atom';

const ReservationHeaderPosterImage = ({themeImg}) => {
  /**
  * 애니메이션
  */
  const layoutDatas = useRecoilValue(LayoutData)
  const {Width, Height} = layoutDatas 
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  // const opacityValue = useRef(new Animated.Value(0.9)).current;
  
  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1.05,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Animated.timing(opacityValue, {
    //   // YOur Random Value...
    //   toValue: 1,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();
  }, []);

  return (
      <Animated.View
        style={{
          position: "absolute",
          top: Height / 8.5,
          left: 0,
          right: 0,
          borderRadius: 50,
          elevation: 100,
          zIndex: 999,
          // opacity: opacityValue,
          transform: [{ scale: scaleValue}],
        }}
      >
        <Image
          source={ themeImg 
            ? {uri:`https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/${themeImg}`} 
            : {uri:'https://3blood-img-upload.s3.ap-northeast-1.amazonaws.com/NoImage.png'}}
          style={{
            width: Width - 40,
            height: Height / 4,
            resizeMode: "cover",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginLeft: 20,
          }}
          blurRadius={0}
        />
      </Animated.View>
  )
}

export default ReservationHeaderPosterImage