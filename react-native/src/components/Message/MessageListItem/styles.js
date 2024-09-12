import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 0.6,
    borderBottomColor: "gray",
  },
  left_container : { flexDirection: "row", flex: 1 },
  item_detail_area : { flexDirection: "row", flexWrap: "wrap" },
  item_image : (position,width,height)=>({
    width: (position === "PORTRAIT") ? width * 0.20 : height * 0.20,
    height: (position === "PORTRAIT") ? width * 0.20 : height * 0.20,
    borderRadius: 10,
    objectFit : "cover"
  }),
  item_seller_area : {
    justifyContent: "flex-end",
    marginLeft: -20,
    marginBottom: -3,
    backgroundColor: "#A3CE72",
    alignSelf: "flex-end",
    borderRadius: 30,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  item_seller_text : {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
  },

  product_detail_area : { width: "70%", marginLeft: 8 },
  product_name : { fontWeight: "bold", color: "black" },
  seller_name : { color: "black", marginTop: 5 },
  product_sold_area: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  product_sold_text : { color: "#f24e61", fontWeight: "bold" },

  product_not_available_area : { flexDirection: "row", alignItems: "center", marginTop: 5 },
  product_not_available_text : { color: "#A0A0A0", fontWeight: "bold" },

  date_area : {marginLeft  :10},
  date_text : { color: "gray", fontWeight: "400" }
});

export default styles;
