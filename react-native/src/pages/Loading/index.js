import React, { Component } from 'react'
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import { inject,observer } from "mobx-react";
@inject("AuthStore")
@observer

export default class Loading extends Component {


  componentDidMount() {
    this.isAuthenticated();
  }
  isAuthenticated = async ()=>{
    const {navigation} = this.props;


    navigation.addListener("focus",()=>{
      setTimeout(()=>{
        this.props.AuthStore.getToken();
      },2000);
    });
  }

  render() {
    return (
      <View style={{flex : 1,backgroundColor : "#f24e61",justifyContent : "center",alignItems : "center"}}>
        <Image source={require("../../assets/logo/letgo.webp")}/>
      </View>
    )
  }
}
