import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";

const currentYear = new Date().getFullYear();

function Footer() {
  // const softGlobalLink = () => {
  //   Linking.openURL("http://softglobal.org");
  // };

  return (
    <View style={{ backgroundColor: "#00BFFF", paddingVertical: 10 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>
          &copy; SoftGlobal Inc., {currentYear}. All rights reserved.
        </Text>
        {/* <TouchableOpacity 
        // onPress={softGlobalLink}
        > */}
          <Text style={{ color: "#fff", fontSize: 12,  fontStyle: 'italic' }}>
            +2349066167293
          </Text>
        {/* </TouchableOpacity> */}
      </View>
    </View>
  );
}

export default Footer;
