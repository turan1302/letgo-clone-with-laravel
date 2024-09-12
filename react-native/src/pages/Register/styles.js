import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, paddingHorizontal: 20 },
  form_area: { marginTop: 60 },

  name_text: { color: "black", fontSize: 15, fontWeight: "bold", marginLeft: 10 },
  name_area: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#cbcbcb",
  },
  name_input: { flex: 1, marginLeft: 5, color: "black" },

  email_text: { color: "black", fontSize: 15, fontWeight: "bold", marginLeft: 10 },
  email_area: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#cbcbcb",
  },
  email_input: { flex: 1, marginLeft: 5, color: "black" },

  password_text: { color: "black", fontSize: 15, fontWeight: "bold", marginLeft: 10 },
  password_area: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#cbcbcb",
    justifyContent: "space-between",
  },
  password_left_area: { flexDirection: "row", alignItems: "center" },
  password_input: { marginLeft: 5, color: "black" },

  confirm_password_text: { color: "black", fontSize: 15, fontWeight: "bold", marginLeft: 10 },
  confirm_password_area: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#cbcbcb",
    justifyContent: "space-between",
  },
  confirm_password_left_area: { flexDirection: "row", alignItems: "center" },
  confirm_password_input: { marginLeft: 5, color: "black" },

  button: {
    backgroundColor: "#f24e61",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  button_text: { color: "white", fontWeight: "bold" },

  form_footer_area: { marginVertical: 30, alignItems: "center", justifyContent: "center", flexDirection: "row" },
  form_footer_signup_text: { color: "gray" },
  form_footer_signup_button: { fontWeight: "bold", color: "#f24e61" }
});

export default styles;
