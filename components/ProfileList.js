import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const ProfileList = ({ icon, name, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed && styles.pressedItem )}
    >
      <View style={styles.profileContainer}>
        <View style={styles.first}>
          <View style={styles.profileImg}>
            <Feather name={icon} color="#c53f36" size={30} />
          </View>
          <View>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>{name}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProfileList;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "rgba(229, 210, 196, 1)",
    padding: 20,
  },
  first: {
    flexDirection: "row",
    alignItems: "center",
  },
  expenseImg: {
    backgroundColor: "rgba(244, 120, 196, 1)",
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  profileImg: {
    marginRight: 20,
  },
  pressedItem: {
    opacity: 0.5,
    color: "#fefcf3",
  },
});
