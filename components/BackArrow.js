import { Pressable, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BackArrow = () => {
  const navigate = useNavigation();
  return (
    <Pressable onPress={() => navigate.goBack()}>
      <View style={styles.arrowBack}>
        <Feather name="arrow-left" size={28} color='#fff' />
      </View>
    </Pressable>
  );
};

export default BackArrow;

const styles = StyleSheet.create({
  arrowBack: {
    position: 'absolute',
    top: 40,
    left: 20
  },
});
