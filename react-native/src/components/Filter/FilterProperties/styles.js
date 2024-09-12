import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: (position,width,height) => ({
    backgroundColor: "white",
    height: (position === "PORTRAIT") ? width * 0.11 : height * 0.11,
    paddingLeft: 10,
    marginVertical: 10,
  }),
  button_area : {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#616161",
    borderRadius: 30,
    paddingHorizontal: 5,
  },
  params_image : {width : 35,height  :35,borderRadius : 20},
  params_area : {marginLeft : 5,flex : 1,flexDirection : "row",alignItems :"center",paddingRight : 10},
  params_name : {color : "white",fontWeight : "bold"},
  filter_buttons_area : { alignItems: "center",
    flexDirection: "row",
    flex : 1,
    backgroundColor: "#e7e7e7",
    borderRadius: 30,
    paddingHorizontal: 10,
    marginLeft : 8,
  }
});

export default styles;
