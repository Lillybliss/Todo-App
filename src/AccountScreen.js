import { View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import React from "react";
import UserBio from "./UserBio";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
  }
});

const AccountScreen = ({ route, navigation }) => {
  const { email, firstName, lastName, password, phone, username, zip } =
    route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <UserBio />
      <View>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>
          {firstName} {lastName}
        </Text>
      </View>
      <View>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{username}</Text>
      </View>
      <View>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
      <View>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>{password}</Text>
      </View>
      <View>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{phone}</Text>
      </View>
      <View>
        <Text style={styles.label}>Zip:</Text>
        <Text style={styles.value}>{zip}</Text>
      </View>
      <Button
        style={styles.button}
        title="Sign Out"
        testID="logout"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default AccountScreen;
