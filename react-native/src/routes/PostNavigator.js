import React, { Component } from 'react'
import { Dimensions, Image, Text, TextInput, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Post from "../pages/Post";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Stack = createNativeStackNavigator();

export default class PostNavigator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      windowDimensions: Dimensions.get("window"),
    };
  }

  componentDidMount() {
    this.dimensionsSubscription = Dimensions.addEventListener("change", this.handleResize);
  }

  componentWillUnmount() {
    if (this.dimensionsSubscription) {
      this.dimensionsSubscription.remove();
    }
  }

  handleResize = ({ window }) => {
    this.setState({ windowDimensions: window });
  };

  _postHeader = ()=>{
    const { width, height } = this.state.windowDimensions;
    const position = width > height ? "LANDSCAPE" : "PORTRAIT";

    return (
      <View style={{
        backgroundColor: "white",
        paddingHorizontal: 15,
        height: (position === "PORTRAIT") ? width * 0.14 : height * 0.14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation : 2
      }}>
        <MaterialCommunityIcons name={"lightbulb-on"} color={"#949494"} size={20}/>
        <Text style={{fontWeight : "bold",color : "black",fontSize : 15}}>İlanlarım</Text>
        <FontAwesome name={"share"} color={"#949494"} size={24}/>
      </View>
    )
  }

  render() {
    return (
      <Stack.Navigator initialRouteName={"Post"}>
        <Stack.Screen name={"Post"} component={Post} options={()=>{
          return {
            header : this._postHeader
          }
        }}/>
      </Stack.Navigator>
    )
  }
}
