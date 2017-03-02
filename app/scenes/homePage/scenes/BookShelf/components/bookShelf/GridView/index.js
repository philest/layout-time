import React, { Component } from 'react'
import {
  StyleSheet, View, Dimensions
} from 'react-native'

import GridView from './components/GridView'
import GridItem from './components/GridItem'

const { width, height } = Dimensions.get('window')

export default STGridView = ({items, itemsPerRow, onPress, renderHeader, renderFooter, locale}) => (
  <GridView
    renderHeader={ renderHeader }
    renderFooter={ renderFooter }
    items={ items }
    itemsPerRow={itemsPerRow}
    style={styles.gridView}
    renderItem={
      (r, rid) => {

        // if the item is not a dummy, we actually render stuff
        if (!r.dummy) {
          return (
            <GridItem
              numItems={items.length}
              key={r.key}
              index={r.key}
              awsKey={r.awsKey}
              title={r.title}
              imageSrc={{ uri: `https://s3.amazonaws.com/st-native-mobile/${locale}/${r.awsKey}/${r.awsKey}_spine.png` }}
              imageWidth={r.coverDims.x}
              imageHeight={r.coverDims.y}
              timeFirstRead={r.timeFirstRead}
              rowItemWidth={(width-(2*murrginz))/itemsPerRow}
              onPress={onPress}
            />
          )
        }
        // render a dummy
        else {
          return ( <View key={99999} style={{ width:(width-(2*murrginz))/itemsPerRow}}/> ) // TODO: fix this!!!!
        }
      }
    }
  />
)


const murrginz = 10

const styles = StyleSheet.create({
  dummy: {},
});
