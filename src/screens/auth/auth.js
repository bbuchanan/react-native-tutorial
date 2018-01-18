import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    let headingText = null;

    if (Dimensions.get("window").height > 500) {
      headingText = (<MainText>
        <HeadingText>Please Login</HeadingText>
      </MainText>)
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4" onPress={() => alert('yo')}>Switch to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="Your email address" style={styles.input} />
            <View style={styles.passwordContainer}>
              <View style={styles.passwordWrapper}>
              <DefaultInput placeholder="Your password" style={styles.input} />
              </View>
              <View style={styles.passwordWrapper}>
              <DefaultInput placeholder="Confirm password" style={styles.input} />
              </View>
            </View>
          </View>
          <ButtonWithBackground
            color="#29aaf4"
            onPress={this.loginHandler}>
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  passwordContainer: {
    flexDirection: Dimensions.get("window").height > 500 ? "column" : "row",
    justifyContent: "space-between"
  },
  passwordWrapper: {
    width: Dimensions.get("window").height > 500 ? "45%" : "100%"
  }
});
export default AuthScreen;