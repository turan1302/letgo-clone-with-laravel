import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import styles from "./styles";

export default class SellerDescription extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
    return (
      <View style={styles.container}>
        <View style={styles.container_left_area}>
          <ImageBackground imageStyle={styles.seller_profile_image_style}
                           style={styles.seller_profile_image}
                           source={{ uri: "https://mfsoftware.net/storage/user/muhammed-fatih-bagcivan.jpg" }}>
            <AntDesign
              name="checkcircle"
              color="#A6CC71"
              size={14}
            />
          </ImageBackground>
          <View style={styles.seller_profile_description_area}>
            <Text style={styles.seller_profile_name}>M. Fatih</Text>
            <View style={{ flexDirection: "row" }}>
              {[0, 0, 0, 0, 0].map((el, i) => (
                <FontAwesome
                  key={i}
                  name="star"
                  size={16}
                  color={i < 4 ? "#FFD200" : "#DFDFDF"}
                  style={{ marginRight: 2 }}
                />
              ))}
            </View>
          </View>
        </View>
        <Feather name="chevron-right" size={28} color="gray" />
      </View>
    );
  }
}
