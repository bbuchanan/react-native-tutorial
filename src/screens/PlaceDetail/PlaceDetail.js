import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import Icon from 'react-native-vector-icons/Ionicons';

import { deletePlace } from '../../store/actions/index'

class PlaceDetailScreen extends Component {
  state = {
    viewMode: Dimensions.get("window").width > 500 ? "portrait" : "landscape"
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = (dim) => {
    this.setState({
      viewMode: dim.window.height > 500 ? "portrait" : "landscape"
    });
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={[styles.container, this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landScapeContainer]}>
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
          </View>
          <View style={styles.subContainer}>
            <MapView
              style={styles.map}
              initialRegion={this.props.selectedPlace.location}>
              <MapView.Marker coordinate={this.props.selectedPlace.location}/>
            </MapView>
          </View>
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={this.placeDeletedHandler}>
                <View style={styles.deleteButton}>
                  <Icon size={30} name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} color="red" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landScapeContainer: {
    flexDirection: "row"
  },
  placeDetailContainer: {
    flex: 2
  },
  placeImage: {
    width: "100%",
    height: "100%"
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  },
  subContainer: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  }
}

export default connect(null, mapDispatchToProps)(PlaceDetailScreen)