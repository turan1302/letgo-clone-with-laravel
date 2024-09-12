import React, { Component } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default class MessageBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: "Hala müsait mi?",
      messages: ["Hala satılık mı?", "Fiyatta pazarlık payı var mı?", "Ne durumda?"],
    };
  }

  render() {
    const { messages, message } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {messages.map((item, index) => (
              <TouchableOpacity key={index}>
                <View style={styles.message_scroll_button_area}>
                  <Text style={styles.message_scroll_button_text}>{item}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.send_message_area}>
          <TextInput value={message} onChangeText={(text) => this.setState({ message: text })} style={styles.send_message_input_area} />
          <TouchableOpacity style={styles.send_message_button_area}>
            <Text style={styles.send_message_button_text}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
