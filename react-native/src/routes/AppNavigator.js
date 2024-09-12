import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from "./HomeNavigator";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PostNavigator from "./PostNavigator";
import MessageNavigator from "./MessageNavigator";
const Tab = createBottomTabNavigator();

export default class AppNavigator extends Component {

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

  customTabbarIcon = ()=>{
    const { width, height } = this.state.windowDimensions;
    const position = width > height ? "LANDSCAPE" : "PORTRAIT";

    return (
      <TouchableOpacity>
        <View style={{
          height : 70,
          width  :70,
          borderRadius : 45,
          backgroundColor : "#f24e61",
          marginBottom : (position==="LANDSCAPE") ? 30 : 10,
          borderWidth : 4,
          borderColor : "white",
          marginLeft : (position==="LANDSCAPE") ? 20 : null,
          justifyContent : "center",
          alignItems : "center"
        }}>
          <FontAwesome name={"camera"} size={20} color={"white"}/>
          <Text style={{color : "white"}}>Sat</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { width, height } = this.state.windowDimensions;
    const position = width > height ? "LANDSCAPE" : "PORTRAIT";

    return (
      <Tab.Navigator initialRouteName={"HomeNavigator"} screenOptions={()=>{
        return {
          headerShown : false,
          tabBarHideOnKeyboard : true,
          tabBarActiveTintColor : "#f24e61",
          tabBarInactiveTintColor : "gray",
          tabBarLabelStyle : {
            marginBottom : (position==="PORTRAIT") ? 5 : null,
            fontWeight : "bold",
            fontSize : 11
          },
          tabBarIconStyle : {
            marginTop : 5
          }
        }
      }}>
        <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={()=>{
          return {
            tabBarIcon : ({focused})=>{
              return (
                <Foundation name={"home"} size={25} color={(focused) ? "#f24e61" : "gray"}/>
              )
            },
            title :"Anasayfa"
          }
        }} />
        <Tab.Screen name="NotifcationNavigator" component={HomeNavigator} options={()=>{
          return {
            tabBarIcon : ({focused})=>{
              return (
                <Ionicons name={"notifications"} size={25} color={(focused) ? "#f24e61" : "gray"}/>
              )
            },
            tabBarBadge  :2,
            tabBarBadgeStyle : {
              marginTop  :-5,
              backgroundColor : "#f24e61"
            },
            title :"Bildirimler"
          }
        }} />
        <Tab.Screen name="SellNavigator" component={HomeNavigator} options={()=>{
          return {
            tabBarIcon : this.customTabbarIcon,
            title :""
          }
        }} />
        <Tab.Screen name="MessageNavigator" component={MessageNavigator} options={()=>{
          return {
            tabBarIcon : ({focused})=>{
              return (
                <MaterialCommunityIcons name={"message-processing"} size={25} color={(focused) ? "#f24e61" : "gray"}/>
              )
            },
            title :"Sohbet"
          }
        }} />
        <Tab.Screen name="PostNavigator" component={PostNavigator} options={()=>{
          return {
            tabBarIcon : ({focused})=>{
              return (
                <AntDesign name={"appstore1"} size={25} color={(focused) ? "#f24e61" : "gray"}/>
              )
            },
            title :"İlanlarım",
          }
        }} />
      </Tab.Navigator>
    )
  }
}
