// App.js
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { MyDrawer } from "./src/navigation/drawer";
import { initializeStore } from "./src/redux/store";
import Footer from "./src/Footer"; 
import { StatusBar } from "react-native";

export default function App() {
  const [store, setStore] = useState(null);
  useEffect(() => {
    const initStore = async () => {
      const store = await initializeStore();
      setStore(store);
    };
    initStore();
  }, []);

  if (!store) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
        <Footer />
        <StatusBar style="auto" /> 
      </NavigationContainer>
    </Provider>
  );
}
