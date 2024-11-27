import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import Ionicons from '@expo/vector-icons/Ionicons';

import { RAWG_API_KEY } from '@env';
import { useEffect, useState } from "react";


export default function Home() {

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

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

  const handleFavorite = (game) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(game.id)) {
        return prevFavorites.filter((id) => id !== game.id);
      } else {
        return [...prevFavorites, game.id];
      }
    });
  };

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
                    {item.developers && item.developers.length > 0 && (
                      <Text style={styles.gameDetail}>Developer: {item.developers[0].name}</Text>
                    )}
                    {item.released && (
                      <Text style={styles.gameDetail}>Released: {new Date(item.released).getFullYear()}</Text>
                    )}
                    {item.rating && (
                      <Text style={styles.gameDetail}>Rating: {item.rating}</Text>
                    )}
                    {item.stores && (
                      <Text style={styles.gameStores}>
                        Available on: {item.stores.map(store => store.store.name).join(", ")}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => handleFavorite(item)}
                  >
                    <Ionicons name="heart-outline" size={24} color="#F2F4FF" />
                  </TouchableOpacity>
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
    position: 'relative',
  },
  gameTitle: {
    fontFamily: 'Agdasima-Bold',
    color: '#F2F4FF',
    fontSize: 20,
  },
  gameImage: {
    width: 80,
    height: 100,
    borderRadius: 6,
    marginRight: 14,
  },
  gameDetail: {
    fontFamily: 'Agdasima-Regular',
    fontSize: 16,
    color: '#37322F',
    textAlign: 'left',
    marginBottom: 3,
  },
  gameStores: {
    fontFamily: 'Agdasima-Regular',
    fontSize: 18,
    color: '#37322F',
    textAlign: 'left',
    marginBottom: 3,
  },
  gameInfo: {
    flex: 1,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 10,
  }
});