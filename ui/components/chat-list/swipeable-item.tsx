import { Image } from 'expo-image';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log('showRightProgress:', prog.value);
    console.log('appliedTranslation:', drag.value);

    return {
      transform: [{ translateX: drag.value + 50 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Text style={styles.rightAction}>Text</Text>
    </Reanimated.View>
  );
}

export default function SwipeableItem() {
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        containerStyle={styles.swipeable}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}>
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://picsum.photos/200' }}
              style={styles.image}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text>Bard</Text>
            <Text>Hello fellas</Text>
          </View>
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rightAction: { width: 50, height: 50, backgroundColor: 'purple' },
  separator: {
    width: '100%',
    borderTopWidth: 1,
  },
  swipeable: {
    height: 50,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
    borderTopLeftRadius: 6.5,
    borderTopRightRadius: 6.5,
    borderBottomLeftRadius: 19.5,
    borderBottomRightRadius: 19.5,
  },
  imageContainer: {
    width: 50, height: 50,
    borderWidth: 1.5,
    borderColor: '#38AF7C',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 21,
    borderBottomRightRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  infoContainer: {
    // flex: 1,
    padding: 8,
    backgroundColor: '#F0F0F0',
    width: '60%'
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    minWidth: '100%'
  },
});