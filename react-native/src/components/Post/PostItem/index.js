import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as NavigationService from "../../../NavigationService";
import styles from "./styles";
import AppUrl from "../../../RestAPI/AppUrl";

export default class PostItem extends Component {
  render() {
    const { item, position, width, height,removePost } = this.props;

    return (
      <View style={styles.item_area}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 0.8,
          borderBottomColor: "#cdcdcd",
          paddingBottom: 15,
        }}>
          <TouchableOpacity onPress={() => NavigationService.navigate("ProductDetail", {
            item: item,
          })}>
            <Image style={styles.item_image(position, width, height)} source={{uri : AppUrl.imageUrl+item.pd_image}} />
          </TouchableOpacity>
          <View style={styles.item_detail_area}>
            <Text style={styles.item_price}>₺ {item.pd_price}</Text>
            <Text style={styles.item_name}>{item.pd_name}</Text>
            <Text style={styles.item_description}>{item.pd_description}</Text>
          </View>
          <TouchableOpacity onPress={()=>removePost(item.pd_id)}>
            <Ionicons name={"trash"} color={"gray"} size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.button_area}>
          <TouchableOpacity><Text style={styles.share_button}>Paylaş</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.message_button}>Sohbet Et</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}
