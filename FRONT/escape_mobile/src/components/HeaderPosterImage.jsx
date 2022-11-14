import React, { useEffect, useRef, useState, useContext } from 'react'
import { Animated, Image } from 'react-native';
import { LayoutContext } from '../../App';
const cardImage = require("../assets/mocks/image.png");

const HeaderPosterImage = () => {
  /**
  * 애니메이션
  */
  const {Width, Height} = useContext(LayoutContext);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: Height / 9,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
      <Animated.View
        style={{
          position: "absolute",
          top: -(Height / 7),
          left: 0,
          right: 0,
          borderRadius: 50,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#00000020",
          elevation: 50,
          zIndex: 999,
          transform: [{ scale: scaleValue }, { translateY: offsetValue }],
        }}
      >
        <Image
          source={cardImage}
          style={{
            width: Width - 40,
            height: Height / 4,
            resizeMode: "cover",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginLeft: 20,
          }}
          blurRadius={0}
        />
      </Animated.View>
  )
}

export default HeaderPosterImage