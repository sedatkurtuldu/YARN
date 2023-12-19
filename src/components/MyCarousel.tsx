import React, {useRef, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import { getYarnOffer, selectYarnOffers } from '../slices/yarnOffersSlice';

const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = () => {
  const yarnOffers = useSelector(selectYarnOffers);

  const dispatch = useDispatch();
  const carouselRef = useRef(null);

  useEffect(() => {
    //@ts-ignore
    dispatch(getYarnOffer())
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.url}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={yarnOffers}
        renderItem={renderItem}
        hasParallaxImages={true}
        firstItem={2}
        autoplay={true} 
        autoplayInterval={4000}
        loop={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    marginVertical: 50
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 160,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
