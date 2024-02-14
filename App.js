import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
  
  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRepositories(responseJson.meals))
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
    console.log(repositories)
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{flex: 1}}>
        <TextInput 
          style={{fontSize: 18, width: 200}} 
          placeholder='Type keyword' 
          value={keyword}
          onChangeText={text => setKeyword(text)} 
        />
        <Button title="Find" onPress={getRepositories} />
      </View>
      <View style={{flex: 6}}>
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({item}) => 
            <View style={{margin: 5}}>
              <Text style={{fontSize: 16 }}>{item.strMeal}</Text>
              <Image source={{ uri: item.strMealThumb }} style={{ width: 100, height: 100 }} />
            </View>}
          data={repositories} 
          ItemSeparatorComponent={listSeparator} /> 
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  marginTop: 20,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
});