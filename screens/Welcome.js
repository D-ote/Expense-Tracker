import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Button from "../components/Button";

const Welcome = ({ navigation }) => {
  const img = "../assets/tracker.png";
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require(img)} style={styles.img} />
      </View>
      <View style={styles.btnContainer}>
        <Button
          label="Sign In"
          btnStyle="plainBtn"
          btnTextStyle="loginText"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          label="Sign Up"
          btnStyle="loginBtn"
          btnTextStyle="loginText"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0a074",
  },
  imgContainer: {
    width: 200,
    height: 200,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  btnContainer: {
    width: "100%",
    marginTop: 20,
  },
});
