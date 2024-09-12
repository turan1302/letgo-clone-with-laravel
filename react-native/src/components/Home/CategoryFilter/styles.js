import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: (position, width, height) => ({ height: (position === "PORTRAIT") ? width * 0.25 : height * 0.27 }),
  image_area: { justifyContent: "center", alignItems: "center", paddingHorizontal: 10 },
  image: { width: 60, height: 60, borderRadius: 30 },
  text: { color: "black" },
});

export default styles;
