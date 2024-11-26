import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Login = () => {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert(
        "Validation Error",
        "Please enter both username and password.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/token", {
        username,
        password,
      });

      const { access_token } = response.data;

      await AsyncStorage.setItem("access_token", access_token);
      console.log(
        "Sucessfully logged in",
        await AsyncStorage.getItem("access_token"),
      );

      Alert.alert("Login Successful", "You are now logged in!");
      navigation.navigate("chat");
    } catch (error) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Login Failed",
          error.response?.data?.detail || "An unexpected error occurred.",
        );
      } else {
        Alert.alert("Login Failed", "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <View>
          <Button title="Login" onPress={handleLogin} />
          <Button title="Home" onPress={() => navigation.navigate("home")} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
});

export default Login;
