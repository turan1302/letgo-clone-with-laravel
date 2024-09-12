import React, { Component } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as NavigationService from "../../../NavigationService";

import categories from "../../../data/categories";
import styles from "./styles";
import { inject, observer } from "mobx-react";
import RestClient from "../../../RestAPI/RestClient";
import AppUrl from "../../../RestAPI/AppUrl";

@inject("AuthStore")
@observer

export default class CategoryFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading : true,
      categories: [],
      windowDimensions: Dimensions.get("window"),
    };
  }

  async componentDidMount() {
    this.dimensionsSubscription = Dimensions.addEventListener("change", this.handleResize);

    await this.getCategories();
  }

  getCategories = async ()=>{
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.getRequest(AppUrl.categories,{
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res)=>{
      const result = res.data;
      const status = res.status;

      if (status===200){
        this.setState({
          categories : result.data,
          isLoading : false
        });
      }

      if (status===401){
        this.props.AuthStore.removeToken();
      }

    }).catch((err)=>{
      console.log(err);
      this.props.AuthStore.removeToken();
    });
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
    const { width, height } = this.state.windowDimensions;
    const position = width > height ? "LANDSCAPE" : "PORTRAIT";
    const { categories,isLoading } = this.state;


    return (
      <View style={styles.container(position,width,height)}>
        {(isLoading) ? (
         <View style={{justifyContent : "center",alignItems : "center",flex : 1}}>
           <ActivityIndicator size={40} color={"#f24e61"}></ActivityIndicator>
         </View>
        ) : (
          <ScrollView horizontal bounces showsHorizontalScrollIndicator={false}>
            {categories.map((item, index) => (
              <TouchableOpacity onPress={()=>NavigationService.navigate("Filter",{
                ct_id : item.ct_id,
                ct_name : item.ct_name,
                ct_image : item.ct_image
              })} key={index} style={styles.image_area}>
                <Image style={styles.image} source={{uri : AppUrl.imageUrl+item.ct_image}} />
                <Text style={styles.text}>{item.ct_name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

      </View>
    );
  }
}
