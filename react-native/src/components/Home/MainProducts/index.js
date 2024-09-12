import React, { Component } from "react";
import { Dimensions, FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import products from "../../../data/products";
import FavouriteProducts from "../FavouriteProducts";
import CategoryFilter from "../CategoryFilter";
import MessageNotification from "../../common/MessageNotification";
import Fontisto from "react-native-vector-icons/Fontisto";
import * as NavigationService from "../../../NavigationService";
import styles from "./styles";
import RestClient from "../../../RestAPI/RestClient";
import AppUrl from "../../../RestAPI/AppUrl";
import { inject, observer } from "mobx-react";

@inject("AuthStore")
@observer

export default class MainProducts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      isLoading: true,
      windowDimensions: Dimensions.get("window"),
    };

    this.getProducts();

  }

  componentDidMount() {
    this.dimensionsSubscription = Dimensions.addEventListener("change", this.handleResize);

    this.props.navigation.addListener("focus", () => {
      this.getProducts();
    });
  }

  getProducts = async () => {
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.getRequest(AppUrl.products, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        this.setState({
          products: result.data,
          isLoading: false,
        });
      }

      if (status === 401) {
        this.props.AuthStore.removeToken();
      }

    }).catch((err) => {
      console.log(err);
      this.props.AuthStore.removeToken();
    });
  };

  favourite = (id) => {
    const { products } = this.state;

    let newProducts = products.map((item) => {
      return (item.pd_id === id) ? { ...item, isFavourite: !item.isFavourite } : item;
    });

    this.setState({
      products: newProducts,
    }, () => {
      this.setFavourite(id);
    });
  };

  setFavourite = async (id) => {
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.postRequest(AppUrl.set_favourite_products, {
      fw_product: id,
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
    }).catch((err) => {
      console.log(err);
      this.props.AuthStore.removeToken();
    });
  };

  componentWillUnmount() {
    if (this.dimensionsSubscription) {
      this.dimensionsSubscription.remove();
    }

    if (this.focusSubscription) {
      this.focusSubscription.remove();
    }
  }

  handleResize = ({ window }) => {
    this.setState({ windowDimensions: window });
  };

  render() {
    const { width, height } = this.state.windowDimensions;
    const position = width > height ? "LANDSCAPE" : "PORTRAIT";

    const { products } = this.state;

    return (
      <View>

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
        )} ListHeaderComponent={() => (
          <View>
            <MessageNotification />
            <CategoryFilter />
            <FavouriteProducts products={products} />
            <View style={styles.list_title_area}>
              <Text style={styles.list_title}>Karatay</Text>
              <TouchableOpacity>
                <View style={styles.list_button_text_area}>
                  <Text style={styles.button_text}>Düzelt</Text>
                  <Feather name={"chevron-right"} style={{ marginRight: -10 }} size={25} color={"#f24e61"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )} style={styles.flatlist_area} showsVerticalScrollIndicator={false} bounces data={products} numColumns={2}
                  columnWrapperStyle={styles.flatlist_column_wrapper} keyExtractor={(item, index) => index}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => NavigationService.navigate("ProductDetail", {
                      item: item,
                    })}>
                      <ImageBackground resizeMode={"cover"} imageStyle={styles.item_image_style}
                                       style={styles.item_image(position, width)}
                                       source={{ uri: AppUrl.imageUrl + item.pd_image }}>
                        <TouchableOpacity onPress={() => this.favourite(item.pd_id)} style={styles.item_icon_area}>
                          <Fontisto name={"heart"} color={(item.isFavourite) ? "#f24e61" : "white"} size={20} />
                        </TouchableOpacity>
                      </ImageBackground>
                    </TouchableOpacity>
                  )} />
      </View>
    );
  }
}
