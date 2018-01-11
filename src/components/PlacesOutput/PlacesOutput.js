import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import ListItem from '../ListItem/ListItem'

class PlacesOutput extends Component {
  render() {
    const placesOutput = this.props.places.map((place, index) => (<ListItem key={index} placeName={place} />))

    return (
      <View style={styles.listContainer}>
      {placesOutput}
    </View>
)
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
})

export default PlacesOutput