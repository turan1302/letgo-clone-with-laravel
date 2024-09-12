import React, { Component } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";

const SocialMediaContainer = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.color,
        width: 40,
        height: 40,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
      }}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default class SocialMedia extends Component {

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
        <View style={styles.social_media_buttons_area}>
          <SocialMediaContainer color="#60E14A">
            <MaterialCommunityIcons name="chat" size={24} color="white" />
          </SocialMediaContainer>
          <SocialMediaContainer color="#56ACEE">
            <FontAwesome5 name="twitter" size={20} color="white" />
          </SocialMediaContainer>
          <SocialMediaContainer color="#5EBE4B">
            <FontAwesome5 name="whatsapp" size={23} color="white" />
          </SocialMediaContainer>
          <SocialMediaContainer color="#7FAC53">
            <AntDesign name="link" size={20} color="white" />
          </SocialMediaContainer>
          <SocialMediaContainer color="#747474">
            <Entypo name="dots-three-horizontal" size={20} color="white" />
          </SocialMediaContainer>
        </View>
        <View style={styles.complaint_button_area}>
          <Text style={styles.complaint_button_text}>İlanı şikayet et</Text>
        </View>
      </View>
    );
  }
}
