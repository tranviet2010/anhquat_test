import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MView from "../../../components/MView";
import MHeader from "../../../components/MHeader";
import { width, COLOR_PRIMARY } from "../../../utilities/config";
import { Input } from "react-native-elements";
import { textFontSize } from "../../../utilities/Styles";
const number = require("../../../assets/img/img_account/so_the.png");
const location = require("../../../assets/img/img_account/location.png");

export default class AddHealthInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  customLeftIcon = source => {
    return (
      <View>
        <Image style={styles.infoimg} source={source} />
      </View>
    );
  };
  render() {
    return (
      <MView>
        <MHeader
          text="Bảo hiểm y tế"
          onPress={() => {
            this.props.navigation.pop();
          }}
        />
        <Input
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          placeholder="Số thẻ"
          leftIcon={this.customLeftIcon(number)}
        />
        <Input
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          placeholder="Nơi cấp"
          leftIcon={this.customLeftIcon(location)}
        />
        <TouchableOpacity style={styles.btnAdd}>
          <Text
            style={{
              fontSize: textFontSize,
              color: "white",
              paddingVertical: width / 30,
              textAlign: "center"
            }}
          >
            THÊM MỚI
          </Text>
        </TouchableOpacity>
      </MView>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white",
    padding: 5,
    marginTop: width / 20,
    marginHorizontal: width / 20,
    borderRadius: 5,
    height: width /7 ,
    alignItems: "center",
    alignSelf: "center",
    width: width / 1.1
  },
  inputContainerStyle: {
    borderBottomWidth: 0
  },
  inputStyle: {
    fontSize: textFontSize * 1.1
  },
  infoimg: {
    width: width / 13,
    resizeMode: "contain"
  },
  btnAdd: {
    backgroundColor: COLOR_PRIMARY,
    marginHorizontal: width / 20,
    borderRadius: 5,
    marginBottom: 5,
    position: "absolute",
    bottom: width/2,
    alignSelf: "center",
    width: width/1.1
  }
});
