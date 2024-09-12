import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  list_title_area : {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 13,
  },
  list_title : { color: "black", fontSize: 18, fontWeight: "bold" },

  list_button_text_area : { flexDirection: "row", alignItems: "center" },
  button_text : { color: "#f24e61", fontSize: 18, fontWeight: "bold" },

  flatlist_area : {marginBottom : -10},
  flatlist_column_wrapper : { justifyContent: "space-between" },

  item_image : (position,width)=>({
    width: (position==="PORTRAIT") ? width * 0.44 : width * 0.47,
    height: (position==="PORTRAIT") ? width * 0.44 : width * 0.47,
    marginBottom: 20,
    marginHorizontal: 12,
    justifyContent :"flex-end",
    alignItems : "flex-end"
  }),
  item_image_style : { borderRadius: 10 },
  item_icon_area :{padding : 10}
});

export default styles;
