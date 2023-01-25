import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Transaction = ({ icon, name, count, amount, date }) => {
  const formatDate = (date) => {
    let formattedDate = date.toDate();
    formattedDate = formattedDate.toLocaleDateString()
    return formattedDate;
  };

  return (
    <View style={styles.expenseContainer}>
      <View style={styles.first}>
        <View style={styles.expenseImg}>
          <MaterialIcons name={icon} color="#fff" size={30} />
        </View>
        <View>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              textTransform: "capitalize",
            }}
          >
            {name}
          </Text>
          <Text style={{ fontWeight: "200", color: "gray", marginTop: 5 }}>
            {formatDate(date)}
          </Text>
        </View>
      </View>
      <View style={styles.expenseTexts}>
        <Text style={{ fontWeight: "600", fontSize: 18, textAlign: "right" }}>
          £{amount}
        </Text>
        <Text></Text>
      </View>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "rgba(229, 210, 196, 1)",
    marginBottom: 20,
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
});
