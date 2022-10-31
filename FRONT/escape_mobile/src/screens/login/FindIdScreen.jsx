import React, { useState } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme';
import { Button, Text, View, TextInput, Dimensions, KeyboardAvoidingView, ScrollView, Platform, Alert,TouchableOpacity } from 'react-native';

export default function FindIdScreen() {
  
  return (
    <Container>

    </Container>
  )
}

const Container = styled.KeyboardAvoidingView `
  flex: 1;
  ${({ theme }) => theme.common.flexCenterColumn};
`