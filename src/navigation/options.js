import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  Image,
  // Text
} from "react-native";
import styles from "../HeaderStyles";
import logoImage from "../../assets/logo.png"; 

export const navOptions = (nav) => {
  return {
    headerTintColor: "#cbd5e1",
    headerStyle: {
      backgroundColor: "#00BFFF",
    },
    headerRight: () => (
      <Ionicons
        name="menu"
        size={32}
        color="white"
        onPress={() => nav.toggleDrawer()}
      />
    ),
    headerLeft: () => (
      <TouchableOpacity onPress={() => nav.navigate("Home")}>
        <Image
          source={logoImage}
          style={styles.logo}
        />
        {/* <Text>Paysofter</Text> */}
      </TouchableOpacity>
    ),
  };
};
