import React, { Component } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import categories from "../../../data/categories";
import * as NavigationService from "../../../NavigationService";
import filtering from "../../../data/filtering";
import Feather from "react-native-vector-icons/Feather";
import styles from "./styles";
import AppUrl from "../../../RestAPI/AppUrl";

export default class FilterProperties extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: categories,
      windowDimensions: Dimensions.get("window"),
    };
  }

  componentDidMount() {
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
    const { width, height } = this.state.windowDimensions;
    const position = width > height ? "LANDSCAPE" : "PORTRAIT";

    const { params } = this.props;

    return (
      <View style={styles.container(position, width, height)}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces>
          <TouchableOpacity onPress={() => NavigationService.back()}
                            style={styles.button_area}>
            <View>
              <Image style={styles.params_image} source={{uri : AppUrl.imageUrl+params.ct_image}} />
            </View>
            <View style={styles.params_area}>
              <Text style={styles.params_name}>{params.ct_name}</Text>
              <FontAwesome5 name={"times"} size={15} color={"white"} style={{ marginLeft: 8 }} />
            </View>
          </TouchableOpacity>
          {filtering.map((item, index) => (
            <TouchableOpacity key={index}
                              style={[styles.filter_buttons_area, { marginRight: (index === filtering.length - 1)}]}>
              <Text style={{color : "black"}}>{item.name}</Text>
              <Feather name={"chevron-down"} color={"black"} size={20} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
