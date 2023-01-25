import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateCurrentUser,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const auth = getAuth();

const RegisterScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const SignUp = async () => {
    if ((value.name === "", value.email === "" || value.password === "")) {
      setValue({
        ...value,
        error: "email and password are mandatory",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          const payload = {
            name: value.name,
            email: value.email,
            id: user.uid,
            dob: "",
            currency: "",
            profilePic: "",
          };

          // Add a new document with a generated id
          const newUserRef = doc(collection(db, "users"));

          // later...
          await setDoc(newUserRef, payload);
        })
        .catch((error) => {
          console.log(error)
        });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email address is already in use!");
        navigation.navigate("Login");
      }

      if (error.code === "auth/invalid-email") {
        alert("This email address is invalid!");
      }
      setValue({
        ...value,
        error: error.message,
      });
      setTimeout(() => {
        setValue({
          ...value,
          error: "",
        });
      }, 3000);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="name"
          onChangeText={(text) => setValue({ ...value, name: text })}
          value={value.name}
          style={styles.input}
        />
        <TextInput
          placeholder="email"
          keyboardType="email-address"
          onChangeText={(text) => setValue({ ...value, email: text })}
          value={value.email}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          onChangeText={(text) => setValue({ ...value, password: text })}
          value={value.password}
          style={styles.input}
          secureTextEntry
        />
      </View>
      {value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}
      <View style={styles.btnContainer}>
        <Button
          label="Sign Up"
          btnStyle="loginBtn"
          btnTextStyle="loginText"
          onPress={SignUp}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "rgba(229, 210, 196, 0.8)",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  btnContainer: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});
