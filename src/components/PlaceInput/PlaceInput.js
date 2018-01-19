import React, { Component } from 'react';
import { TextInput, Button, StyleSheet, View } from 'react-native';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const placeInput = props =>
  (
    <DefaultInput placeholder = "Place Name"
      value={props.placeData.value}
      valid={props.placeData.valid}
      touched={props.placeData.touched}
      onChangeText={props.onChangeText}>
    </DefaultInput>
  )

export default placeInput;