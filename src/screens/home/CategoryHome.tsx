import { FlatList, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, selectCategories } from '../../slices/categoryHomeSlice';
import expoLanguageDetector from '../../../plugins/expoLanguageDetector';
const CategoryHome = () => {

    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    const language = expoLanguageDetector.detect();

    useEffect(() => {
        //@ts-ignore
       dispatch(getCategory())
    }, []);

    const renderCategory = ({ item }) => (
        <TouchableOpacity key={item.id}>
            <Image
                source={{ uri: item.url }}
                style={styles.image}
            />
            <Text style={styles.categoryText}>{language == "en" ? item.nameEN : item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            style={styles.container}
            //@ts-ignore
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default CategoryHome

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 24) / 2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    image: {
        width: imageWidth,
        height: imageWidth,
        marginHorizontal: 6,
        marginVertical: -15,
        resizeMode: 'contain',
    },
    categoryText: {
        position: "absolute",
        top: '50%',
        left: "12%",
        fontWeight: "bold",
        fontSize: 13,
        width: imageWidth * 0.8,
        flexWrap: 'wrap',
        textAlign: 'center'
    }
})
