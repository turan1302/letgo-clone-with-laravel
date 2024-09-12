import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : {
    justifyContent: "center",
    elevation: 2,
    borderTopWidth: 0.1,
    marginHorizontal: -5,
    paddingHorizontal: 15,
    height: 110,
  },
  message_scroll_button_area : { marginRight: 10, padding: 7, backgroundColor: "#FF3E55", borderRadius: 20 },
  message_scroll_button_text : { color: "white", fontWeight: "bold" },

  send_message_area : { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 4 },
  send_message_input_area : {
    flex: 1,
    backgroundColor: "#e3e3e3",
    height: 40,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    borderRadius: 5,
  },
  send_message_button_area : { marginLeft: 20, justifyContent: "center" },
  send_message_button_text : { fontWeight: "bold", color: "#FF3E55" }
});

export default styles;
