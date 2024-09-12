import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop : 10,
    marginLeft : 13
  },
  container_left_title: { color: "black", fontSize: 18, fontWeight: "bold" },
  container_right_area: { flexDirection: "row", alignItems: "center" },
  container_right_text: { color: "#f24e61", fontSize: 18, fontWeight: "bold"},

  flatlist_area: { marginTop: 10 },
  flatlist_item_area: (position,width,height,products,index) => ({
    width: (position === "PORTRAIT") ? width * 0.30 : height * 0.30,
    height: (position === "PORTRAIT") ? width * 0.30 : height * 0.30,
    marginRight: (index === products.length - 1) ? 20 : 10,
    marginLeft : 13,
    alignItems: "flex-end",
  }),
  right_area : {padding : 5,flex : 1,justifyContent  :"space-between",alignItems : "flex-end"},
  right_text : {backgroundColor : "white",paddingHorizontal : 16,color  :"black",marginTop : 12,marginRight : -25,transform : [{rotate : "45deg"}],fontSize :13}
});

export default styles;
