import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item_area : {
    marginHorizontal: 15,
    borderWidth: 0.8,
    borderColor: "#cdcdcd",
    marginBottom: 25,
    padding: 15,
    elevation : 5,
    borderRadius : 10,
    backgroundColor :"white",
    overflow : "hidden"
  },
  item_image : (position,width,height)=>({
    width: (position === "PORTRAIT") ? width * 0.15 : height * 0.20,
    height: (position === "PORTRAIT") ? width * 0.15 : height * 0.20,
    borderRadius: 10,
    objectFit : "cover"
  }),

  item_detail_area : { marginLeft: 10, flex: 1 },
  item_price : { fontWeight: "bold", color: "black" },
  item_name : {color : "gray"},
  item_description : {color : "gray",marginTop : 2},

  button_area : {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
    paddingHorizontal: 30,
  },
  share_button : { fontWeight: "bold", color: "gray" },
  message_button : { fontWeight: "bold", color: "#f24e61" }
});

export default styles;
