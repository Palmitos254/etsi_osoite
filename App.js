import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

export default function App() {

  const [keyword, setKeyword] = useState("");

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121
  });

  const fetchOsoite = () => {
    fetch("http://www.mapquestapi.com/geocoding/v1/address?key=I3Q8rIkGoFKXau6K3BTSqq9ShaTN9lZ0&location=" + keyword)
    .then(response => response.json())
    .then(data => setRegion({
      latitude: data.results[0].locations[0].latLng.lat,
      longitude: data.results[0].locations[0].latLng.lng,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0121
    }))
    .catch(err => Alert.alert("Error", err))
  }

  return (
    <View style={styles.container}>
        <MapView
          style={{flex: 5}}
          region={region} >
          <Marker
            coordinate={{latitude: region.latitude, longitude: region.longitude}} />
        </MapView>
        <TextInput
          style={{flex: 1 ,fontSize: 18, width: 200}}
          placeholder='Keyword'
          onChangeText={text => setKeyword(text)}
        />
        <Button title='SHOW' onPress={fetchOsoite} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
