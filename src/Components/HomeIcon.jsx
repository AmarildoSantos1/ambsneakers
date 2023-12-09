import { View, Text, Image } from "react-native";
import React from "react";

const HomeIcon = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ width: 40, height: 45 }}
        source={require("../assets/mainIcon.png")}
      />
    </View>
  );
};

export default HomeIcon;
