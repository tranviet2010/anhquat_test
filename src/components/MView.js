import React from "react";
import { View, StatusBar } from "react-native";
import { COLOR_PRIMARY } from "../utilities/config";

const MView = ({ barStyle, barColor, style = {}, children }) => {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={barStyle ? barStyle : "light-content"}
          backgroundColor={barColor ? barColor : COLOR_PRIMARY}
          //translucent={true}
        />
        <View style={[{ flex: 1 }, style]}>{children}</View>
      </View>
    </View>
  );
};
export default MView;
