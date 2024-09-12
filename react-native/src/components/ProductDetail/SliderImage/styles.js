import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image_style: (position, width, height) => ({
    width: width,
    height: (position === "PORTRAIT") ? height * 0.45 : width * 0.45,
    objectFit: "cover",
  }),
});

export default styles;
