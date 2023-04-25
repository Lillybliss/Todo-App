import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const UserBio = () => {
  const [bio, setBio] = useState("");

  const handleBioChange = (text) => {
    setBio(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bio:</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="Your text here..."
        onChangeText={handleBioChange}
        value={bio}
      />
      <Text style={styles.charCount}>{bio.length}/100 characters</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    maxHeight: 150,
    textAlignVertical: "top",
  },
  charCount: {
    marginTop: 5,
    fontSize: 12,
    alignSelf: "flex-end",
  },
});

export default UserBio;