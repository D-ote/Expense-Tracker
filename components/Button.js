import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Button({
  label,
  btnStyle,
  btnTextStyle,
  onPress,
  check,
  loading,
}) {
  // if (check) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? styles.pressedItem : styles.pressStyle)}
    >
      <View style={[styles[btnStyle], styles.iconBtn]}>
        <Text style={styles[btnTextStyle]}>{label}</Text>
        {check && <MaterialIcons name="done" size={18} color="#c53f36" />}
        {loading && <ActivityIndicator size="small" color={btnStyle=="loginBtn" ? '#fff' : "#c53f36"} />}
      </View>
    </Pressable>
  );
  // }

  // return (
  //   <Pressable onPress={onPress}>
  //     <View style={styles[btnStyle]}>
  //       <Text style={styles[btnTextStyle]}>{label}</Text>
  //     </View>
  //   </Pressable>
  // );
}

const styles = StyleSheet.create({
  loginBtn: {
    backgroundColor: "#c53f36",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "capitalize",
  },
  plainBtn: {
    backgroundColor: "transparent",
    textTransform: "capitalize",
    borderWidth: 2,
    borderColor: "#c53f36",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  plainBtnText: {
    color: "#c53f36",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    textTransform: "capitalize",
  },
  bottomBoldText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#262626",
  },
  forgotPassword: {
    color: "#3797EF",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    textTransform: "capitalize",
  },
  iconBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  searchBtn: {
    backgroundColor: "transparent",
    textTransform: "capitalize",
    borderWidth: 2,
    borderColor: "#c53f36",
    borderRadius: 10,
    padding: 6,
    marginTop: 4,
  },
  searchBtnText: {
    color: "#c53f36",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    textTransform: "capitalize",
  },
  pressStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressedItem: {
    opacity: 0.5,
    color: "#fefcf3",
  },
});
