import React, { Component } from "react";
import { ActivityIndicator, Dimensions, FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import products from "../../../data/products";
import MessageNotification from "../../common/MessageNotification";
import Fontisto from "react-native-vector-icons/Fontisto";
import styles from "./styles";
import * as NavigationService from "../../../NavigationService";
import { inject, observer } from "mobx-react";
import RestClient from "../../../RestAPI/RestClient";
import AppUrl from "../../../RestAPI/AppUrl";

@inject("AuthStore")
@observer

export default class FilterProducts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      isLoading: true,
      windowDimensions: Dimensions.get("window"),
    };
  }

  async componentDidMount() {
    this.dimensionsSubscription = Dimensions.addEventListener("change", this.handleResize);

    await this.getProducts();
  }

  getProducts = async () => {
    const { params } = this.props;


    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.postRequest(AppUrl.category_products,
      {
        ct_id: params.ct_id,
      }, {
        headers: {
          "Authorization": "Bearer " + token,
        },
      }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        this.setState({
          isLoading: false,
          products: result.data,
        });
      }

      if (status===401){
        this.props.AuthStore.removeToken();
      }

    }).catch((err) => {
      console.log(err);
      this.props.AuthStore.removeToken();
    });
  };

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

    const { products, isLoading } = this.state;

    return (
      <View>
        <MessageNotification />
        <View>
          <View style={styles.text_container}>
            <Text style={styles.text_style}>Arama Sonuçları</Text>
          </View>
        </View>
        {(isLoading) ? (<View style={{justifyContent : "center",alignItems  :"center",marginTop  :30}}>
          <ActivityIndicator size={40} color={"#f24e61"}></ActivityIndicator>
        </View>) : (
          <FlatList ListEmptyComponent={() => (
            <View style={{
              marginTop: 10,
              marginHorizontal: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f24e61",
              paddingVertical: 10,
              borderRadius: 10,
            }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Herhangi bir ürün bulunamadı</Text>
            </View>
          )} style={styles.flatlist_area} showsVerticalScrollIndicator={false} bounces data={products} numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }} keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity onPress={() => NavigationService.navigate("ProductDetail", { item: item })}>
                        <ImageBackground resizeMode={"stretch"} imageStyle={styles.flatlist_item_style}
                                         style={styles.flatlist_item_area(position, width, height)}
                                         source={{ uri: AppUrl.imageUrl + item.pd_image }}>
                          <TouchableOpacity style={styles.flatlist_item_icon_area}>
                            <Fontisto name={"heart"} color={(item.isFavourite) ? "#f24e61" : "white"} size={20} />
                          </TouchableOpacity>
                        </ImageBackground>
                      </TouchableOpacity>
                    )} />
        )}
      </View>
    );
  }
}
