import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { RAWG_API_KEY } from '@env';

export default function Search() {

  const [gamename, setGamename] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchGames = async () => {
    setLoading(true);

    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${gamename}`);
      const data = await response.json();

      const searchedGames = data.results

      setRepos(searchedGames);
    } catch (error) {
      console.error("Error fetching searched games: ", error);
    } finally {
      setLoading(false);
    }
  };

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
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='search for games...'
            placeholderTextColor="#97979B"
            style={styles.input}
            value={gamename}
            onChangeText={text => setGamename(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={searchGames}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={repos || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            console.log(item);
            return (
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
                    <Text style={styles.gameDetail}>{`Developer: ${item.developers && item.developers[0]?.name ? item.developers[0]?.name : "Unknown"}`}</Text>
                  )}
                  {item.released && (
                    <Text style={styles.gameDetail}>{`Released: ${item.released ? new Date(item.released).getFullYear() : "Unknown"}`}</Text>
                  )}
                  {item.rating && (
                    <Text style={styles.gameDetail}>{`Rating: ${item.rating !== undefined ? item.rating : "N/A"}`}</Text>
                  )}
                  {item.stores && item.stores.length > 0 && (
                    <Text style={styles.gameStores}>
                      Available on: {item.stores.map(store => store?.store?.name || "Unknown").join(", ")}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => handleFavorite(item)}
                >
                  <Ionicons name="heart-outline" size={24} color="#F2F4FF" />
                </TouchableOpacity>
              </View>
            )
          }}
        />
      </View>
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
  outerContainer: {
    flex: 1,
    backgroundColor: '#453F3C',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    gap: 12,
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
    width: 350,
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
    color: '',
    textAlign: 'left',
    marginBottom: 3,
  },
  gameStores: {
    fontFamily: 'Agdasima-Regular',
    fontSize: 18,
    color: '',
    textAlign: 'left',
    marginBottom: 3,
  },
  gameInfo: {
    flex: 1,
  },
  input: {
    width: '60%',
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
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F2F4FF',
    fontSize: 20,
    fontFamily: 'Agdasima-Bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 10,
  }
});