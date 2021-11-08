import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { width, COLOR_PRIMARY, TEXT_COLOR } from "../utilities/config";
import { textFontSize } from "../utilities/Styles";
import Icon from "react-native-vector-icons/FontAwesome5Pro";
export default class NButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.btnflow,
          { top: this.props.top, backgroundColor: this.props.bgCl,bottom:this.props.bottom }
        ]}
      >
      {this.props.isLoading ? (
        <ActivityIndicator color = "white" />
      ) :  <Text style={[styles.text, { color: "white", fontWeight: "bold" }]}>
          {this.props.text}
      </Text> }
      </TouchableOpacity>
    );
  }
}
export const NButton2 = ({ isLoading, onPress, style, text, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => {}}
      style={[styles.btnflow, style ? style : {}]}
    >
      {isLoading ? (
        <ActivityIndicator color = "white" />
      ) : (
        <Text style={[styles.text, textStyle ? textStyle : {}]}>
          {text ? text : ""}
        </Text>
      )}
    </TouchableOpacity>
  );
};
export const NButtonGoBack = ({ onPress, style, navigation }) => {
  return (
    <TouchableOpacity
      onPress={
        onPress
          ? onPress
          : () => {
              navigation.pop();
            }
      }
      style={[
        {
          width: 80,
          height: 50,
          justifyContent: "center",
          position: "absolute",
          top: 30,
          left: 20
        },
        style ? style : {}
      ]}
    >
      <Icon name="angle-left" color="white" size={40} light />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btnflow: {
    marginHorizontal: width / 20,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: width / 20,
    paddingVertical: width / 20
  },
  text: {
    fontSize: textFontSize,
    color: "white",
    fontWeight: "bold"
  }
});
