import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Category = ({ icon, caption }) => {
  return (
    <View style={{alignItems: 'center'}}>
      <MaterialIcons name={icon} color="#000" size={40} />
      <Text style={{ textAlign: "center" }}>{caption}</Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({});
