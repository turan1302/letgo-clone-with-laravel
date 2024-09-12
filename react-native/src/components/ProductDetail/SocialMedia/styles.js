import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : {marginTop : 15,marginBottom : 10},

  social_media_buttons_area : {flexDirection : "row",justifyContent : "flex-start",alignItems : "center"},

  complaint_button_area : {
    borderRadius: 22,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    paddingVertical: 10,
    borderColor: "#FF3E55",
  },
  complaint_button_text : { fontSize: 16, fontWeight: "bold", color: "#FF3E55" }
});

export default styles;
