import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import Constants from "expo-constants";
import Transaction from "../components/Transaction";
import { collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import TransactionDetails from "../components/TransactionDetails";
import { getAuth } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const auth = getAuth();

const HomeScreen = ({ navigation }) => {
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [transactionModal, setTransactionModal] = useState(false);
  const [topUpModal, setTopUpModal] = useState(false);
  const [walletTopUp, setWalletTopUp] = useState("");
  const [walletAmount, setWalletAmount] = useState("");

  const pic = "../assets/stacks.png";

  const getExpenseData = async () => {
    const newData = [];
    const querySnapshot = await getDocs(collection(db, "expenseData"));
    querySnapshot.forEach((doc) => {
      newData.push(doc.data());
    });
    setTransactionDetails(newData);
  };

  useEffect(() => {
    getExpenseData();
  }, []);

  const formatter = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  const handleTopUp = useCallback(async () => {
    const user = auth.currentUser;
    const payload = {
      wallet: walletTopUp,
      id: user.uid,
    };

    const walletAmount = doc(collection(db, "walletBalance"));

    await setDoc(walletAmount, payload);
    setWalletTopUp("");
    setTopUpModal(false);
  }, [walletTopUp]);

  const getWalletBalance = async () => {
    const querySnapshot = await getDocs(collection(db, "walletBalance"));
    querySnapshot.forEach((doc) => {
      setWalletAmount(doc.data());
    })
  };
  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => pressed && styles.pressedItem}
      onPress={() => setTransactionModal(true)}
    >
      <Transaction
        icon={item.category.icon}
        name={item.category.label}
        amount={item.amount}
        date={item.date}
      />
    </Pressable>
  );

  // console.log(transactionDetails[0].date.toDate(), 'kkk')

  // const date = Timestamp.toDate(transactionDetails[0].date);
  // console.log(date)

  useEffect(() => {
    getWalletBalance();
  }, [handleTopUp]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.wallet}>
          <Text style={styles.headerText}>
            {walletAmount ? formatter.format(walletAmount.wallet) : 0.0}
          </Text>
          <Text style={{ color: "#fff", marginTop: 5, fontWeight: "200" }}>
            Wallet Balance
          </Text>
        </View>
        <View style={styles.expenseIcon}>
          <Pressable onPress={() => setTopUpModal(true)}>
            <View style={styles.addIcon}>
              <Feather name="plus" size={24} color="#c53f36" />
            </View>
            <Text style={{ color: "#fff", marginTop: 10 }}>Top Up</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Add")}>
            <View style={styles.addIcon}>
              <Feather name="minus" size={24} color="#c53f36" />
            </View>
            <Text style={{ color: "#fff", marginTop: 10 }}>Expens</Text>
          </Pressable>
        </View>
        <View style={styles.homeBody}>
          <View style={styles.header}>
            <Text style={styles.bold}>Transactions</Text>
          </View>
          <FlatList
            data={transactionDetails}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
        <ScrollView>
          <Modal visible={topUpModal} transparent={true} animationType="slide">
            <View style={styles.walletModal}>
              <Pressable
                onPress={() => setTopUpModal(false)}
                style={styles.closeIcon}
              >
                <MaterialIcons name="close" color="#000" size={22} />
              </Pressable>
              <View style={styles.walletContainer}>
                <View style={styles.walletPng}>
                  <Image source={require(pic)} style={styles.img} />
                </View>
                <Text style={styles.walletText}>Wallet Balance</Text>
                <View style={styles.textInput}>
                  <TextInput
                    autoFocus
                    keyboardType="numeric"
                    placeholder="Enter top up"
                    value={walletTopUp}
                    onChangeText={(text) => setWalletTopUp(text)}
                  />
                </View>
              </View>
              <View style={{ marginTop: "auto" }}>
                <Button
                  label="Top Up"
                  btnStyle="loginBtn"
                  btnTextStyle="loginText"
                  onPress={() => handleTopUp()}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
        <Modal visible={transactionModal} animationType="slide">
          <View style={styles.transactionModal}>
            <Pressable
              onPress={() => setTransactionModal(false)}
              style={styles.closeIcon}
            >
              <MaterialIcons name="close" color="#000" size={22} />
            </Pressable>
            <View>
              <TransactionDetails
                icon="restaurant"
                name="Fine dinning"
                amount="1200"
                date="12/01/2023"
              />
            </View>
            <View style={{ marginTop: "auto" }}>
              <Button
                label="Close"
                btnStyle="loginBtn"
                btnTextStyle="loginText"
                onPress={() => setTransactionModal(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c53f36",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
  modalBtn: {
    backgroundColor: "rgba(229, 210, 196, 0.8)",
    height: "15%",
    width: "100%",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    padding: 20,
  },
  closeIcon: {
    marginLeft: "auto",
    borderWidth: 2,
    borderRadius: 20,
    padding: 2,
    borderColor: "#000",
    marginBottom: 10,
  },
  header: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "600",
    fontSize: 20,
  },
  light: {
    color: "rgba(229, 210, 196, 1)",
    fontSize: 18,
    fontWeight: "600",
  },
  wallet: {
    justifyContent: "center",
    alignItems: "center",
    top: Constants.statusBarHeight,
    height: 200,
  },
  headerText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  expenseIcon: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    borderWidth: 1,
    borderTopColor: "rgba(229, 210, 196, 0.2)",
    borderBottomColor: "rgba(229, 210, 196, 0.2)",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    paddingVertical: 10,
  },
  addIcon: {
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 10,
  },
  homeBody: {
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: "1000%",
    padding: 20,
    marginTop: 30,
  },
  pressedItem: {
    opacity: 0.5,
    color: "#fefcf3",
  },
  transactionModal: {
    backgroundColor: "rgba(229, 210, 196, 0.8)",
    height: "80%",
    width: "100%",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    padding: 20,
  },
  walletModal: {
    backgroundColor: "#fff",
    height: "65%",
    width: "100%",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    padding: 20,
  },
  walletContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  walletPng: {
    width: 100,
    height: 100,
    marginTop: 40,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  walletText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 40,
  },
  textInput: {
    width: "80%",
    borderWidth: 1,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    borderColor: "rgba(229, 210, 196, 1)",
  },
});
