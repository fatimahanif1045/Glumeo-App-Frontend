import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

// Simulated data for search results
const sampleData = [
  { id: '1', title: 'The beauty of nature', description: 'A deep dive into the beauty of nature', tags: ['nature', 'beauty'] },
  { id: '2', title: 'Tech trends 2025', description: 'Exploring the technology trends for the coming years', tags: ['tech', '2025', 'trends'] },
  { id: '3', title: 'Yoga for beginners', description: 'A guide to starting yoga for new practitioners', tags: ['yoga', 'beginners'] },
  // Add more sample data...
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noResults, setNoResults] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  const debouncedSearch = useDebounce(searchQuery, 500); // Implementing debouncing

  const handleButtonPress = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchVideo(); // Replace with your URL
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setData(response);
    } catch (err) {
      // Log error and display it to the user
      console.error('Error fetching data:', err);
      setError(err.message);
      Alert.alert('Error', `There was an issue fetching the data: ${err.message}`);
    } finally {
      setLoading(false); // Always set loading to false after fetching
    }
  };

  useEffect(() => {
    if (debouncedSearch.length >= 3) {
      fetchSearchResults(debouncedSearch, page);
    }
  }, [debouncedSearch, page]);

  const fetchSearchResults = (query, pageNum) => {
    setLoading(true);
    setNoResults(false);

    // Simulate API call and filter data
    const filtered = sampleData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );

    if (filtered.length === 0) {
      setNoResults(true);
    } else {
      setFilteredData(filtered.slice(0, pageNum * 5)); // Pagination logic (5 items per page)
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Load more results when user scrolls
  };
  const handleSearchInput = (text) => {
    setSearchQuery(text);
    setNoResults(false); // Reset no results message when the user types
  };

  return (
    <LinearGradient colors={['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb']} style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by title, description, or tags"
          value={searchQuery}
          onChangeText={handleSearchInput}
          placeholderTextColor="black"
        />
        <Feather name="search" size={20} color="tomato" style={styles.searchIcon} />
      </View>

      {loading ? (
        <ActivityIndicator size="100" color="pink" />
      ) : (
        <>
          {noResults ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results found</Text>
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.modifySearch}>Try modifying your search</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.resultItem}>
                  <Text style={styles.resultTitle}>{item.title}</Text>
                  <Text style={styles.resultDescription}>{item.description}</Text>
                  <Text style={styles.resultTags}>{item.tags.join(', ')}</Text>
                </View>
              )}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
            />
          )}
        </>
      )}
    </LinearGradient>
  );
};

  // Custom hook for debouncing
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    padding: 5,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: 'gray',
  },
  modifySearch: {
    fontSize: 16,
    color: '#ff5a5f',
    marginTop: 10,
  },
  resultItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  resultTags: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
  },
});
export default SearchScreen;
