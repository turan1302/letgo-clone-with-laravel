import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  price_area : { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  price_text : { fontWeight: "bold", fontSize: 20, color: "black" },

  views_area : {
    backgroundColor: "#eaeaea",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
  },

  product_name : { fontWeight: "bold", color: "black", fontSize: 18 },

  post_descriptions_area : { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 25 },
  post_date_area : { flexDirection: "row", alignItems: "center" },
  post_time : { color: "#ff3e55", marginLeft: 3 },

  post_views_area : {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaeaea",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  post_view : { color: "#9e9e9e", marginLeft: 2 },

  product_description_area : { marginTop: 15 },
  product_description : { fontSize: 14, color: "black" }
});

export default styles;
