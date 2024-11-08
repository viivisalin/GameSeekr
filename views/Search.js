import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { RAWG_API_KEY } from '@env';

export default function Search() {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Search for Games Here!</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#453F3C',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontFamily: 'Agdasima-Bold',
      color: '#CBCBCD',
      fontSize: 46,
    }
  });