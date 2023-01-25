import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TransactionDetails = ({ icon, name, count, amount, date }) => {
  return (
    <>
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
          </View>
        </View>
        <View style={styles.expenseTexts}>
          <Text style={{ fontWeight: "600", fontSize: 18, textAlign: "right" }}>
            £{amount}
          </Text>
        </View>
      </View>
      <View style={styles.infoDiv}>
        <View style={styles.expenseImg}>
          <MaterialIcons name="calendar-today" color="#fff" size={30} />
        </View>
        <View>
          <Text>{date}</Text>
        </View>
      </View>
      <View style={styles.infoDiv}>
        <View style={styles.expenseImg}>
          <MaterialIcons name="place" color="#fff" size={30} />
        </View>
        <View>
          <Text>location</Text>
        </View>
      </View>
      <View style={styles.infoDiv}>
        <View style={styles.expenseImg}>
          <MaterialIcons name="notes" color="#fff" size={30} />
        </View>
        <View>
          <Text>notes</Text>
        </View>
      </View>
    </>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "rgba(229, 210, 196, 1)",
    marginBottom: 20,
    marginTop: 20,
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
  infoDiv: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
});
