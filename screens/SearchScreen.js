import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { searchVideo } from '../services/video';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState('date');
  const [totalPages, setTotalPages] = useState(1);

  const fetchResults = async (searchTerm = searchQuery, newPage = page) => {
    if (searchTerm.trim().length === 0) {
      Alert.alert('Error', 'Please enter a search query.');
      return;
    }

    setLoading(true);
    try {
      const response = await searchVideo(searchTerm, newPage, limit, sortBy);
      setResults(response.data.videos || []);
      setTotalPages(response.data.pagination.totalPages || 1);
    } catch (error) {
      console.error('Fetch Error:', error);
      Alert.alert("No video found matching the search");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1); // Reset to first page on new search
    fetchResults(searchQuery, 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      fetchResults(searchQuery, newPage);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchResults(searchQuery, newPage);
    }
  };

  return (
    <LinearGradient colors={['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb']} style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by title, description, or tags"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="black"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Feather name="search" size={20} color="tomato" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => setSortBy('date')}>
          <Text style={styles.optionText}>Sort: Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => setLimit(3)}>
          <Text style={styles.optionText}>Limit: 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => setLimit(5)}>
          <Text style={styles.optionText}>Limit: 5</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="pink" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultTitle}>{item.title}</Text>
              <Text style={styles.resultDescription}>{item.description}</Text>
              <Text style={styles.resultTags}>{item.tag.join(', ')}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.pageButton}
          disabled={page === 1}
          onPress={handlePreviousPage}>
          <Text style={styles.optionText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>{page} / {totalPages}</Text>
        <TouchableOpacity
          style={styles.pageButton}
          disabled={page === totalPages}
          onPress={handleNextPage}>
          <Text style={styles.optionText}>Next</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

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
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  searchIcon: {
    padding: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#ff5a5f',
    padding: 10,
    borderRadius: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 14,
  },
  resultItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  resultTags: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pageButton: {
    backgroundColor: '#ff5a5f',
    padding: 10,
    borderRadius: 10,
  },
  pageNumber: {
    fontSize: 16,
    color: 'black',
  },
});

export default SearchScreen;
