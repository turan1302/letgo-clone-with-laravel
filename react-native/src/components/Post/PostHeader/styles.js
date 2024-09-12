import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : {
    flexDirection: "row",
    marginBottom: 10,
    height: 50,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
    elevation: 4,
  },
  item_container : (index)=>({
    justifyContent: "center",
    borderBottomWidth: (index === 0) ? 2 : null,
    borderColor: "#f24e61",
    alignItems: "center",
  }),
  item_text : { fontWeight: "bold", fontSize: 15 }
});

export default styles;
