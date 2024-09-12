import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text_container : {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 13,
  },
  text_style : { color: "black", fontSize: 18, fontWeight: "bold" },

  flatlist_area : {marginBottom : -10},
  flatlist_item_area : (position,width,height)=>({
    width: (position==="PORTRAIT") ? width * 0.44 : width * 0.47,
    height: (position==="PORTRAIT") ? width * 0.44 : width * 0.47,
    marginBottom: 20,
    marginHorizontal: 12,
    justifyContent :"flex-end",
    alignItems : "flex-end"
  }),
  flatlist_item_style : { borderRadius: 10 },
  flatlist_item_icon_area : {padding : 10}
});

export default styles;
