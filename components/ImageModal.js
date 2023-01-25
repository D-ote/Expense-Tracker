import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "./Button";

const ImageModal = ({ onPress }) => {
  const pic = "../assets/img4.jpg";

  return (
    <View style={styles.modalContainer}>
      <View style={styles.imgContainer}>
        <Image source={require(pic)} style={styles.img} />
      </View>
      <View style={styles.btns}>
        <View style={styles.btn}>
          <Button
            label="Close"
            btnStyle="loginBtn"
            btnTextStyle="loginText"
            onPress={onPress}
          />
        </View>
        <View style={styles.btn}>
          <Button
            label="Save"
            btnStyle="plainBtn"
            btnTextStyle="plainBtnText"
          />
        </View>
      </View>
    </View>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: "column",
  },
  imgContainer: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderRadius: 200,
    borderColor: "#fff",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 200,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  btn: {
    width: 120,
  },
});
