import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MView from "../../../components/MView";
import MHeader from "../../../components/MHeader";
import { styles } from "./StylelocationbyX";
import { width, COLOR_PRIMARY } from "../../../utilities/config";
const location = require("../../../assets/img/location.png");
const map = require("../../../assets/img/map.png");
import { Input } from "react-native-elements";
import { textFontSize } from "../../../utilities/Styles";
import MButton from "../../../components/MButton";
import NButton from "../../../components/NButton";

export default class LocationbyRegister extends Component {
  constructor(props){
    super(props);
    this.state = {
      location : "Số 10, Hoàng Hoa Thám, thị trấn A, Ha Noi"
    }
  }
  render() {
    return (
      <MView>
        <MHeader
          onPress={() => {
            this.props.navigation.pop();
          }}
          text="Vị trí theo đăng ký"
        />
        <View style={{ top: width / 20 }}>
          <Input
          selection = {0}
            leftIcon={
              <Image
                source={location}
                style={[
                  styles.image,
                  { padding: 0, margin: 0, width: width / 20 }
                ]}
              />
            }
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            value= {this.state.location}
          />
          <Text
            style={[
              styles.text,
              { marginHorizontal: width / 20, marginTop: width/20, marginBottom :width/40, fontSize: textFontSize * 1.1 }
            ]}
          >
            Thêm chi tiết
          </Text>
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            placeholder="VD: điểm mốc, số nhà ..."
          />

          <NButton top={width/3} text="XÁC NHẬN" bgCl = {COLOR_PRIMARY} />
          
        </View>
      </MView>
    );
  }
}
