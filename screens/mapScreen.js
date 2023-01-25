import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Dimensions, Text, TextInput, View } from "react-native";
import { GOOGLE_API_KEY } from "../environment";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Button from "../components/Button";

const MapScreen = () => {
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
            onPress={(data, details) => {
              console.log(data, details);
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

export default MapScreen;

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
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});

// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_API_KEY } from "./environment";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import * as Location from "expo-location";

// const { width, height } = Dimensions.get("window");

// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.02;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// export default function MapScreen() {
//   const [initialPosition, setInitialPosition] = useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });
//   const [errorMsg, setErrorMsg] = useState(null);

//   const userLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status != "granted") {
//       setErrorMsg("Permission to access location was denied");
//       return
//     }
//     let location = await Location.getCurrentPositionAsync({
//       enableHighAccuracy: true,
//     });

//     setInitialPosition({
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });
//     console.log(location.coords.latitude, location.coords.longitude);
//   };

//   useEffect(() => {
//     userLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//         <Text>Clear throat</Text>
//       <MapView
//         style={styles.map}
//         provider={PROVIDER_GOOGLE}
//         initialRegion={initialPosition}
//       >
//         <Marker coordinate={initialPosition} title="Marker" />
//       </MapView>
//       <Button title="Get Location" onPress={() => userLocation} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
//   searchContainer: {
//     position: "absolute",
//     width: "90%",
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.5,
//     shadowRadius: 4,
//     elevation: 4,
//     padding: 8,
//     borderRadius: 8,
//     top: Constants.statusBarHeight,
//   },
//   input: {
//     borderColor: "#888",
//     borderWidth: 1,
//   },
// });
