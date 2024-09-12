import React, { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import styles from "./styles";

export default class MessageNotification extends Component {
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
    const { width, height } = this.state.windowDimensions;
    const position = width > height ? "LANDSCAPE" : "PORTRAIT";

    return (
      <View style={styles.container(position,width,height)}>
        <View style={styles.container_left_area}>
          <MaterialCommunityIcons name={"message-processing"} size={20} color={"gray"} />
          <Text style={styles.container_left_text}>Mesaj bildirimlerini aç</Text>
        </View>
        <Feather name={"chevron-right"} size={20} color={"gray"} />
      </View>
    );
  }
}
