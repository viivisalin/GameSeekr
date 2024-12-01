import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import supabase from './supabase';

export default function Profile({ navigation, route }) {

  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const user = supabase.auth.getUser();
      if (user) {
        setEmail(user.email);
      } else {
        setEmail('Not logged in');
      }
    };

    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      if (route.params?.onLogout) {
        route.params.onLogout();
      }
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>PROFILE</Text>

      <Text style={styles.loggedInAsText}>
        {email ? 'Logged in as: ${email' : 'Loading...'}
      </Text>

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
  loggedInAsText: {
    fontFamily: 'Agdasima-Bold',
    color: '#CBCBCD',
    fontSize: 20,
    marginVertical: 20,
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