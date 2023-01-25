import {
  Easing,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Constants from "expo-constants";
import CalendarPicker from "react-native-calendar-picker";
import { useState } from "react";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import Category from "../components/Category";
import * as Location from "expo-location";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { Notifier, NotifierComponents } from "react-native-notifier";
import InputLocation from "../components/InputLocation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const auth = getAuth();

const AddExpenseScreen = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [amount, setAmount] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isCatModalVisible, setIsCatModalVisible] = useState(false);
  const [category, setCategory] = useState({});
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState({
    selectCategory: false,
    location: false,
    note: false,
  });
  const [noteModal, setNoteModal] = useState(false);
  const [addNote, setAddNote] = useState("");
  const [savingEntry, setSavingEntry] = useState(false);
  const [mapModal, setMapModal] = useState(false);

  const startDate = selectedDate ? selectedDate.toString() : "_/_/_";

  const [emoji] = useState([
    { img: "luggage", text: "Luggage" },
    { img: "local-grocery-store", text: "Groceries" },
    { img: "lunch-dining", text: "Food" },
    { img: "phone-iphone", text: "Phone" },
    { img: "flight-takeoff", text: "Travel" },
    { img: "sports-esports", text: "Games" },
    { img: "pets", text: "Pets" },
    { img: "home", text: "Rent" },
    { img: "card-giftcard", text: "Gifts" },
    { img: "checkroom", text: "Clothes" },
  ]);

  const handleExpenseAmount = (amount) => {
    setAmount(amount);
  };

  const handleChangeDate = (date) => {
    setSelectedDate(date);
    setIsVisible(false);
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Please grant location permission");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    let addresss = await Location.reverseGeocodeAsync(currentLocation.coords);

    if (addresss !== null || (addresss !== undefined && addresss.length > 0)) {
      const formattedAddress = addresss[0].name + ", " + addresss[0].postalCode;
      setAddress(formattedAddress);
      setCheck({ ...check, location: true });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleSetCategory = (item) => {
    setCategory({ icon: item.img, label: item.text });
    setCheck({ ...check, expenseCategory: true });
    setIsCatModalVisible(false);
  };

  const handleAddEntry = async () => {
    setSavingEntry(true);
    try {
      const user = auth.currentUser;
      const date = Timestamp.fromDate(new Date(selectedDate));
      const newAmount = parseFloat(amount);

      const payload = {
        amount: newAmount,
        date,
        category,
        location: address,
        userId: user.uid,
      };

      const entryRef = doc(collection(db, "expenseData"));

      await setDoc(entryRef, payload);
      setSavingEntry(false);

      Notifier.showNotification({
        title: "Success",
        description: "Expense added",
        duration: 3000,
        showAnimationDuration: 3000,
        showEasing: Easing.bounce,
        hideOnPress: true,
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: "success",
        },
      });
    } catch (error) {
      console.log(error);
      setSavingEntry(false);
    }
  };

  const handleAddNote = () => {
    setNoteModal(false);
    setCheck({ ...check, note: true });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.expenseTitle}>Add Expense</Text>
        <View style={styles.textContainer}>
          <Text style={styles.symbol}>£</Text>
          <TextInput
            autoFocus
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={handleExpenseAmount}
          />
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.dateSpace}>
            <Button
              label="Date"
              btnStyle="loginBtn"
              btnTextStyle="loginText"
              onPress={() => setIsVisible(true)}
            />
          </View>
          <View style={[styles.dateSpace, styles.select]}>
            <Text style={styles.selectText}>{startDate.slice(4, 16)}</Text>
          </View>
        </View>
        <View>
          <Button
            check={check.expenseCategory}
            label="Category"
            btnStyle="plainBtn"
            btnTextStyle="plainBtnText"
            onPress={() => setIsCatModalVisible(true)}
          />
          <Button
            loading={loading}
            check={check.location}
            label="Get Current Location"
            btnStyle="plainBtn"
            btnTextStyle="plainBtnText"
            onPress={getCurrentLocation}
          />
          <Button
            label="Enter Location"
            btnStyle="plainBtn"
            btnTextStyle="plainBtnText"
            onPress={() => setMapModal(true)}
          />
          <Button
            label="Note"
            btnStyle="plainBtn"
            btnTextStyle="plainBtnText"
            onPress={() => setNoteModal(true)}
          />
          <View style={{ marginTop: 100 }}>
            <Button
              loading={savingEntry}
              label="Add Entry"
              btnStyle="loginBtn"
              btnTextStyle="loginText"
              onPress={() => handleAddEntry()}
            />
          </View>
        </View>
        <Modal visible={isVisible} transparent={true} animationType="slide">
          <View style={styles.calendarModal}>
            <Pressable
              onPress={() => setIsVisible(false)}
              style={styles.closeIcon}
            >
              <MaterialIcons name="close" color="#000" size={22} />
            </Pressable>
            <CalendarPicker onDateChange={handleChangeDate} />
          </View>
        </Modal>
        <Modal
          visible={isCatModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.calendarModal}>
            <Pressable
              onPress={() => setIsCatModalVisible(false)}
              style={styles.closeIcon}
            >
              <MaterialIcons name="close" color="#000" size={22} />
            </Pressable>
            <View style={styles.imageContainer}>
              <FlatList
                numColumns={5}
                data={emoji}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Pressable
                    style={styles.imageViewContainer}
                    onPress={() => {
                      handleSetCategory(item);
                    }}
                  >
                    <Category icon={item.img} caption={item.text} />
                  </Pressable>
                )}
              />
            </View>
          </View>
        </Modal>
        <Modal visible={mapModal} transparent={true} animationType="slide">
          <View style={styles.mapModal}>
            <Pressable
              onPress={() => setMapModal(false)}
              style={styles.closeIcon}
            >
              <MaterialIcons name="close" color="#000" size={22} />
            </Pressable>
            <InputLocation />
          </View>
        </Modal>
        <Modal visible={noteModal} transparent={true} animationType="slide">
          <View style={styles.noteInputModal}>
            <Pressable
              onPress={() => setNoteModal(false)}
              style={styles.closeIcon}
            >
              <MaterialIcons name="close" color="#000" size={22} />
            </Pressable>
            <KeyboardAwareScrollView>
            <TextInput
              style={{
                padding: 20,
                height: 200,
                textAlignVertical: "top",
                backgroundColor: "#fff",
                fontSize: 16,
                borderRadius: 10
              }}
              autoFocus
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => setAddNote({ text })}
              value={addNote}
            />
            <View style={styles.btn}>
              <Button
                label="Add Note"
                btnStyle="loginBtn"
                btnTextStyle="loginText"
                onPress={handleAddNote}
              />
            </View></KeyboardAwareScrollView>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: Constants.statusBarHeight,
    padding: 20,
  },
  textContainer: {
    marginTop: 20,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
  },
  symbol: {
    fontSize: 50,
    fontWeight: "600",
  },
  input: {
    fontSize: 50,
    fontWeight: "600",
    paddingLeft: 20,
    borderBottomWidth: 2,
  },
  expenseTitle: {
    fontSize: 30,
    textAlign: "center",
  },
  dateContainer: {
    marginVertical: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateSpace: {
    width: "48%",
  },
  select: {
    borderWidth: 2,
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  selectText: { textAlign: "center", fontWeight: "600", color: "#000" },
  calendarModal: {
    backgroundColor: "rgba(229, 210, 196, 1)",
    height: "50%",
    width: "100%",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    padding: 20,
    position: 'absolute',
    bottom: 0
  },
  noteInputModal: {
    backgroundColor: "rgba(229, 210, 196, 0.8)",
    // height: "50%",
    width: "100%",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 100,
    flex: 1,
    // justifyContent: "center",
    // alignSelf: "center",
  },
  mapModal: {
    backgroundColor: "rgba(229, 210, 196, 0.8)",
    height: "80%",
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
  imageContainer: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  imageViewContainer: {
    width: "20%",
    marginBottom: 10,
    // padding: 20,
  },
  btn: {
    marginTop: 20
  }
});
