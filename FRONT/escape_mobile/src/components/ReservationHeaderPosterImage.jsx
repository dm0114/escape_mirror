import React, { useEffect, useRef, useState, useContext } from 'react'
import { Animated, Image } from 'react-native';
import { LayoutContext } from '../../App';
const cardImage = require("../assets/mocks/image.png");

const ReservationHeaderPosterImage = () => {
  /**
  * 애니메이션
  */
  const {Width, Height} = useContext(LayoutContext);
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
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#00000020",
          elevation: 100,
          zIndex: 999,
          // opacity: opacityValue,
          transform: [{ scale: scaleValue}],
        }}
      >
        <Image
          source={cardImage}
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