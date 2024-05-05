// // App.js
// import React, { useState, useEffect } from "react";
// import { Provider } from "react-redux";
// import { NavigationContainer } from "@react-navigation/native";
// import { MyDrawer } from "./src/navigation/drawer";
// import { initializeStore } from "./src/redux/store";
// import Footer from "./src/Footer"; 
// import { StatusBar } from "expo-status-bar";
// import * as SplashScreen from 'expo-splash-screen';
// import LottieView from 'lottie-react-native';

// export default function App() {
//   const [store, setStore] = useState(null);
//   const [isAppReady, setAppReady] = useState(false);

//   useEffect(() => {
//     const initStore = async () => {
//       const store = await initializeStore();
//       setStore(store);
//       setAppReady(true);
//     };
//     initStore();

//     setTimeout(async () => {
//       await SplashScreen.hideAsync();
//     }, 2000);

//     SplashScreen.preventAutoHideAsync()
//       .then(() => console.log("Splash screen prevented auto hide"))
//       .catch(console.warn);
//   }, []);

//   if (!store || !isAppReady) {
//     return (
//       <LottieView
//         source={require('./assets/splash.json')}
//         autoPlay
//         loop
//         style={{ flex: 1, backgroundColor: '#ffffff' }}
//       />
//     );
//   }

//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <MyDrawer />
//         <Footer />
//         <StatusBar style="auto" />
//       </NavigationContainer>
//     </Provider>
//   );
// }

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { MyDrawer } from "./src/navigation/drawer";
import { initializeStore } from "./src/redux/store";
import Footer from "./src/Footer"; 
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [store, setStore] = useState(null);
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    const initStore = async () => {
      const store = await initializeStore();
      setStore(store);
      setAppReady(true);
    };
    initStore();

    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);

    SplashScreen.preventAutoHideAsync()
      .then(() => console.log("Splash screen prevented auto hide"))
      .catch(console.warn);
  }, []);

  if (!store || !isAppReady) {
    return null; 
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
        <Footer />
        <StatusBar style="light" translucent={true} hidden={false} />
        {/* <StatusBar style="auto" /> */}
      </NavigationContainer>
    </Provider>
  );
}


// import React, { useState, useEffect } from "react";
// import { Provider } from "react-redux";
// import { NavigationContainer } from "@react-navigation/native";
// import { MyDrawer } from "./src/navigation/drawer";
// import { initializeStore } from "./src/redux/store";
// import Footer from "./src/Footer"; 
// import {StatusBar} from "expo-status-bar";

// export default function App() {
//   const [store, setStore] = useState(null);
//   useEffect(() => {
//     const initStore = async () => {
//       const store = await initializeStore();
//       setStore(store);
//     };
//     initStore();
//   }, []);

//   if (!store) {
//     return null;
//   }

//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <MyDrawer />
//         <Footer />
//         <StatusBar style="auto" /> 
//       </NavigationContainer>
//     </Provider>
//   );
// }
