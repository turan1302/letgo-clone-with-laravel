import React, { Component } from 'react'
import { Dimensions, Image, Text, TextInput, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Post from "../pages/Post";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Messages from "../pages/Messages";
import Octicons from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const Stack = createNativeStackNavigator();

export default class MessageNavigator extends Component {

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

  render() {
    return (
      <Stack.Navigator initialRouteName={"Messages"}>
        <Stack.Screen name={"Messages"} component={Messages} options={({navigation,route})=>{
          return {
            headerTitle : "Sohbet - Hepsi",
            headerTitleAlign : "center",
            headerTitleStyle : {
              color : "gray",
              fontSize : 15
            },
            headerRight : ()=>(
             <View style={{flexDirection  :"row"}}>
               <FontAwesome6
                 style={{ marginRight: 14 }}
                 name={"sliders"}
                 size={22}
                 color="#969696"
               />
               <Entypo name="dots-three-horizontal" size={24} color="#969696" />
             </View>
            )
          }
        }}/>
      </Stack.Navigator>
    )
  }
}
