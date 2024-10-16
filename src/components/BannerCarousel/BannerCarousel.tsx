import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window'); // Get device screen width

export const BannerCarousel: React.FC<{ bannerAds: any }> = ({ bannerAds }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide effect
  useEffect(() => {
    startAutoSlide(); // Start auto-slide when the component mounts

    return () => {
      stopAutoSlide(); // Stop auto-slide when component unmounts
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % bannerAds.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 3000); // Auto-slide every 3 seconds
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval
    }
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / width);
    setActiveIndex(currentIndex);
  };

  const renderItem = ({ item }: { item: { image: string } }) => (
    <View style={styles.bannerContainer}>
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
    </View>
  );

  const handleTouchStart = () => {
    stopAutoSlide(); // Stop auto-slide when the user starts touching
  };

  const handleTouchEnd = () => {
    startAutoSlide(); // Resume auto-slide when the user stops interacting
  };

  return (
    <View style={styles.addsContainer}>
      <FlatList
        ref={flatListRef}
        data={bannerAds}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={handleScroll} // Update active index after scroll
        decelerationRate="fast"
        snapToAlignment="center"
        snapToInterval={width} // Snap to each banner fully
        onTouchStart={handleTouchStart} // Stop auto-slide when touched
        onTouchEnd={handleTouchEnd} // Resume auto-slide when touch ends
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {bannerAds.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              flatListRef.current?.scrollToIndex({ index, animated: true })
            }
          >
            <View
              style={[styles.dot, { opacity: index === activeIndex ? 1 : 0.3 }]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 32,
  },
  bannerContainer: {
    width: width, // Ensure each banner takes the full width
    height: 150, // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // Rounded corners for the entire banner container
    overflow: 'hidden', // Ensure the image respects the borderRadius
  },
  bannerImage: {
    width: '98%',
    height: '100%',
    resizeMode: 'stretch', // Ensure the image fits within the container without being cropped
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
});
