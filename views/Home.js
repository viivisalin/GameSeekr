import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { useFonts } from "expo-font";

import { RAWG_API_KEY } from '@env';
import { useEffect, useState } from "react";


export default function Home() {

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  let [fontsLoaded] = useFonts({
    'Agdasima-Regular': require('../assets/fonts/Agdasima-Regular.ttf'),
    'Agdasima-Bold': require('../assets/fonts/Agdasima-Bold.ttf'),
  });

  useEffect(() => {
    const fetchHighlightGames = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}`);
        const data = await response.json();

        const highlightGames = data.results
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        setGames(highlightGames);
      } catch (error) {
        console.error("Error fetching highlight games: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightGames();
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        {loading ? (
          <ActivityIndicator size="medium" color="#7F7EFF" />
        ) : (
          <View>
            <Text style={styles.text}>Welcome to GameSeekr!</Text>
            <Text style={styles.highlightsText}>Highlighted Games</Text>
            <FlatList
              data={games}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.gameItem}>
                  {item.background_image && (
                    <Image
                      source={{ uri: item.background_image }}
                      style={styles.gameImage}
                    />
                  )}
                  <View style={styles.gameInfo}>
                    <Text style={styles.gameTitle}>{item.name}</Text>
                    {item.developers && item.developers.lenght > 0 && (
                      <Text style={styles.gameDetail}>Developer: {item.developers[0].name}</Text>
                    )}
                    {item.released && (
                      <Text style={styles.gameDetail}>Released: {new Date(item.released).getFullYear()}</Text>
                    )}
                    {item.rating && (
                      <Text style={styles.gameDetail}>Rating: {item.rating}</Text>
                    )}
                    {item.game_pk && item.game_pk.lenght > 0 ? (
                      <Text style={styles.gameDetail}>
                        Available on: {item.game_pk.map(store => store.store.name).join(", ")}</Text>
                    ) : (
                      <Text style={styles.gameDetail}>Available on: Multiple Platforms</Text>
                    )}
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#453F3C',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  text: {
    fontFamily: 'Agdasima-Bold',
    color: '#CBCBCD',
    fontSize: 46,
  },
  highlightsText: {
    fontFamily: 'Agdasima-Bold',
    color: '#CBCBCD',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  gameItem: {
    backgroundColor: '#797270',
    padding: 10,
    borderRadius: 6,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#37322F',
  },
  gameTitle: {
    fontFamily: 'Agdasima-Bold',
    color: '#F2F4FF',
    fontSize: 20,
  },
  gameImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 14,
  },
  gameDetail: {
    fontFamily: 'Agdasima-Regular',
    fontSize: 18,
    color: '',
    textAlign: 'left',
    marginBottom: 3,
  },
  gameInfo: {
    flex: 1,
  },
});