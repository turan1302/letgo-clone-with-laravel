import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from "./AppNavigator";
import { navigationRef } from "../../src/NavigationService";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Loading from "../pages/Loading";
import Register from "../pages/Register";

const Stack = createNativeStackNavigator();


export default class Routes extends Component {

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={"Loading"} screenOptions={({route,navigation})=>{
          return {
            headerShown : false
          }
        }}>
          <Stack.Screen name={"Loading"} component={Loading}/>
          <Stack.Screen name={"Welcome"} component={AppNavigator}/>
          <Stack.Screen name={"ProductDetail"} component={ProductDetail}/>
          <Stack.Screen options={({route,navigation})=>{
            return {
              headerShown : true,
              headerShadowVisible : false,
              headerTitleAlign : "center",
              headerBackVisible : false,
              title  :"Giriş Yap"
            }
          }} name={"Login"} component={Login}/>
          <Stack.Screen options={({route,navigation})=>{
            return {
              headerShown : true,
              headerShadowVisible : false,
              headerTitleAlign : "center",
              title  :"Kayıt Ol"
            }
          }} name={"Register"} component={Register}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
