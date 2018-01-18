import React, { Component } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView, Image, BackAndroid } from 'react-native';
import { connect } from 'react-redux';

import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

import { addPlace } from '../../store/actions/index';

class SharePlaceScreen extends Component {
  state = {
    placeName: ''
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id == 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  }

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  }
  placeAddedHandler = () => {
    if (this.state.placeName.trim() !== "") {
      this.props.onAddPlace(this.state.placeName);
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>
              Share a place with us!
            </HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput
            placeName={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}>
          </PlaceInput>
          <View style={styles.button}>
            <Button title="Share the Place!" onPress={this.placeAddedHandler}></Button>
          </View>
        </View>
      </ScrollView>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
}
export default connect(null, mapDispatchToProps)(SharePlaceScreen);