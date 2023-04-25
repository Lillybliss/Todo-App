import { StyleSheet, View } from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import * as React from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
  button: {
    width: "100%",
    textAlign: "center",
  },
});

const LoginScreen = ({ navigation }) => {
  // define key for login data:
  const loginKey = "loginData";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // use handleLogin to authenticate the user
  const handleLogin = async () => {
    const enteredUsername = username;
    const enteredPassword = password;
    // Get existing login data from storage
    const loginData = JSON.parse(await AsyncStorage.getItem(loginKey));
    // validation:
    const user = loginData.find(
      (user) =>
        user.username === enteredUsername && user.password === enteredPassword
    );

    if (user) {
      console.log("Login successful.");
      navigation.navigate("Home", {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        phone: user.phone,
        username: user.username,
        zip: user.zip,
      });
    } else {
      console.log("Incorrect username or password.");
    }
  };

  return (
    <View style={[styles.container]}>
      <h1>My To-Do App</h1>
      <Input
        onChangeText={setUsername}
        value={username}
        testID="login-username"
        placeholder="Username..."
      ></Input>
      <Input
        onChangeText={setPassword}
        value={password}
        testID="login-password"
        placeholder="Password..."
      ></Input>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Login"
          testID="login-button"
          onPress={handleLogin}
        />
      </View>
      <Text>Don't already have an account?</Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Register"
          testID="login-register"
          onPress={() => navigation.navigate("Registration")}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
