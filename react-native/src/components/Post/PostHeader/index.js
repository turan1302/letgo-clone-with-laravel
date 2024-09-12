import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default class PostHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      headerText: [
        "Favoriler",
        "Satıyor",
        "Süresi Dolmuş",
        "Satıldı",
      ],
    };
  }

  render() {
    const { headerText } = this.state;

    return (
      <View style={styles.container}>
        {headerText.map((item, index) => (
          <View key={index} style={styles.item_container(index)}>
            <Text style={styles.item_text}>{item}</Text>
          </View>
        ))}
      </View>
    );
  }
}
