import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import ListItem from './src/components/ListItem/ListItem'
import PlaceInput from './src/components/PlaceInput/PlaceInput'
import PlacesOutput from './src/components/PlacesOutput/PlacesOutput'

export default class App extends React.Component {
  state = {
    placeName: '',
    places: [
    ]
  }

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    })
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }

    this.setState(prevState => {
      return {
        places: prevState.places.concat(prevState.placeName)
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput placeName={this.state.placeName}
          placeNameChangedHandler={this.placeNameChangedHandler}
          placeSubmitHandler={this.placeSubmitHandler}
           />
        <PlacesOutput places={this.state.places} />
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
