import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

export default class MessageListItem extends Component {
  render() {
    const { width, height, position, item } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.left_container}>
          <View style={styles.item_detail_area}>
            <Image style={styles.item_image(position,width,height)}
                   source={item.image} />
            <View style={styles.item_seller_area}>
              <Text style={styles.item_seller_text}>{item.sellerName.substring(0, 1)}</Text>
            </View>
          </View>
          <View style={styles.product_detail_area}>
            <Text numberOfLines={1} style={styles.product_name}>{item.productName}</Text>
            <Text style={styles.seller_name}>{item.sellerName}</Text>
            {(item.situation === "Satıldı") ? (
              <View style={styles.product_sold_area}>
                <FontAwesome
                  style={{ marginRight: 5 }}
                  name="times-circle"
                  size={20}
                  color="#F24E61"
                />
                <Text style={styles.product_sold_text}>{item.situation}</Text>
              </View>
            ) : (
              <View style={styles.product_not_available_area}>
                <FontAwesome
                  style={{ marginRight: 5 }}
                  name="times-circle"
                  size={20}
                  color="#A0A0A0"
                />
                <Text style={styles.product_not_available_text}>{item.situation}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.date_area}>
          <Text style={styles.date_text}>{item.date}</Text>
        </View>
      </View>
    );
  }
}
