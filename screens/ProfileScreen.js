import { Image, Modal, Pressable, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import ProfileDetails from "../components/ProfileDetails";
import { useState } from "react";
import BackArrow from "../components/BackArrow";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";
import ImageModal from "../components/ImageModal";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "../components/ImageViewer";

const ProfileScreen = ({ navigation }) => {
  const [imageModal, setImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const pic = "../assets/img4.jpg";
  const [list] = useState([
    { id: 1, icon: "user", name: "Name" },
    { id: 2, icon: "mail", name: "Email" },
    { id: 3, icon: "phone", name: "Phone Number" },
    { id: 4, icon: "eye-off", name: "Password" },
    { id: 5, icon: "dollar-sign", name: "Currency" },
  ]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      <BackArrow />
      <View style={styles.menuInfo}>
        <View style={styles.imgContainer}>
          <ImageViewer
            placeholderImage={pic}
            selectedImage={selectedImage}
            style={styles.img}
          />
        </View>
        <Pressable onPress={() => pickImage()} style={styles.cameraIcon}>
          <Feather name="camera" size={24} color="#fff" />
        </Pressable>
      </View>
      <View style={styles.menuBody}>
        <View>
          {list.map((item) => (
            <View key={item.id}>
              <ProfileDetails
                icon={item.icon}
                name={item.name}
                onPress={item.function}
              />
            </View>
          ))}
        </View>
        <View style={styles.btnContainer}>
          <Button
            label="Edit Profile"
            btnStyle="loginBtn"
            btnTextStyle="loginText"
            onPress={() => navigation.navigate("editProfile")}
          />
        </View>
      </View>
      <Modal visible={imageModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <ImageModal onPress={() => setImageModal(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c53f36",
  },
  menuInfo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    marginTop: 60,
    top: Constants.statusBarHeight,
  },
  imgContainer: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 80,
    width: 150,
    height: 150,
    padding: 2,
    marginRight: 20,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 80,
  },
  text1: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fff",
  },
  text2: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "100",
  },
  menuBody: {
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: "1000%",
  },
  list: {
    color: "#fff",
  },
  btnContainer: {
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "15%",
  },
  cameraIcon: {
    position: "absolute",
    top: 12,
    right: 143,
    backgroundColor: "#c53f36",
    borderRadius: 60,
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    paddingTop: "50%",
    alignItems: "center",
    backgroundColor: "rgba(229, 210, 196, 0.6)",
  },
});
