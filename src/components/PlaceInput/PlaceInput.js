import React, { Component } from 'react'
import { TextInput, Button, StyleSheet, View } from 'react-native'

class PlaceInput extends Component {
  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput style={styles.placeInput} value={this.props.placeName}
          placeholder="An awesome place"
          onChangeText={this.props.placeNameChangedHandler} />
        <Button title="Add"
          style={styles.placeButton}
          onPress={this.props.placeSubmitHandler}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  },
})
export default PlaceInput