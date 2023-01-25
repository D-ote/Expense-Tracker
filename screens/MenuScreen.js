import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Divider, List } from "react-native-paper";
import Constants from "expo-constants";
import ProfileList from "../components/ProfileList";
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const MenuScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });
  const auth = getAuth();
  const user = auth.currentUser;

  const pic = "../assets/img4.jpg";
  const [list] = useState([
    {
      id: 1,
      icon: "user-check",
      name: "Profile details",
      function: () => navigation.navigate("profile")
    },
    { id: 2, icon: "bell", name: "Notiications" },
    { id: 3, icon: "settings", name: "Settings" },
    { id: 4, icon: "headphones", name: "Support" },
    {
      id: 5,
      icon: "log-out",
      name: "Log out",
      function: () => handleSignOut(),
    },
  ]);

  const handleSignOut = () => {
    signOut(auth);
  };

  const getUserName = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (user.uid === doc.data().id) {
        setUserDetails({
          ...userDetails,
          name: doc.data().name,
          email: doc.data().email,
        });
      }
    });
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.menuInfo}>
        <View style={styles.imgContainer}>
          <Image source={require(pic)} style={styles.img} />
        </View>
        <View>
          <Text style={styles.text1}>{userDetails.name}</Text>
          <Text style={styles.text2}>{userDetails.email}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.menuBody}>
          {list.map((item) => (
            <View key={item.id}>
              <ProfileList
                icon={item.icon}
                name={item.name}
                onPress={item.function}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c53f36",
  },
  menuInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
    marginBottom: 100,
    marginTop: 30,
    top: Constants.statusBarHeight,
  },
  imgContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    width: 100,
    height: 100,
    padding: 2,
    marginRight: 20,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
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
});
