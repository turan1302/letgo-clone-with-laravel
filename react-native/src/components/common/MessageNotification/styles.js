import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : (position,width,height)=>({
    backgroundColor: "#141514",
    height: (position === "PORTRAIT") ? width * 0.10 : height * 0.10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  container_left_area : { flexDirection: "row", flex: 1 },
  container_left_text : { color: "#cdcdcd", marginLeft: 10 }
});

export default styles;
