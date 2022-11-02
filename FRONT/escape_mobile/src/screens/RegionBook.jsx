import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';

const RoomNumber = styled.Text`
    color:white;
`

export default function RegionBook({navigation, route}){
    const {num} = route.params
    return(
        <View>
            <RoomNumber>ROOM {num}</RoomNumber>
        </View>
    )
}