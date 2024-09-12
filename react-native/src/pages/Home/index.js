import React, { Component } from "react";
import {View } from "react-native";
import MainProducts from "../../components/Home/MainProducts";
import styles from "./styles";
import { inject, observer } from "mobx-react";
import AuthLayout from "../../components/Layout/AuthLayout";

@inject("AuthStore")
@observer

export default class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;

    return (
      <AuthLayout>
        <View style={styles.container}>
          <MainProducts navigation={navigation} />
        </View>
      </AuthLayout>
    );
  }
}
