import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import RestClient from "../../../RestAPI/RestClient";
import AppUrl from "../../../RestAPI/AppUrl";
import { inject, observer } from "mobx-react";

@inject("AuthStore")
@observer

export default class Description extends Component {

  constructor(props) {
    super(props);

    this.state = {
      item : this.props.item
    }
  }

  setFavourite = async (id)=>{
    const { item } = this.state;

    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.postRequest(AppUrl.set_favourite_products,{
      fw_product : id
    },{
      headers : {
        "Authorization" : "Bearer "+token
      }
    }).then((res)=>{
      const status = res.status;

      if (status===401){
        this.props.AuthStore.removeToken();
        return;
      }

      this.setState({
        item : {
          ...item,
          isFavourite : !item.isFavourite
        }
      })
    }).catch((err)=>{
      console.log(err);
      this.props.AuthStore.removeToken();
    })
  }

  render() {
    const { item } = this.state;

    return (
      <View>
        <View style={styles.price_area}>
          <Text style={styles.price_text}>₺{item.pd_price}</Text>
          <TouchableOpacity onPress={()=>this.setFavourite(item.pd_id)} style={styles.views_area}>
            <Fontisto name={"heart"} color={(item.isFavourite) ? "#f24e61" : "gray"} size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.product_name}>{item.pd_name}</Text>
        </View>
        <View style={styles.post_descriptions_area}>
          <View style={styles.post_date_area}>
            <MaterialIcons name={"local-fire-department"} size={20} color={"#ff3e55"} />
            <Text style={styles.post_time}>58 dk.</Text>
          </View>
          <View style={styles.post_views_area}>
            <AntDesign name={"eye"} color={"#9e9e9e"} size={20} />
            <Text style={styles.post_view}>{item.pd_numreviews}</Text>
          </View>
        </View>
        <View style={styles.product_description_area}>
          <Text style={styles.product_description}>{item.pd_description}</Text>
        </View>
      </View>
    );
  }
}
