import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOtherCards, selectMyOtherCards } from '../../slices/myOtherCards';

const MyWalletMyOtherCards = () => {

  const myCards = useSelector(selectMyOtherCards)
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(getMyOtherCards())
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.image}>
        <Image style={styles.istanbulkartImage} source={{uri: myCards}} />
      </TouchableOpacity>
    </View>
  )
}

export default MyWalletMyOtherCards

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image:{
    marginHorizontal: 10,
    marginVertical: 10
  },
  istanbulkartImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'stretch',
    borderRadius: 12,
  }
})