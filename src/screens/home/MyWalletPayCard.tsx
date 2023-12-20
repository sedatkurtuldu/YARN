import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPayCardImage, selectPayCardImage } from '../../slices/payCardSlice';
import expoLanguageDetector from '../../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';
import { addResources } from '../../../i18n';
import { en, tr } from '../../../locales';
import { FontAwesome5 } from '@expo/vector-icons';

const MyWalletPayCard = () => {

  const payCardImageUrl = useSelector(selectPayCardImage)

  const dispatch = useDispatch();

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  const buttonWidthRatio = 0.39;
  const buttonHeightRatio = 0.06;
  const buttonLeftRatio = 0.10;
  const buttonTopRatio = 0.24;

  const language = expoLanguageDetector.detect();

  const { t } = useTranslation();

  useEffect(() => {
    //@ts-ignore
    dispatch(getPayCardImage())

    if(language == "en") {
      addResources(en);
     }
     else {
      addResources(tr);
     }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.yarnCard}>
        <Image style={styles.yarnCardImage} source={{uri: payCardImageUrl}} />
      </View>
      <TouchableOpacity
        style={{
          ...styles.yarnCardButton,
          width: windowWidth * buttonWidthRatio,
          height: windowHeight * buttonHeightRatio,
          left: windowWidth * buttonLeftRatio,
          top: windowHeight * buttonTopRatio,
        }}
      >
        <View style={styles.yarnCardCreateButton}>
          <Text style={styles.yarnCardCreateButtonText}>{t("yarncard.create")}</Text>
          <FontAwesome5 name="angle-right" size={18} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default MyWalletPayCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  yarnCard: {
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  yarnCardImage: {
    width: '100%',
    height: '84%',
    resizeMode: 'stretch',
    borderRadius: 28,
  },
  yarnCardButton: {
    position: 'absolute',
    borderRadius: 12,
    marginTop: '5%'
  },
  yarnCardCreateButton: {
    backgroundColor: "#3ab44a",
    padding: 14,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  yarnCardCreateButtonText: {
    color: "white",
    fontWeight: "bold",
  }
})
