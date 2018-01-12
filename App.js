import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import ListItem from './src/components/ListItem/ListItem'
import PlaceInput from './src/components/PlaceInput/PlaceInput'
import PlaceList from './src/components/PlaceList/PlaceList'
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'

export default class App extends React.Component {
  state = {
    placeName: '',
    places: [
    ],
    selectedPlace: null
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    })
  }

  placeAddedHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    };

    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          image: {
            uri: "https://inception-app-prod.s3.amazonaws.com/YWE1OGJjMjAtNjkzNS00ZjQxLWE1ZmUtZTM0NDk0YjI1Yjgw/content/2016/10/79f7d0a8d3b1ec81943d0fc829a8aef8.jpg",
            height: 30,
            width: 30
          },
          name: this.state.placeName })
      };
    });
  };

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(p => p.key === key)
      };
    });
  };

  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(p => p.key !== prevState.selectedPlace.key),
        selectedPlace: null
      };
    });
  };

  modalClosed = () => {
    this.setState({
      selectedPlace: null
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail selectedPlace={this.state.selectedPlace} onItemDeleted={this.placeDeletedHandler} onModalClosed={this.modalClosed} />
        <PlaceInput placeName={this.state.placeName}
          placeNameChangedHandler={this.placeNameChangedHandler}
          placeSubmitHandler={this.placeAddedHandler}
           />
        <PlaceList
          onItemSelected={this.placeSelectedHandler}
          places={this.state.places} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
