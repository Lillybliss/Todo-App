import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./LoginScreen";
import RegScreen from "./RegScreen";
import TodoHomeScreen from "./TodoHomeScreen";
import AccountScreen from "./AccountScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const TodoListStack = ({route}) => {
  const {email, firstName, lastName,
        password,
        phone,
        username,
        zip} = route.params

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Todo List"
        component={TodoHomeScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="My Account"
        component={AccountScreen}
        initialParams={{
          email,
          firstName,
          lastName,
          password,
          phone,
          username,
          zip,
        }}
      />
    </BottomTab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={RegScreen}
          options={{ title: "Registration" }}
        />
        <Stack.Screen
          name="Home"
          component={TodoListStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
