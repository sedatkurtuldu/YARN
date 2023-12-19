import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryBrand, selectCategoryBrands } from '../../slices/categoryBrandSlice'
import MySearchBarButton from '../../components/MySearchBarButton'
import expoLanguageDetector from '../../../plugins/expoLanguageDetector'
import { useTranslation } from 'react-i18next'
import { en, tr } from '../../../locales'
import { addResources } from '../../../i18n'

const CategoryBrand = ( { navigation } ) => {
  const categoryBrands = useSelector(selectCategoryBrands);
  const dispatch = useDispatch();

  const language = expoLanguageDetector.detect();

  const { t } = useTranslation();

  useEffect(() => {
   //@ts-ignore
     dispatch(getCategoryBrand())

     if(language == "en") {
      addResources(en);
     }
     else {
      addResources(tr);
     }
  }, []);

  const handleMap = (item) => {
   navigation.navigate('HomeRoutes', {
      screen: 'BrandMapStackScreen',
      params: {
        address: item.address,
        brandName: item.brandName,
        latitude: item.latitude,
        longitude: item.longitude,
        phone: item.phone,
        placeName: item.placeName,
        workHours: item.workHours
      }
    });
    
 }
 

  const renderBrand = ({ item }) => (
    <TouchableOpacity onPress={() => handleMap(item)} key={item.id}>
        <Image
            source={{ uri: item.url }}
            style={styles.image}
        />
    </TouchableOpacity>
);


 return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MySearchBarButton searchBarTitle={t("category.searchbartitle")} />
        <View style={styles.brandAndCountText}>
          <Text style={styles.brandText}>{t("category.brands")}</Text>
          <Text>{categoryBrands.length} {t("category.brand")}</Text>
        </View>
        <FlatList
            style={{ marginBottom: 72 }}
            data={categoryBrands}
            renderItem={renderBrand}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
 )
}

export default CategoryBrand

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 36) / 3;

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#ffffff',
 },
 searchBar: {
    justifyContent: "center", 
    alignItems: "center", 
    marginVertical: 10
 },
 brandAndCountText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
    paddingVertical: 20
 },
 brandText: {
    fontWeight: 'bold',
    fontSize: 18,
 },
 image: {
  width: imageWidth,
  height: imageWidth,
  marginHorizontal: 6,
  marginVertical: 6,
  resizeMode: 'contain'
},
})