import React, { Component } from 'react'
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as NavigationService from "../../NavigationService";
import Foundation from "react-native-vector-icons/Foundation";
import { it } from "@jest/globals";
import SliderImage from "../../components/ProductDetail/SliderImage";
import Description from "../../components/ProductDetail/Description";
import SellerDescription from "../../components/ProductDetail/SellerDescription";
import SocialMedia from "../../components/ProductDetail/SocialMedia";
import MessageBox from "../../components/ProductDetail/MessageBox";
import styles from "./styles";
import AuthLayout from "../../components/Layout/AuthLayout";

export default class ProductDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      windowDimensions: Dimensions.get("window"),
    };
  }


  componentDidMount() {
    const {params} = this.props.route;
    const {navigation} = this.props;

    const { width, height } = this.state.windowDimensions;
    const position = width > height ? "LANDSCAPE" : "PORTRAIT";


    navigation.setOptions({
      headerShown : true,
      headerTransparent : true,
      header : ()=>(
        <View style={{
          height : (position === "PORTRAIT") ? width * 0.14 : height * 0.14,
          justifyContent : "space-between",
          paddingHorizontal : 15,
          flexDirection : "row",
          alignItems : "center",
          borderBottomWidth : 0.1,
          borderBottomColorColor : "gray",
          marginTop : 10
        }}>
          <TouchableOpacity onPress={()=>NavigationService.back()} style={{flexDirection : "row",paddingHorizontal : 12,paddingVertical : 8,backgroundColor : "gray",borderRadius : 20}}>
            <FontAwesome5 name={"times"} color={"white"} size={20}/>
          </TouchableOpacity>
          <View style={{flexDirection : "row",padding : 8,backgroundColor : "gray",borderRadius : 20}}>
            <FontAwesome5 name={"share"} color={"white"} size={20}/>
          </View>
        </View>
      )
    });

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
    const {params} = this.props.route;


    const { width, height } = this.state.windowDimensions;
    const position = width > height ? "LANDSCAPE" : "PORTRAIT";


    return (
      <AuthLayout>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} bounces>
            <FlatList bounces showsHorizontalScrollIndicator={false} horizontal decelerationRate={"fast"} snapToInterval={width} snapToAlignment={"center"} data={params.item.images} keyExtractor={(item,index)=>index} renderItem={({item,index})=>(
              <SliderImage item={item} position={position} width={width} height={height}/>
            )}/>
            <View style={styles.description_area}>
              <Description item={params.item}/>
              <SellerDescription/>
              <SocialMedia/>
            </View>
          </ScrollView>
          <MessageBox/>
        </View>
      </AuthLayout>
    )
  }
}
