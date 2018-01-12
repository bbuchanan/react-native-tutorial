import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import ListItem from './src/components/ListItem/ListItem'
import PlaceInput from './src/components/PlaceInput/PlaceInput'
import PlaceList from './src/components/PlaceList/PlaceList'

export default class App extends React.Component {
  state = {
    placeName: '',
    places: [
    ]
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

  placeDeletedHandler = key => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(p => p.key !== key)
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput placeName={this.state.placeName}
          placeNameChangedHandler={this.placeNameChangedHandler}
          placeSubmitHandler={this.placeAddedHandler}
           />
        <PlaceList
          onItemDeleted={this.placeDeletedHandler}
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
