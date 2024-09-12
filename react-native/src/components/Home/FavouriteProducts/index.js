import React, { Component } from "react";
import { ActivityIndicator, Dimensions, FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import products from "../../../data/products";
import Fontisto from "react-native-vector-icons/Fontisto";
import styles from "./styles";
import * as NavigationService from "../../../NavigationService";
import { inject, observer } from "mobx-react";
import RestClient from "../../../RestAPI/RestClient";
import AppUrl from "../../../RestAPI/AppUrl";

@inject("AuthStore")
@observer

export default class FavouriteProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: this.props.products,
      windowDimensions: Dimensions.get("window"),
    };
  }

  async componentDidMount() {
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

  _renderItem = ({ item, index }) => {
    const { width, height } = this.state.windowDimensions;
    const position = width > height ? "LANDSCAPE" : "PORTRAIT";
    const { products } = this.state;

    return (
      <TouchableOpacity onPress={() => NavigationService.navigate("ProductDetail", {
        item: item,
      })}>
        <ImageBackground imageStyle={{ borderRadius: 10 }} resizeMode={"cover"}
                         style={styles.flatlist_item_area(position, width, height, products, index)}
                         source={{uri : AppUrl.imageUrl+item.pd_image}}>
          <View style={styles.right_area}>
            <Text style={styles.right_text}>Öne Çıkan</Text>
            <View>
              <Fontisto name={"heart"} color={(item.isFavourite) ? "#f24e61" : "white"} size={20} />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };


  render() {
    const { products,isLoading } = this.state;

    return (
      isLoading ? (<View style={{justifyContent : "center",alignItems  :"center",marginTop  :30}}>
        <ActivityIndicator size={40} color={"#f24e61"}></ActivityIndicator>
      </View>) : (<View>
        <View style={styles.container}>
          <Text style={styles.container_left_title}>Vitrin İlanları</Text>
          <TouchableOpacity>
            <View style={styles.container_right_area}>
              <Text style={styles.container_right_text}>Hepsini gör</Text>
              <Feather name={"chevron-right"} size={25} color={"#f24e61"} />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList showsHorizontalScrollIndicator={false} style={styles.flatlist_area} horizontal bounces data={products}
                  keyExtractor={(item, index) => index} renderItem={this._renderItem} />
      </View>)

    )
  }
}
