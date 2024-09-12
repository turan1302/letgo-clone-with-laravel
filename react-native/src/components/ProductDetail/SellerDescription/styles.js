import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : {marginTop : 8,flexDirection : "row",justifyContent :"space-between",alignItems : "center"},
  container_left_area : {flexDirection : "row",alignItems : "center"},

  seller_profile_image : { width: 50, height: 50, justifyContent: "flex-end", alignItems: "flex-end" },
  seller_profile_image_style : { borderRadius: 25 },

  seller_profile_description_area : { marginLeft: 8 },
  seller_profile_name : { fontWeight: "bold", color: "black", fontSize: 15 }
});

export default styles;
