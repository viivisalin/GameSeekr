import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import supabase from './supabase';

export default function Profile({ navigation, route }) {

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      route.params.onLogout();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>PROFILE</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  },
  button: {
    backgroundColor: '#7F7EFF',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F2F4FF',
    fontSize: 28,
    fontFamily: 'Agdasima-Bold',
  },
});