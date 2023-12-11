// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { Store } from "./Redux/Store";
import Signup from "./src/Screens/Signup";
import Login from "./src/Screens/Login";
import Home from "./src/Screens/Home";
import Details from "./src/Screens/Details";
import Cart from "./src/Screens/Cart";
import PedidoScreen from "./src/Screens/PedidoScreen";
import Orderplaced from "./src/Screens/Orderplaced";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="OrderPlaced" component={Orderplaced} />
          <Stack.Screen name="PedidoScreen" component={PedidoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
