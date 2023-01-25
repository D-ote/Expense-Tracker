import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ImageViewer = ({ placeholderImage, selectedImage, style }) => {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImage;

  return <Image source={imageSource} style={styles.img} />;
};

export default ImageViewer;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 80,
  },
});
