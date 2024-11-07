import React from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  const handleLogin = () => {
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <TextInput placeholder="Username" placeholderTextColor="#97979B" style={styles.input} />
      <TextInput placeholder="Password" placeholderTextColor="#97979B" secureTextEntry={true} style={styles.input} />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
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
    padding: 16,
  },
  text: {
    fontFamily: 'Agdasima-Bold',
    color: '#CBCBCD',
    fontSize: 46,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#F2F4FF',
    marginBottom: 12,
    marginTop: 12,
    color: '#F2F4FF',
    fontFamily: 'Agdasima-Regular',
    fontSize: 20,
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
