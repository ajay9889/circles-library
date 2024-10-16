// import React, { useState, useRef, useEffect } from 'react';
// import { View, FlatList, Text, Dimensions, StyleSheet, Image } from 'react-native';
// import { cssTheme } from '../../market-configs/theme';

// const { width } = Dimensions.get('window'); // Get the device width

// const PlanCardCarousel = ({ data }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const flatListRef = useRef(null); // Reference to FlatList for scrolling
//     const ITEM_WIDTH = width * 0.8;
//     const PADDING = width * 0.1;
//     const autoSlideInterval = 3000; // 3 seconds interval for auto-slide

//     // Auto-scroll logic
//     useEffect(() => {
//         const autoSlide = setInterval(() => {
//             let nextIndex = currentIndex + 1;
//             if (nextIndex >= data.length) {
//                 nextIndex = 0; // Loop back to the start
//             }
//             flatListRef.current.scrollToIndex({ index: nextIndex });
//             setCurrentIndex(nextIndex);
//         }, autoSlideInterval);

//         return () => clearInterval(autoSlide); // Clear interval when component unmounts
//     }, [currentIndex]);

//     const handleScroll = (event) => {
//         const slideIndex = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
//         setCurrentIndex(slideIndex);
//     };

//     const renderItem = ({ item }) => (
//         <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
//             {/* <Text style={styles.itemText}>{item.title}</Text> */}
//             <Image
//                 // source={{ uri: item.image }}
//                 source={item.image}
//                 style={styles.image}
//                 resizeMode="contain"
//             />
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={data}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 pagingEnabled
//                 snapToInterval={ITEM_WIDTH} // Snap to each item width
//                 decelerationRate="fast"
//                 contentContainerStyle={{ paddingHorizontal: PADDING }} // Adds padding to peek effect
//                 onScroll={handleScroll}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id}
//                 ref={flatListRef}
//             />

//             {/* Optional pagination */}
//             <View style={styles.pagination}>
//                 {data.map((_, i) => (
//                     <View
//                         key={i}
//                         style={[
//                             styles.dot,
//                             currentIndex === i ? styles.activeDot : styles.inactiveDot,
//                         ]}
//                     />
//                 ))}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     itemContainer: {
//         marginHorizontal: 10, // Adjust for spacing between items
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//     },
//     itemText: {
//         fontSize: 24,
//         color: '#333',
//     },
//     pagination: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         paddingVertical: 10,
//     },
//     dot: {
//         height: 10,
//         width: 10,
//         borderRadius: 5,
//         marginHorizontal: 5,
//     },
//     activeDot: {
//         backgroundColor: cssTheme.colors.primary[900],
//     },
//     inactiveDot: {
//         backgroundColor: cssTheme.colors.gray[500],
//     },
//     image: {
//         width: '100%',
//         height: undefined, // Required for maintaining aspect ratio
//         aspectRatio: 4 / 2, // Assuming square images; adjust as needed
//     },
// });

// export default PlanCardCarousel;

import { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getProductImage } from '../../planSelection/planSelectionHelper';

const { width } = Dimensions.get('window'); // Get the device width

const PlanCardCarousel = ({ data, onPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null); // Reference to FlatList for scrolling
  const ITEM_WIDTH = width * 0.8; // Each item is 80% of the screen width
  const SPACING = width * 0.05; // 5% spacing on each side
  const autoSlideInterval = 3000; // Auto-slide every 3 seconds

  // Auto-scroll logic
  useEffect(() => {
    const autoSlide = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= data.length) {
        nextIndex = 0; // Loop back to the first item
      }
      flatListRef.current.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    }, autoSlideInterval);

    return () => clearInterval(autoSlide); // Clean up the interval when the component unmounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleScroll = (event) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / ITEM_WIDTH
    );
    setCurrentIndex(slideIndex);
  };

  const renderItem = ({ item }) => {
    const image = getProductImage(item);
    return (
      <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
        {/* <Text style={styles.itemText}>{item.title}</Text> */}
        {image !== '' ? (
          <TouchableOpacity onPress={() => onPress(item)}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onPress(item)}>
            <Image
              source={require('../../assets/images/planImage.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const theme = useSelector((state: any) => state.theme.cssTheme);
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.backgroundView} />
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false} // We handle pagination manually
        snapToAlignment="start" // Aligns to the start of each item
        snapToInterval={ITEM_WIDTH + SPACING * 2} // Snap to each item with spacing
        decelerationRate="fast"
        onScroll={handleScroll}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ref={flatListRef}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              currentIndex === i ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

function getStyles(cssTheme: any) {
  return StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 32,
  },
  backgroundView: {
    position: 'absolute',
    top: 0,
    height: '50%', // Overlay the top half
    width: '100%',
    backgroundColor:  cssTheme.colors.primary[900],
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  itemContainer: {
    marginHorizontal: 5, // Space between each item
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  itemText: {
    fontSize: 24,
    color: '#333',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: cssTheme.colors.primary[900],
  },
  inactiveDot: {
    backgroundColor:  cssTheme.colors.gray[500],
  },
  image: {
    width: '100%',
    height: undefined, // Required for maintaining aspect ratio
    aspectRatio: 5 / 2, // Assuming square images; adjust as needed
    resizeMode: 'stretch',
  },
});
}

export default PlanCardCarousel;
