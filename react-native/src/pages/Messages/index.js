import React, { Component } from "react";
import { Dimensions, FlatList, Image, ImageBackground, Text, View } from "react-native";
import messages from "../../data/messages";
import MessageListItem from "../../components/Message/MessageListItem";
import styles from "./styles";
import { inject, observer } from "mobx-react";
import AuthLayout from "../../components/Layout/AuthLayout";
@inject("AuthStore")
@observer

export default class Messages extends Component {

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
      <AuthLayout>
        <View style={styles.container}>
          <FlatList showsVerticalScrollIndicator={false} bounces data={messages} keyExtractor={(item, index) => index} renderItem={({ item, index }) => (
            <MessageListItem width={width} height={height} position={position} item={item}/>
          )} />
        </View>
      </AuthLayout>
    );
  }
}
