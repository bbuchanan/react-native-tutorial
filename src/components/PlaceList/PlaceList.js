import React, { Component } from 'react'
import {Text, StyleSheet, FlatList } from 'react-native'

import ListItem from '../ListItem/ListItem'

const placeList = props => {
  const len = 'Places length = ' + props.places.length
  return (
    <FlatList style={styles.listContainer}
      data={props.places}
      renderItem={(info) => (<ListItem
        placeName={info.item.name}
        placeImage={info.item.image}
        onItemPressed={() => props.onItemSelected(info.item.key)}></ListItem>)}>
    </FlatList>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
})

export default placeList