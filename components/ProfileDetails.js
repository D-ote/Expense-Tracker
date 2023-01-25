import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const ProfileDetails = ({ icon, name, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.profileContainer}>
        <View style={styles.first}>
          <View style={styles.profileImg}>
            <Feather name={icon} color="#c53f36" size={25} />
          </View>
          <View>
            <Text style={{ fontWeight: "400", fontSize: 18 }}>{name}</Text>
            <Text style={{ fontWeight: "200", fontSize: 12 }}>singleton</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  first: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(229, 210, 196, 0.3)",
    padding: 20,
    width: "100%",
  },
  expenseImg: {
    backgroundColor: "rgba(244, 120, 196, 1)",
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  profileImg: {
    marginRight: 40,
  },
  pressedItem: {
    opacity: 0.5,
    color: "#fefcf3",
  },
});
