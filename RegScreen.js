import { View } from "react-native";
import { CheckBox, Input, Button } from "@rneui/themed";
import * as React from "react";
import { StyleSheet } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 1,
    width: "50%",
    backgroundColor: "#0553",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

const RegScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [disableRegister, setDisableRegister] = useState(true);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [pwError, setPwError] = useState("");
  const [confPwError, setConfPwError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [zipError, setZipError] = useState("");
  // define key for login data:
  const loginKey = "loginData";
  // function to register users:
  const registerUser = async (
    firstName,
    lastName,
    email,
    phone,
    username,
    password,
    zip
  ) => {
    // Get existing login data from storage, or create a new array if none exists
    const loginData = JSON.parse(await AsyncStorage.getItem(loginKey)) || [];
    // Add the new user to the login data array
    loginData.push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      username: username,
      password: password,
      zip: zip,
    });
    // Store the updated login data in storage
    await AsyncStorage.setItem(loginKey, JSON.stringify(loginData));
    console.log(
      `Registration successful. username: ${username} password: ${password} first name: ${firstName} last name: ${lastName} email: ${email} phone: ${phone} zip: ${zip}`
    );
    navigation.pop();
  };

  return (
    <View style={[styles.container]}>
      <Input
        testID="firstname"
        placeholder="First Name"
        onBlur={() => {
          if (firstName.trim() === "") {
            setFirstName("");
            setFirstNameError("First name cannot be empty");
            return false;
          } else if (!/^[^\d=?\\/@#%^&*()]+$/.test(firstName)) {
            setFirstNameError(
              "Error: Must only include word or symbol characters."
            );
            return false;
          } else {
            setFirstNameError("");
            setDisableRegister(false);
          }
        }}
        onChangeText={(value) => {
          setFirstName(value);
        }}
        errorMessage={firstNameError}
      />
      <Input
        testID="lastname"
        placeholder="Last Name"
        onBlur={() => {
          if (lastName.trim() === "") {
            setLastName("");
            setLastNameError("Last name cannot be empty");
            return false;
          } else if (!/^[^\d=?\\/@#%^&*()]+$/.test(lastName)) {
            setLastNameError(
              "Error: Must only include word or symbol characters."
            );
            return false;
          } else {
            setLastNameError("");
            setDisableRegister(false);
          }
        }}
        onChangeText={(value) => {
          setLastName(value);
        }}
        errorMessage={lastNameError}
      />
      <Input
        testID="username"
        placeholder="Username"
        onBlur={() => {
          if (username.trim() === "") {
            setUsername("");
            setUsernameError("Username cannot be empty");
            return false;
          } else {
            setUsernameError("");
            setDisableRegister(false);
          }
        }}
        onChangeText={(value) => {
          setUsername(value);
        }}
        errorMessage={usernameError}
      />
      <Input
        testID="phonenumber"
        placeholder="Phone Number"
        onBlur={() => {
          if (phoneNumber.trim() === "") {
            setPhoneNumber("");
            setPhoneError("Phone number cannot be empty");
            return false;
          } else if (!/^\(\d{3}\) \d{3}\-\d{4}$/.test(phoneNumber)) {
            setPhoneError(
              "Error: must be (xxx) xxx-xxxx format and only digits."
            );
            return false;
          } else {
            setPhoneError("");
            setDisableRegister(false);
          }
        }}
        onChangeText={(value) => {
          setPhoneNumber(value);
        }}
        errorMessage={phoneError}
      />
      <Input
        testID="password"
        placeholder="Password"
        onBlur={() => {
          if (password.trim() === "") {
            setPassword("");
            setPwError("Password cannot be empty");
            return false;
          } else if (
            !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(password)
          ) {
            setPwError(
              "Error: must include at least one uppercase character, one lowercase character, one number and one non-alphanumeric character."
            );
            return false;
          } else {
            setPwError("");
            setDisableRegister(false);
          }
        }}
        onChangeText={(value) => {
          setPassword(value);
        }}
        errorMessage={pwError}
      />
      <Input
        testID="confirmpassword"
        placeholder="Confirm Password"
        onBlur={() => {
          if (confirmPassword.trim() === "") {
            setConfirmPassword("");
            setConfPwError("Passwords must match.");
            return false;
          } else if (confirmPassword !== password) {
            setConfPwError("Error: Passwords must match.");
            return false;
          } else {
            setConfPwError("");
            setDisableRegister(false);
          }
        }}
        onChangeText={(value) => {
          setConfirmPassword(value);
        }}
        errorMessage={confPwError}
      />
      <Input
        testID="email"
        placeholder="Email"
        onBlur={() => {
          if (email.trim() === "") {
            setEmail("");
            setEmailError("Email cannot be empty.");
            return false;
          } else if (
            !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
              email
            )
          ) {
            setEmailError("Error: Must include @ sign and at least one period");
            return false;
          } else {
            setEmailError("");
            setDisableRegister(false);
          }
        }}
        onChangeText={(value) => {
          setEmail(value);
        }}
        errorMessage={emailError}
      />
      <Input
        testID="zip"
        placeholder="ZIP Code"
        onBlur={() => {
          if (zipCode.trim() === "") {
            setZipCode("");
            setZipError("Zip code cannot be empty");
            return false;
          } else if (!/^\d{5}$/.test(zipCode)) {
            setZipError("Error: must include 5 digits.");
            return false;
          } else {
            setZipError("");
            setDisableRegister(false);
          }
        }}
        onChangeText={(value) => {
          setZipCode(value);
        }}
        errorMessage={zipError}
      />
      <CheckBox
        testID="newsletter"
        title="Sign up for our newsletter"
        checked={newsletter}
        onPress={() => {
          setNewsletter(!newsletter);
        }}
      />

      <Button
        testID="register-button"
        title="Register"
        disabled={disableRegister}
        onPress={() =>
          registerUser(
            firstName,
            lastName,
            email,
            phoneNumber,
            username,
            password,
            zipCode
          )
        }
      />
    </View>
  );
};

export default RegScreen;
