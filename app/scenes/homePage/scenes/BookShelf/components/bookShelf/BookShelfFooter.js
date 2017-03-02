import React, { Component }     from 'react'
import { View, StyleSheet, Image } from 'react-native'


export default Footer = () => {
  return (
    <View style={styles.container}>

      <View>
        <Image
          resizeMode='contain'
          style={{width:200, height:90}}
          source={{uri:'st_logo'}}/>
      </View>

      <View>
        <Image
          resizeMode='contain'
          style={{width:60, height:43}}
          source={{uri:'sammy'}}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 30,
    paddingBottom: 50,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
})
