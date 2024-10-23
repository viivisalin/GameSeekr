import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";


export default function Home() {

    let [fontsLoaded] = useFonts({
        'Agdasima-Regular': require('../assets/fonts/Agdasima-Regular.ttf'),
        'Agdasima-Bold': require('../assets/fonts/Agdasima-Bold.ttf'),
      });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to GameSeekr!</Text>
            <StatusBar style="auto" />
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