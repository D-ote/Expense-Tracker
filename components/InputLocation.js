import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Dimensions, Text, TextInput, View } from "react-native";
import { GOOGLE_API_KEY } from "../environment";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Button from "./Button";

const InputLocation = () => {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    latitudeDelta: "",
    longitudeDelta: "",
  });

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permission");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      let address = await Location.reverseGeocodeAsync(currentLocation.coords);
      console.log(
        address.map((item) => item.name),
        "address"
      );
    };
    getPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={location}>
        <Marker coordinate={location} title="Marker" />
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            placeholder="Search"
            minLength={5}
            autoFocus={false}
            returnKeyType={'search'}
            keyboardAppearance={'light'}
            listViewDisplayed='auto'
            fetchDetails={true}
            renderDescription={row => row.description}
            enablePoweredByContainer={false}
            // debounce={200}
            onPress={(data, details = null) => {
              console.log( details)
            }}
            query={{ key: GOOGLE_API_KEY, language: "en" }}
          />
          <View style={{ width: "20%", marginLeft: "auto" }}>
            <Button
              label="Search"
              btnStyle="searchBtn"
              btnTextStyle="searchBtnText"
            />
          </View>
        </View>
      </MapView>
    </View>
  );
};

export default InputLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 100,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});
